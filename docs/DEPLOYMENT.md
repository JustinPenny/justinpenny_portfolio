# Deployment setup — justinpenny.com

This mirrors the CI/CD pattern already used on the Birds Of Play project (S3 + CloudFront + GitHub
Actions with OIDC, no long-lived AWS keys in GitHub). Every command below is meant to be pasted into
AWS CloudShell in order.

Known facts:
- AWS account: `263043884074` (same account as Birds Of Play)
- S3 bucket: `justinpenny.com`, region `us-east-1`
- DNS: Route 53
- GitHub repo: `JustinPenny/justinpenny_portfolio`, deploys on push to `main`
- ACM certs for CloudFront **must** live in `us-east-1`, regardless of which region anything else is in.

**Status as of last check:** distribution and cert already exist — steps 2 and 4 below are not
needed.
- CloudFront distribution: `E3LQJOEGZ9JLT` (`d21ewg51i1i2al.cloudfront.net`), aliases
  `justinpenny.com` / `www.justinpenny.com`, origin
  `justinpenny.com.s3-website-us-east-1.amazonaws.com` (legacy S3 static-website endpoint, not OAC —
  the bucket is likely public-read; left as-is since it wasn't part of the ask).
- ACM cert: `arn:aws:acm:us-east-1:263043884074:certificate/cb52a23c-1d5b-4588-9e33-a4c6fd1661e2` for
  `justinpenny.com` — check its `Status`/`RenewalEligibility` in step 1; if `ISSUED`/`ELIGIBLE`, it's
  already auto-renewing and needs no action.
- What's actually left: create the IAM role (step 3) and drop the distribution ID into
  `.github/workflows/deploy.yml` (already done — it's `E3LQJOEGZ9JLT`).

## 0. Shared variables

Paste this first in every CloudShell session you use for this setup — later blocks depend on it.

```bash
export AWS_DEFAULT_REGION=us-east-1
DOMAIN="justinpenny.com"
BUCKET="justinpenny.com"
ACCOUNT_ID="263043884074"
REPO="JustinPenny/justinpenny_portfolio"
ROLE_NAME="github-actions-deploy-portfolio"
```

## 1. Check what already exists

You said you can't remember if a CloudFront distribution exists for this domain — check first:

```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[].{Id:Id,Domain:DomainName,Aliases:Aliases.Items,Origin:Origins.Items[0].DomainName}" \
  --output table
```

If one already has `justinpenny.com` in its Aliases, save its ID and **skip to step 4** (you don't
need a new distribution):

```bash
DIST_ID="<paste the existing Id here>"
```

Check for an existing ACM cert in `us-east-1`:

```bash
aws acm list-certificates --region us-east-1 \
  --query "CertificateSummaryList[].{Domain:DomainName,Arn:CertificateArn}" --output table
```

If one exists for justinpenny.com, check its status:

```bash
CERT_ARN="<paste the existing cert ARN here>"
aws acm describe-certificate --region us-east-1 --certificate-arn $CERT_ARN \
  --query "Certificate.{Status:Status,NotAfter:NotAfter,RenewalEligibility:RenewalEligibility,Validation:DomainValidationOptions[].ValidationStatus}"
```

**Important:** ACM certs issued with DNS validation auto-renew — there's no "renew" button. AWS
renews automatically starting ~60 days before expiry, as long as the cert stays attached to an
in-use resource (e.g. a CloudFront distribution) and its validation CNAME record still exists in
Route 53. If `Status` is `ISSUED` and `RenewalEligibility` is `ELIGIBLE`, **skip to step 3** — nothing
to renew. If the cert is `EXPIRED`, missing, or validation shows `FAILED`, continue to step 2.

## 2. Request a new ACM cert (only if step 1 found none valid)

```bash
CERT_ARN=$(aws acm request-certificate \
  --domain-name $DOMAIN \
  --subject-alternative-names www.$DOMAIN \
  --validation-method DNS \
  --region us-east-1 \
  --query CertificateArn --output text)
echo "Cert ARN: $CERT_ARN"

# Give ACM a few seconds to generate the validation records
sleep 15
```

Automatically add the DNS validation CNAME records to Route 53:

```bash
ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name $DOMAIN \
  --query "HostedZones[0].Id" --output text | sed 's|/hostedzone/||')

aws acm describe-certificate --region us-east-1 --certificate-arn $CERT_ARN \
  --query "Certificate.DomainValidationOptions[].ResourceRecord" --output json \
  | jq -c '.[]' | while read -r rec; do
    NAME=$(echo "$rec" | jq -r '.Name')
    VALUE=$(echo "$rec" | jq -r '.Value')
    cat > /tmp/validation-change.json <<EOF
{
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "$NAME",
      "Type": "CNAME",
      "TTL": 300,
      "ResourceRecords": [{"Value": "$VALUE"}]
    }
  }]
}
EOF
    aws route53 change-resource-record-sets --hosted-zone-id $ZONE_ID \
      --change-batch file:///tmp/validation-change.json
  done
```

Wait for validation to complete (this polls until ACM confirms it — usually a few minutes):

```bash
aws acm wait certificate-validated --region us-east-1 --certificate-arn $CERT_ARN
echo "Certificate validated."
```

## 3. Create the IAM role for this repo's GitHub Actions

Confirm the OIDC provider already exists (it should, from Birds Of Play):

```bash
aws iam list-open-id-connect-providers
```

You should see `arn:aws:iam::$ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com` in the
list. If it's missing, run this once (skip if it's already there):

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

Create the trust policy and role (scoped to only this repo, `main` branch):

```bash
cat > /tmp/trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:${REPO}:ref:refs/heads/main"
        }
      }
    }
  ]
}
EOF

aws iam create-role \
  --role-name $ROLE_NAME \
  --assume-role-policy-document file:///tmp/trust-policy.json
```

The permissions policy needs the CloudFront distribution ID, which doesn't exist yet if you're
creating a new one — **come back and run this block after step 4** (skip for now if `$DIST_ID` isn't
set yet):

```bash
cat > /tmp/permissions-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::${BUCKET}"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::${BUCKET}/*"
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DIST_ID}"
    }
  ]
}
EOF

aws iam put-role-policy \
  --role-name $ROLE_NAME \
  --policy-name deploy-portfolio-permissions \
  --policy-document file:///tmp/permissions-policy.json
```

## 4. Create the CloudFront distribution (only if step 1 found none)

Create an Origin Access Control so the bucket doesn't need to be public:

```bash
OAC_ID=$(aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "justinpenny-com-oac",
    "OriginAccessControlOriginType": "s3",
    "SigningBehavior": "always",
    "SigningProtocol": "sigv4"
  }' \
  --query "OriginAccessControl.Id" --output text)
echo "OAC ID: $OAC_ID"
```

Create the distribution:

```bash
cat > /tmp/dist-config.json <<EOF
{
  "CallerReference": "portfolio-$(date +%s)",
  "Comment": "justinpenny.com portfolio",
  "Enabled": true,
  "DefaultRootObject": "index.html",
  "Aliases": { "Quantity": 2, "Items": ["${DOMAIN}", "www.${DOMAIN}"] },
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "s3-${BUCKET}",
      "DomainName": "${BUCKET}.s3.us-east-1.amazonaws.com",
      "OriginAccessControlId": "${OAC_ID}",
      "S3OriginConfig": { "OriginAccessIdentity": "" }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-${BUCKET}",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "Compress": true
  },
  "CustomErrorResponses": {
    "Quantity": 2,
    "Items": [
      { "ErrorCode": 403, "ResponsePagePath": "/index.html", "ResponseCode": "200", "ErrorCachingMinTTL": 10 },
      { "ErrorCode": 404, "ResponsePagePath": "/index.html", "ResponseCode": "200", "ErrorCachingMinTTL": 10 }
    ]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "${CERT_ARN}",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "PriceClass": "PriceClass_100"
}
EOF

DIST_ID=$(aws cloudfront create-distribution \
  --distribution-config file:///tmp/dist-config.json \
  --query "Distribution.Id" --output text)
CF_DOMAIN=$(aws cloudfront get-distribution --id $DIST_ID --query "Distribution.DomainName" --output text)
echo "Distribution ID: $DIST_ID"
echo "Distribution domain: $CF_DOMAIN"
```

> Custom error responses map 403/404 → `/index.html` with a `200` status — required because this app
> uses React Router client-side routing. Without it, refreshing on any route other than `/` breaks.

Allow that distribution to read from the bucket:

```bash
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowCloudFrontServicePrincipal",
    "Effect": "Allow",
    "Principal": { "Service": "cloudfront.amazonaws.com" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::${BUCKET}/*",
    "Condition": {
      "StringEquals": { "AWS:SourceArn": "arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DIST_ID}" }
    }
  }]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET --policy file:///tmp/bucket-policy.json
```

Now go back to the end of step 3 and run the `permissions-policy.json` block — `$DIST_ID` is set now.

## 5. Point DNS at CloudFront

CloudFront's hosted zone ID is always the fixed value `Z2FDTNDATAQYW2`, for any distribution.

```bash
cat > /tmp/dns-change.json <<EOF
{
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "${DOMAIN}",
        "Type": "A",
        "AliasTarget": { "HostedZoneId": "Z2FDTNDATAQYW2", "DNSName": "${CF_DOMAIN}", "EvaluateTargetHealth": false }
      }
    },
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "www.${DOMAIN}",
        "Type": "A",
        "AliasTarget": { "HostedZoneId": "Z2FDTNDATAQYW2", "DNSName": "${CF_DOMAIN}", "EvaluateTargetHealth": false }
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets --hosted-zone-id $ZONE_ID --change-batch file:///tmp/dns-change.json
```

This replaces any existing record for the domain (UPSERT) — if you had one pointing directly at an S3
website endpoint, this overwrites it to point at CloudFront instead.

## 6. Wire up the workflow

`.github/workflows/deploy.yml` in this repo already matches the Birds Of Play pattern. Two values need
to be real:

```bash
echo "Role ARN:            arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"
echo "Distribution ID:     ${DIST_ID}"
```

Confirm the role ARN in the workflow file matches the first line above, and replace
`REPLACE_WITH_DISTRIBUTION_ID` in `.github/workflows/deploy.yml` with the second. Commit and push to
`main` — the workflow builds with `npm run build` (outputs to `dist/`, per Vite's default), syncs it
to `s3://justinpenny.com`, and invalidates the CloudFront cache.
