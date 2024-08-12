import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        target:'https://sprout-backend-khssbqm7ma-uk.a.run.app/api',
        changeOrigin: true,
        secure: false,
      }

    }
  }
})
