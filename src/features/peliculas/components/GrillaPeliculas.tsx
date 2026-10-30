import { useFavoritas } from '@/core/favoritas/favoritas-context'
import type { PeliculaResumen } from '../models/pelicula'
import { PeliculaCard } from './PeliculaCard'

// Listas: .map() convierte cada dato en un elemento JSX. `key` = id, nunca el índice.
// M7 · Sin prop drilling: la grilla lee las favoritas del contexto. Solo recibe las películas.
export function GrillaPeliculas({ peliculas }: { peliculas: PeliculaResumen[] }) {
  const { esFavorita, alternar } = useFavoritas()

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
      {peliculas.map((p) => (
        <PeliculaCard key={p.id} pelicula={p} favorita={esFavorita(p.id)} onFavorito={alternar} />
      ))}
    </div>
  )
}
