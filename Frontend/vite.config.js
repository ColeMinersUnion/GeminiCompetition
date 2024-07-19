import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true,
    strictPort:true,
    port: 8000,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      }

    }
  }
})
