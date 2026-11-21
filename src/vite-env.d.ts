/// <reference types="vite/client" />

/**
 * Populated at build time by the `iverista:flavor-images` plugin in vite.config.ts.
 * Each entry is a public URL such as `/flavors/sweet-black.webp`.
 */
declare module 'virtual:flavor-images' {
  const images: string[]
  export default images
}
