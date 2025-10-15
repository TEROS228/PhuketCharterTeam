import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Для собственного домена. Если используете github.io, замените на '/PhuketCharterTeam/'
  server: {
    port: 3000
  }
})