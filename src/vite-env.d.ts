/// <reference types="vite/client" />

// Le decimos a TypeScript qué variables de entorno existen.
// Solo las que empiezan con VITE_ llegan al navegador.
interface ImportMetaEnv {
  readonly VITE_TMDB_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
