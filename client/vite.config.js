import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: fileExists('/styles/index.css') && !indexCssImported ? `@import '/styles/index.css';` : '',
      },
    },
  },
});

// Marcar index.css como importado después de la primera importación
indexCssImported = true;