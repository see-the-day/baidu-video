import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    assetsDir: 'assets',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false
      }
    }
  },
  server: {
    https: false,
    open: true,
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://zhishu.datazhi.com:809/',
        changeOrigin: true
      }
    }
  }
})
