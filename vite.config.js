import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/PRJ-Portofolio-02/', // <-- Tambahkan baris ini, pastikan namanya sama persis
})