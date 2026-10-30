import { SearchX } from 'lucide-react'
import { useState } from 'react'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { MensajeError } from '@/shared/components/MensajeError'
import { Paginador } from '@/shared/components/Paginador'
import { MAX_PAGINAS } from '@/shared/models/pagina'
import { FiltrosPeliculas } from '../components/FiltrosPeliculas'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { useGeneros, usePeliculas } from '../hooks/usePeliculas'
import type { Orden } from '../models/pelicula'

const formato = new Intl.NumberFormat('es-VE')

// Página CONTENEDORA. Ya no sabe de efectos, AbortController ni Axios: solo decide QUÉ mostrar.
// M7: ya no recibe props. Las favoritas las lee la grilla del contexto.
export function CatalogoPeliculas() {
  const [busqueda, setBusqueda] = useState('')
  const [genero, setGenero] = useState<number>()
  const [orden, setOrden] = useState<Orden>('popularity.desc')
  const [pagina, setPagina] = useState(1)

  // M6 · Los dos useEffect y los cuatro useState de la petición quedaron en dos líneas
  const { datos: respuesta, error, cargando, reintentar } = usePeliculas({ busqueda, genero, orden, pagina })
  const generos = useGeneros()

  // Al cambiar un filtro volvemos a la página 1. Se hace en el manejador del evento, NO en un efecto.
  function cambiarBusqueda(texto: string) {
    setBusqueda(texto)
    setPagina(1)
  }
  function cambiarGenero(g: number | undefined) {
    setGenero(g)
    setPagina(1)
  }
  function cambiarOrden(o: Orden) {
    setOrden(o)
    setPagina(1)
  }
  function irAPagina(nueva: number) {
    setPagina(nueva)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Dato derivado: TMDB no deja pasar de la página 500
  const totalPaginas = Math.min(respuesta?.total_pages ?? 0, MAX_PAGINAS)

  return (
    <section>
      <title>{busqueda ? `“${busqueda}” · Cartelera` : 'Películas · Cartelera'}</title>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{busqueda ? 'Resultados' : 'Películas'}</h1>
        {respuesta && <p className="text-sm text-muted-foreground">{formato.format(respuesta.total_results)} películas</p>}
      </div>

      <FiltrosPeliculas
        busqueda={busqueda}
        genero={genero}
        orden={orden}
        generos={generos}
        onBuscar={cambiarBusqueda}
        onGenero={cambiarGenero}
        onOrden={cambiarOrden}
      />

      {/* Una vista distinta para cada estado de la petición */}
      {error ? (
        <MensajeError mensaje={error} onReintentar={reintentar} />
      ) : !respuesta ? (
        <EsqueletoGrilla />
      ) : respuesta.results.length === 0 ? (
        <EstadoVacio icono={SearchX} titulo="Sin resultados">
          <p>No hay películas que coincidan con “{busqueda}”.</p>
        </EstadoVacio>
      ) : (
        // Mientras llega lo nuevo, lo anterior se ve atenuado
        <div className={cargando ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
          <GrillaPeliculas peliculas={respuesta.results} />
          <Paginador pagina={pagina} totalPaginas={totalPaginas} onCambiar={irAPagina} />
        </div>
      )}
    </section>
  )
}
