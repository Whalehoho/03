import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  // Other configuration options here...
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
