import { useConsulta } from '@/shared/hooks/useConsulta'
import type { Orden } from '../models/pelicula'
import { buscar, descubrir, obtenerDetalle, obtenerEstrenos, obtenerGeneros } from '../services/peliculas.service'

// M6 · Hooks de la feature: combinan useConsulta con el servicio.
// La página ya no sabe de efectos, AbortController ni Axios: solo pide "las películas con estos filtros".

interface Filtros {
  busqueda: string
  genero?: number
  orden: Orden
  pagina: number
}

export function usePeliculas({ busqueda, genero, orden, pagina }: Filtros) {
  const clave = busqueda ? `buscar|${busqueda}|${pagina}` : `descubrir|${genero}|${orden}|${pagina}`
  return useConsulta(clave, (signal) => (busqueda ? buscar(busqueda, pagina, signal) : descubrir({ pagina, genero, orden }, signal)))
}

export function useEstrenos(pagina: number, region: string) {
  return useConsulta(`estrenos|${region}|${pagina}`, (signal) => obtenerEstrenos(pagina, region, signal))
}

export function useGeneros() {
  const { datos } = useConsulta('generos', obtenerGeneros)
  return datos ?? []
}

// Lo usamos en M8, en la página de detalle
export function usePelicula(id: number) {
  return useConsulta(`pelicula|${id}`, (signal) => obtenerDetalle(id, signal))
}
