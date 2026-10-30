// Forma en que TMDB devuelve cualquier listado paginado.
// Genérico <T>: sirve igual para películas, series o personas.
export interface Pagina<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// TMDB no deja pedir más allá de la página 500
export const MAX_PAGINAS = 500
