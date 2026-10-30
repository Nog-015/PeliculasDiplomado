// Configuración de la API en un solo lugar
export const TMDB_API = 'https://api.themoviedb.org/3'
export const TMDB_IMG = 'https://image.tmdb.org/t/p'
export const IDIOMA = 'es-MX'

// Vite llena import.meta.env con lo que haya en .env.local
// ⚠ Lo que empieza con VITE_ queda visible en el JavaScript del navegador.
// Para clase está bien; en producción el token va en un servidor.
export const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN ?? ''

// Tamaños de TMDB: w92, w185, w342, w500, w780, w1280, original
export function imagen(ruta: string | null, tamano = 'w342') {
  return ruta ? `${TMDB_IMG}/${tamano}${ruta}` : null
}
