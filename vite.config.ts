import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Plugins: React (JSX + recarga en caliente) y Tailwind 4 (sin postcss.config)
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@/..." apunta a src/. Es la convención que usa shadcn/ui
    alias: { '@': resolve(import.meta.dirname, './src') },
  },
})
