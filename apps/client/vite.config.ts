import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    solid({ ssr: false }),
    createHtmlPlugin({
      minify: true
    })
  ],
  build: {
    minify: true,
    sourcemap: false,
    target: 'esnext'
  }
})
