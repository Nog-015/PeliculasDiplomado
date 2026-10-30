import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { MensajeError } from '@/shared/components/MensajeError'
import { Paginador } from '@/shared/components/Paginador'
import { MAX_PAGINAS } from '@/shared/models/pagina'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { useEstrenos } from '../hooks/usePeliculas'
import { PAISES, diasHasta } from '../models/pelicula'

export function Estrenos() {
  const [pais, setPais] = useState('VE')
  const [pagina, setPagina] = useState(1)

  const { datos: respuesta, error, cargando, reintentar } = useEstrenos(pagina, pais)

  function cambiarPais(codigo: string) {
    setPais(codigo)
    setPagina(1)
  }
  function irAPagina(nueva: number) {
    setPagina(nueva)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPaginas = Math.min(respuesta?.total_pages ?? 0, MAX_PAGINAS)
  const proximo = respuesta?.results[0]
  const dias = proximo ? diasHasta(proximo.release_date) : undefined

  return (
    <section>
      <title>Próximos estrenos · Cartelera</title>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Próximos estrenos</h1>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground">País</span>
          <Select value={pais} onValueChange={cambiarPais}>
            <SelectTrigger className="w-56" aria-label="País">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAISES.map((p) => (
                <SelectItem key={p.codigo} value={p.codigo}>
                  {p.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <MensajeError mensaje={error} onReintentar={reintentar} />
      ) : cargando || !respuesta ? (
        <EsqueletoGrilla />
      ) : respuesta.results.length === 0 ? (
        <EstadoVacio icono={CalendarDays} titulo="Sin estrenos próximos">
          <p>No hay películas por estrenar en este país.</p>
        </EstadoVacio>
      ) : (
        <div className={cargando ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
          {proximo && dias !== undefined && dias >= 0 && (
            <p role="status" className="mb-6 rounded-lg border bg-card px-4 py-3 text-sm">
              El próximo estreno es <strong>{proximo.title}</strong>
              {dias === 0 ? ', se estrena hoy' : ` en ${dias} ${dias === 1 ? 'día' : 'días'}`}
            </p>
          )}
          <GrillaPeliculas peliculas={respuesta.results} />
          <Paginador pagina={pagina} totalPaginas={totalPaginas} onCambiar={irAPagina} />
        </div>
      )}
    </section>
  )
}
