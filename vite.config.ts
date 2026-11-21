import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const FLAVOR_DIR = fileURLToPath(new URL('./public/flavors', import.meta.url))
const IMAGE_EXTENSION = /\.(jpe?g|png|webp|avif|gif)$/i
const VIRTUAL_ID = 'virtual:flavor-images'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

/**
 * Exposes every image inside `public/flavors/` as a sorted array of public URLs.
 *
 * The list is read from disk at build/dev time, so dropping a new photo into the
 * folder is all it takes to add a flavor card — no code change required.
 */
function flavorImagesPlugin(): Plugin {
  const readImages = (): string[] => {
    try {
      return fs
        .readdirSync(FLAVOR_DIR)
        .filter((file) => IMAGE_EXTENSION.test(file))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => `/flavors/${file}`)
    } catch {
      // The folder may not exist yet in a fresh checkout.
      return []
    }
  }

  return {
    name: 'iverista:flavor-images',
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null
    },
    load(id) {
      return id === RESOLVED_ID ? `export default ${JSON.stringify(readImages())}` : null
    },
    configureServer(server) {
      server.watcher.add(FLAVOR_DIR)

      const refresh = (file: string) => {
        if (!path.resolve(file).startsWith(FLAVOR_DIR)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), flavorImagesPlugin()],
  server: { port: 5173 },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
