import { createContext, use } from 'react'
import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'

export interface FavoritasValor {
  favoritas: PeliculaResumen[]
  esFavorita: (id: number) => boolean
  alternar: (pelicula: PeliculaResumen) => void
}

// M7 · Context: un canal para pasar datos a cualquier componente del árbol sin ir
// pasándolos por props nivel por nivel. Acaba con el "prop drilling".
export const FavoritasContext = createContext<FavoritasValor | null>(null)

// Hook para leerlo. use() es de React 19 (antes: useContext).
export function useFavoritas() {
  const valor = use(FavoritasContext)
  if (!valor) throw new Error('useFavoritas debe usarse dentro de <FavoritasProvider>')
  return valor
}
