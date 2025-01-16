import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // Example: Add custom env variables
  },
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  
})
