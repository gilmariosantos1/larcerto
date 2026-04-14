import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Toda requisição que começa com /api é redirecionada para a API Node
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,   // altera o header Origin para o target
        secure: false,        // não valida certificado SSL (não precisa em dev)
      }
    }
  }
})
