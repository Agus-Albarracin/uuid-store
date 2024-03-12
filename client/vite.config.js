import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';
import fs from 'fs';

// Función para verificar si un archivo existe
const fileExists = (filePath) => {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
};

// Variable para controlar si index.css se importó
let indexCssImported = false;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    WindiCSS()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData() {
          const importIndexCss = fileExists('/styles/index.css') && !indexCssImported;
          indexCssImported = true;
          return importIndexCss ? `@import '/styles/index.css';` : '';
        },
      },
    },
  },
});