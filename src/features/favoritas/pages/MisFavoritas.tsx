import { Heart } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { useFavoritas } from '@/core/favoritas/favoritas-context'
import { GrillaPeliculas } from '@/features/peliculas/components/GrillaPeliculas'
import { EstadoVacio } from '@/shared/components/EstadoVacio'

// M7 · Otra feature leyendo el mismo estado global, sin que nadie se lo pase
// M8 · Ya no recibe props: para volver al catálogo basta un Link
export function MisFavoritas() {
  const { favoritas } = useFavoritas()

  return (
    <section>
      <title>Mis favoritas · Cartelera</title>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Mis favoritas</h1>

      {favoritas.length === 0 ? (
        <EstadoVacio icono={Heart} titulo="Todavía no marcas ninguna película">
          <Button variant="outline" asChild>
            <Link to="/peliculas">Ir al catálogo</Link>
          </Button>
        </EstadoVacio>
      ) : (
        <GrillaPeliculas peliculas={favoritas} />
      )}
    </section>
  )
}
