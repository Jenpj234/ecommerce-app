import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/images': {
        target: 'http://localhost:3000',
      },
    },
  },
  build: {
    outDir: '../ecommerce-backend/dist',
  },
})