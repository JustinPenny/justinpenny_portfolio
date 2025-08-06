// Helper function for Tailwind Merge to make assigning multiple className="" to a variable easy

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}