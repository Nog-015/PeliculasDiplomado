import type { ReactNode } from 'react'
import { toast } from 'sonner'
import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { FavoritasContext } from './favoritas-context'

// M7 · El Provider guarda el estado (lo que antes vivía en App) y lo publica para todos sus hijos.
// Bonus: con useLocalStorage las favoritas sobreviven a recargar la página.
export function FavoritasProvider({ children }: { children: ReactNode }) {
  const [favoritas, setFavoritas] = useLocalStorage<PeliculaResumen[]>('favoritas', [])

  const esFavorita = (id: number) => favoritas.some((f) => f.id === id)

  function alternar(p: PeliculaResumen) {
    if (esFavorita(p.id)) {
      setFavoritas(favoritas.filter((f) => f.id !== p.id))
      toast(`Quitaste “${p.title}” de favoritas`)
    } else {
      // Guardamos solo lo que pinta la tarjeta (el detalle trae mucho más)
      const resumen = { id: p.id, title: p.title, poster_path: p.poster_path, release_date: p.release_date, vote_average: p.vote_average }
      setFavoritas([...favoritas, resumen])
      toast.success(`“${p.title}” agregada a favoritas`)
    }
  }

  // React 19: el contexto se usa directo como componente (antes: <FavoritasContext.Provider>)
  return <FavoritasContext value={{ favoritas, esFavorita, alternar }}>{children}</FavoritasContext>
}
