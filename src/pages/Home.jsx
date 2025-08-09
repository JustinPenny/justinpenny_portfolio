import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SKillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

            <ThemeToggle />

            <StarBackground />

            <Navbar />

            <main>
                <HeroSection />
            </main>

            <AboutSection />

            <SKillsSection />

            <ProjectsSection />

        </div>
    )
};