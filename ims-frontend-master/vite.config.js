// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
    Buffer: ['buffer', 'Buffer'], // <-- THIS IS MISSING
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [], // Optional if you're using esbuild node plugins
    },
    include: ['buffer'], // <-- Add buffer here
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
})
