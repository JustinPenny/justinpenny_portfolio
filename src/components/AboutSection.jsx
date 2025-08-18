import { Briefcase, Code, User, BugOff } from "lucide-react"
import { AboutContainer } from "../containers/AboutContainer"

const ABOUT_TEXT = [
    {
        Icon: <Code className="h-6 w-6 text-primary"/>,
        title: "Web Development",
        body: "I bring a careers worth of front-end testing into the realm of web development. I build things that users love."
    },
    {
        Icon: <User className="h-6 w-6 text-primary"/>,
        title: "UX Design",
        body: "Functional and ugly is better than the alternative but why not have both? I make UX that drives interaction and is pretty to look at."
    },
    {
        Icon: <Briefcase className="h-6 w-6 text-primary"/>,
        title: "Project Management",
        body: "I'm experiened at all stages of the software life cycle. I work with product to set capacity and deliver to stake holders on time."
    },
    {
        Icon: <BugOff className="h-6 w-6 text-primary"/>,
        title: "Software Testing",
        body: "I'm a testing expert. Everything from manual smoke testing to automated regression suites. Software bugs are not safe around me."
    }
]

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4">

            <div className="container mx-auto max-w-5x">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary">Me</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 font-semibold">
                        <h3>Passionate Web Developer & Software Tester</h3>
                    
                        <p className="text-muted-foreground">
                            This a paragraph roughly outlining my expertise. List skills and capabilities here.
                            words wordswords wordswords
                        </p>

                        <p className="text-muted-foreground">
                            This is a paragraph about me. How I handle working and the soft skills I posess.
                            words wordswords wordswords 
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a href="#contact" className="cosmic-button">
                            {" "}
                            Get In Touch
                        </a>

                        <a href="LINK TO RESUME" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                            {" "}
                            Download My Resume
                        </a>

                        </div>
                    </div>


                    {/* This is begging to be containerized. TODO*/}
                    <div className="grid grid-cols-1 gap-6">

                        <AboutContainer Icon={ABOUT_TEXT[0].Icon} title={ABOUT_TEXT[0].title} body={ABOUT_TEXT[0].body}/>
                        <AboutContainer Icon={ABOUT_TEXT[1].Icon} title={ABOUT_TEXT[1].title} body={ABOUT_TEXT[1].body}/>
                        <AboutContainer Icon={ABOUT_TEXT[2].Icon} title={ABOUT_TEXT[2].title} body={ABOUT_TEXT[2].body}/>
                        <AboutContainer Icon={ABOUT_TEXT[3].Icon} title={ABOUT_TEXT[3].title} body={ABOUT_TEXT[3].body}/>

                    </div>

                </div>
            </div>
        </section>
    )
}