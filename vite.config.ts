import WindiCSS from 'vite-plugin-windicss';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginForArco from '@arco-plugins/vite-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react(), vitePluginForArco(), WindiCSS()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
