import { ArrowRight, ExternalLink } from "lucide-react";

// lucide-react dropped brand icons (e.g. Github) in this version, so we use an inline SVG instead.
const GithubIcon = ({ size = 25, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
    >
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97.01 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
    </svg>
);

// Currently structing to be in groups of three. Will have to adjust for non /3 nubmer of projects
const PROJECTS = [
    {
        id: 1,
        title: "Birds Of Play Records",
        description: "Record Label Web App.",
        image: "/projects/birds_of_play.webp",
        tags: ["React", "AWS", "JS"],
        demoUrl: "https://birdsofplay.studio",
        githubUrl: "#",
    },
    {
        id: 2,
        title: "React Essentials",
        description: "Learn about the React framework.",
        image: "/projects/react_essentials.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d3f6v7440pss8r.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/react_essentials",
    },
    {
        id: 3,
        title: "Tic-Tac-Toe",
        description: "Play the classic game against a friend locally.",
        image: "/projects/tic_tac_toe.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d19us2tbcvq2m.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/tic-tac-toe",
    },
    {
        id: 4,
        title: "GPT Product Page",
        description: "A slick demo page for a GPT-style product.",
        image: "/projects/gpt_demo.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d1nnpo2rbckscn.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/front_end_project_one",
    },
    {
        id: 5,
        title: "Investment Calculator",
        description: "Calculate the return on your investment over time.",
        image: "/projects/investment_calculator.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d18stv44s9ak1d.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/investment-calculator",
    },
    {
        id: 6,
        title: "3D Interactive Object",
        description: "ThreeJS Project with custom 3d model of my house.",
        image: "/projects/my_house.webp",
        tags: ["ThreeJS", "BlockBench"],
        demoUrl: "https://main.dnpvzm2458dq1.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/threeJS_beginner",
    },
    {
        id: 7,
        title: "Coming Soon",
        description: "Check back soon for more great projects!",        
        image: "/projects/project_coming_soon.jpg",
        tags: ["Always Learning New Skills"],
        demoUrl: "#",
        githubUrl: "#",
    },

];

export const ProjectsSection = () => {
    return(
         <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Featured <span className="text-primary"> Projects</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-2-2xl mx-auto">
                    Here are some of my recent projects. Each project was carefully crafted with attention to detail,
                    performance, and user experience. <br/>[I'm changing my hosting service. Projects will be viewable soon]
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, key) => (
                        <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground" key={tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <h3 className="text-xl font-semibold mb-1">
                                        {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {project.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-3">
                                        <a href={project.demoUrl} className="text-foreground/80 hover:text-primary transition-colors duration-300" target="_blank">
                                            <ExternalLink size={25}/>
                                        </a>
                                        <a href={project.githubUrl} className="text-foreground/80 hover:text-primary transition-colors duration-300" target="_blank">
                                            <GithubIcon size={25}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="https://github.com/JustinPenny" className="cosmic-button w-fit flex items-center mx-auto gap-2" target="_blank">
                        Check My Github <ArrowRight size={16} />
                    </a>
                </div>
            </div>
         </section>
    )
}