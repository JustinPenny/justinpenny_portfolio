import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve:{
    aliss: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})

// using:
// vite ()
// tailwindcss (css stylings)
// lucide-react (icon library)
// react-rourter-dom
// tailwind-merge
// radix-ui/react-toast
// class-variance-authority
// clsx