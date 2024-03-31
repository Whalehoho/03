import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  // Other configuration options here...
  build: {
    rollupOptions: {
      input: {
        home: './index.html',
        live: './temp.html',
        // ...
        // List all files you want in your build
      }
    }
  },
  server: {
    https: {
      key: fs.readFileSync(new URL('./cert.key', import.meta.url)),
      cert: fs.readFileSync(new URL('./cert.crt', import.meta.url)),
    },
    host: '0.0.0.0'
  },
  // Include specific asset file types
  assetsInclude: ['**/*.gltf', '**/*.bin']
});
