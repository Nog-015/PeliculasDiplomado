import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { imagen } from '@/core/config/tmdb'
import { cn } from '@/lib/utils'
import { anio, type DetallePelicula } from '../models/pelicula'
import { BotonFavorito } from './BotonFavorito'
import { Calificacion } from './Calificacion'
import { DialogoTrailer } from './DialogoTrailer'
import { Reparto } from './Reparto'

interface Props {
  pelicula: DetallePelicula
  favorita: boolean
  onFavorito: () => void
}

function duracion(minutos: number | null) {
  if (!minutos) return null
  const h = Math.floor(minutos / 60)
  return h ? `${h} h ${minutos % 60} min` : `${minutos} min`
}

// Ficha completa de una película. Ya viene hecha: solo pinta lo que le llega por props.
// La usa la página de detalle en M8.
export function FichaPelicula({ pelicula: peli, favorita, onFavorito }: Props) {
  const fondo = imagen(peli.backdrop_path, 'w1280')
  const poster = imagen(peli.poster_path, 'w500')
  const trailer = peli.videos.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ?? peli.videos.results.find((v) => v.site === 'YouTube')

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border bg-card">
        {fondo && <img src={fondo} alt="" className="absolute inset-0 size-full object-cover opacity-20" />}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

        <div className={cn('relative grid gap-8 p-6 md:p-10', poster && 'md:grid-cols-[260px_1fr]')}>
          {poster && <img src={poster} alt={`Póster de ${peli.title}`} className="w-48 rounded-xl shadow-2xl md:w-full" />}
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {peli.title} <span className="font-normal text-muted-foreground">({anio(peli.release_date)})</span>
            </h1>
            {peli.tagline && <p className="mt-2 text-lg text-muted-foreground italic">{peli.tagline}</p>}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {peli.vote_average > 0 && <Calificacion valor={peli.vote_average} className="mr-1" />}
              {duracion(peli.runtime) && (
                <span className="mr-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="size-4" /> {duracion(peli.runtime)}
                </span>
              )}
              {peli.genres.map((g) => (
                <Badge key={g.id} variant="outline">
                  {g.name}
                </Badge>
              ))}
            </div>

            <p className="mt-6 max-w-2xl leading-relaxed">{peli.overview || 'Sin sinopsis en español.'}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BotonFavorito activo={favorita} onAlternar={onFavorito} className="size-10" />
              {trailer && <DialogoTrailer video={trailer} />}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Reparto actores={peli.credits.cast.slice(0, 12)} />
      </div>
    </>
  )
}

// Lo que se ve mientras llega el detalle
export function EsqueletoFicha() {
  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]" aria-busy="true" aria-label="Cargando">
      <Skeleton className="aspect-2/3 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  )
}
