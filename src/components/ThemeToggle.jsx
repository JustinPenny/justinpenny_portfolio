import { useEffect, useState } from "react";
import {Moon, Sun} from "lucide-react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); 


    // Store the theme in local memory so if you re-visit the site it remembers previous mode
    // Dark mode is the default unless the user has explicitly chosen light mode before.
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme === "light") {
            setIsDarkMode(false)
            document.documentElement.classList.remove("dark");
        } else{
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }, [])

    const toggleTheme = () => {
        if (isDarkMode){
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else{
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    }

    return (
        <button onClick={toggleTheme} 
                className={cn("fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300 focus:outline-hidden")}
        >

        {isDarkMode ? 
            <Sun className="h-6 w-6 text-yellow-300"/> : 
            <Moon className="h-6 w-6 text-blue-300"/> }
        </button>
    )
}