import { defineConfig } from 'vite'
import { resolve } from 'path'

const pages = ['index','inside','build','connect','transform','work','about','careers']

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(p => [p, resolve(__dirname, p + '.html')])),
    },
  },
})
