import { useEffect, useState } from "react";
import {Moon, Sun} from "lucide-react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); 


    // Store the theme in local memory so if you re-visit the site it remembers previous mode
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
        } else{
            setIsDarkMode(false)
            localStorage.setItem("theme", "light");
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
                className={cn("fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300 focus:out-lin-hidden")}
        >

        {isDarkMode ? 
            <Sun className="h-6 w-6 text-yellow-300"/> : 
            <Moon className="h-6 w-6 text-blue-300"/> }
        </button>
    )
}