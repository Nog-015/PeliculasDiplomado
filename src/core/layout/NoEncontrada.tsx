import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

// Página 404. Ya viene hecha: se conecta en M8 con la ruta path: '*'
export function NoEncontrada() {
  return (
    <section className="py-24 text-center">
      <title>Página no encontrada · Cartelera</title>
      <p className="text-7xl font-black text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Esta función no está en cartelera</h1>
      <Button asChild className="mt-6">
        <Link to="/peliculas">Volver al catálogo</Link>
      </Button>
    </section>
  )
}
