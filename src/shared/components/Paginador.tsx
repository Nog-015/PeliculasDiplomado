import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  pagina: number
  totalPaginas: number
  onCambiar: (pagina: number) => void
}

// Componente de presentación: no sabe de películas. Recibe datos y avisa con onCambiar.
export function Paginador({ pagina, totalPaginas, onCambiar }: Props) {
  // Retorno temprano: si no hay nada que paginar, el componente no pinta nada
  if (totalPaginas <= 1) return null

  return (
    <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Paginación">
      <Button variant="outline" disabled={pagina === 1} onClick={() => onCambiar(pagina - 1)}>
        <ChevronLeft /> Anterior
      </Button>
      <span className="text-sm text-muted-foreground tabular-nums">
        {pagina} / {totalPaginas}
      </span>
      <Button variant="outline" disabled={pagina === totalPaginas} onClick={() => onCambiar(pagina + 1)}>
        Siguiente <ChevronRight />
      </Button>
    </nav>
  )
}
