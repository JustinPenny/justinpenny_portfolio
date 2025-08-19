import { ArrowRight, ExternalLink, Github } from "lucide-react";

// Currently structing to be in groups of three. Will have to adjust for non /3 nubmer of projects
const PROJECTS = [
    {
        id: 1,
        title: "React Essentials",
        description: "Learn about the React framework.",
        image: "/projects/react_essentials.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d3f6v7440pss8r.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/react_essentials",
    },
    {
        id: 2,
        title: "Tic-Tac-Toe",
        description: "Play the classic game against a friend locally.",
        image: "/projects/tic_tac_toe.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d19us2tbcvq2m.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/tic-tac-toe",
    },
    {
        id: 3,
        title: "GPT Product Page",
        description: "A slick demo page for a GPT-style product.",
        image: "/projects/gpt_demo.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d1nnpo2rbckscn.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/front_end_project_one",
    },
    {
        id: 4,
        title: "Investment Calculator",
        description: "Calculate the return on your investment over time.",
        image: "/projects/investment_calculator.webp",
        tags: ["React", "AWS Amplify", "CSS", "JS"],
        demoUrl: "https://main.d19us2tbcvq2m.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/investment-calculator",
    },
    {
        id: 5,
        title: "Coming Soon",
        description: "Check back soon for more great projects!",
        image: "/projects/project_coming_soon.jpg",
        tags: ["Always Learning New Skills"],
        demoUrl: "https://main.d19us2tbcvq2m.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/tic-tac-toe",
    },
    {
        id: 6,
        title: "Coming Soon",
        description: "Check back soon for more great projects!",        
        image: "/projects/project_coming_soon.jpg",
        tags: ["Always Learning New Skills"],
        demoUrl: "https://main.d19us2tbcvq2m.amplifyapp.com/",
        githubUrl: "https://github.com/JustinPenny/tic-tac-toe",
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
                                    {project.tags.map((tag, key) => (
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
                                            <Github size={25}/>
                                            {/*<img src="/github.svg" className="h-8 w-8 bg-white rounded"></img> for when the github logo gets depreciated*/}
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