import { defineConfig } from 'vite';

export default defineConfig({
  // Other configuration options here...

  // Include specific asset file types
  assetsInclude: ['**/*.gltf', '**/*.bin']
});
