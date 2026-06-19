import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'investment-platform' with your exact GitHub repository name.
// e.g. repo URL https://github.com/yourname/my-app  →  base: '/my-app/'
// If you use a custom domain or the repo IS your username.github.io, set base: '/'
const repoName = 'investment-platform'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Vite 8 / rolldown requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
            return 'vendor-charts'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
        },
      },
    },
  },
})
