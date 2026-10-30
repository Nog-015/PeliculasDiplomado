// Interfaces: describen la forma de lo que llega de TMDB.
// Solo declaramos los campos que usamos; TypeScript no se queja del resto.

export interface Pelicula {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string // "2024-03-01" (puede venir vacío)
  vote_average: number // 0 a 10
  vote_count: number
  genre_ids: number[]
  original_language?: string
}

export interface Genero {
  id: number
  name: string
}

export interface Credito {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface Video {
  key: string
  site: string // "YouTube"
  type: string // "Trailer", "Teaser"...
  name: string
}

// El detalle trae más cosas. Con append_to_response pedimos reparto, videos y similares en UNA sola petición.
export interface DetallePelicula extends Omit<Pelicula, 'genre_ids'> {
  genres: Genero[]
  runtime: number | null
  tagline: string
  credits: { cast: Credito[] }
  videos: { results: Video[] }
  similar: { results: Pelicula[] }
}

// Lo mínimo que guardamos en favoritos (no hace falta volver a pedirlo a la API)
export type PeliculaResumen = Pick<Pelicula, 'id' | 'title' | 'poster_path' | 'release_date' | 'vote_average'>

export type Orden = 'popularity.desc' | 'vote_average.desc' | 'primary_release_date.desc'

export const ORDENES: { valor: Orden; texto: string }[] = [
  { valor: 'popularity.desc', texto: 'Más populares' },
  { valor: 'vote_average.desc', texto: 'Mejor calificadas' },
  { valor: 'primary_release_date.desc', texto: 'Más recientes' },
]

export function anio(fecha: string) {
  return fecha ? fecha.slice(0, 4) : 's/f'
}

export const PAISES: { codigo: string; nombre: string }[] = [
  { codigo: 'VE', nombre: 'Venezuela' },
  { codigo: 'MX', nombre: 'México' },
  { codigo: 'ES', nombre: 'España' },
  { codigo: 'US', nombre: 'Estados Unidos' },
  { codigo: 'CO', nombre: 'Colombia' },
  { codigo: 'BR', nombre: 'Brasil' },
  { codigo: 'CL', nombre: 'Chile' },
]

export function hoyLocal() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function diasHasta(fecha: string) {
  const [a, m, d] = fecha.split('-').map(Number)
  const [ha, hm, hd] = hoyLocal().split('-').map(Number)
  return Math.round((Date.UTC(a, m - 1, d) - Date.UTC(ha, hm - 1, hd)) / 86_400_000)
}
