import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { useFavoritas } from '@/core/favoritas/favoritas-context'
import { MensajeError } from '@/shared/components/MensajeError'
import { EsqueletoFicha, FichaPelicula } from '../components/FichaPelicula'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { usePelicula } from '../hooks/usePeliculas'
import { anio } from '../models/pelicula'

// M8 · Una página con su propia URL: /peliculas/603
export function DetallePelicula() {
  // useParams lee los segmentos dinámicos de la ruta (:id). Siempre llegan como string.
  const { id } = useParams()
  const { datos: peli, error, reintentar } = usePelicula(Number(id))
  const { esFavorita, alternar } = useFavoritas()

  // Retornos tempranos: primero el error, luego la carga, al final la película
  if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />
  if (!peli) return <EsqueletoFicha />

  return (
    <article>
      <title>{`${peli.title} (${anio(peli.release_date)}) · Cartelera`}</title>

      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground">
        <Link to="/peliculas">
          <ArrowLeft /> Catálogo
        </Link>
      </Button>

      <FichaPelicula pelicula={peli} favorita={esFavorita(peli.id)} onFavorito={() => alternar(peli)} />

      {peli.similar.results.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold">Si te gustó, mira también</h2>
          {/* Cada tarjeta es un Link a otra película: cambia el :id y usePelicula vuelve a pedir */}
          <GrillaPeliculas peliculas={peli.similar.results.slice(0, 5)} />
        </section>
      )}
    </article>
  )
}
