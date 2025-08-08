import { useState } from "react";
import { cn } from "../lib/utils";

// Listing skills, level = proficiency, and what type of skill it is
const SKILLS = [

    // Frontend
    {name: "HTML/CSS", level: 90, category: "frontend"},
    {name: "Javascript", level: 95, category: "frontend"},
    {name: "React", level: 87, category: "frontend"},
    {name: "TypeScript", level: 80, category: "frontend"},
    {name: "Tailwind CSS", level: 70, category: "frontend"},
    {name: "Next.js", level: 60, category: "frontend"},
    {name: "Cypress", level: 95, category: "frontend"},

    // Backend
    {name: "Node.js", level: 85, category: "backend"},
    {name: "PostgreSQL", level: 95, category: "backend"},
    {name: "DynamoDB", level: 90, category: "backend"},
    {name: "Express", level: 70, category: "backend"},

    // Tools
    {name: "Git/Github", level: 90, category: "tools"},
    {name: "Docker", level: 80, category: "tools"},
    {name: "Figma", level: 95, category: "tools"},
    {name: "VS Code", level: 95, category: "tools"},
    {name: "Jira", level: 95, category: "tools"},
    {name: "TestRails", level: 76, category: "tools"},
    {name: "AWS", level: 100, category: "tools"},
    
];

const CATEGORIES = ["all", "frontend", "backend", "tools"];

export const SKillsSection = () =>{
    const [activeCategory, setActiveCategory] = useState("all");
    const filteredSkills = SKILLS.filter((skill) => activeCategory === "all" || skill.category === activeCategory)
    return(
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">

            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My<span className="text-primary"> Skills</span>
                </h2>

                <div className="display flex-wrap justify-center gap-4 mb-12">
                    {CATEGORIES.map((category, key) => (
                        <button key={key} 
                        className={cn(
                            "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                            activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-goreground hover:bg-secondary"
                        )}
                            onClick={() => setActiveCategory(category)}>
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, key) => (
                    
                    <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                        <div className="text-left mb-4">
                            <h3 className="font-semibold text-lg">
                            {skill.name}
                            </h3>
                        </div>
                        <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-2 rounded-full origin-left animate-[grow-1.5s_ease-out]"
                            style={{width: skill.level + "%"}}>

                            </div>
                        </div>
                        <div className="text-right mt-1">
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>


                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
}