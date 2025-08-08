export const AboutContainer = ({Icon, title, body}) => {
    return (
        <div className="gradient-border p-6 card-hover">
         <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10">
               {Icon}
                
            </div>
            <div className="text-left">
                <h4 className="font-semibold text-lg"> {title}</h4>
                <p className="text-muted-foreground">
                    {body}
                </p>
            </div>
        </div>
    </div>
    )
}