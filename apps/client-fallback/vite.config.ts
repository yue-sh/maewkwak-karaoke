import { defineConfig } from 'vite'
import UnocssPlugin from '@unocss/vite'
import solidPlugin from 'vite-plugin-solid'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnocssPlugin(),
    createHtmlPlugin({
      minify: true
    })
  ],
  server: {
    port: 3000
  },
  build: {
    minify: true,
    sourcemap: false,
    target: 'esnext'
  }
})
