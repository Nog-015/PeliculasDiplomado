import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  activo: boolean
  onAlternar: () => void
  className?: string
}

// Eventos: onClick recibe una FUNCIÓN. onClick={onAlternar}, nunca onClick={onAlternar()}
export function BotonFavorito({ activo, onAlternar, className }: Props) {
  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={onAlternar}
      aria-pressed={activo}
      aria-label={activo ? 'Quitar de favoritas' : 'Agregar a favoritas'}
      className={cn('rounded-full bg-black/60 backdrop-blur hover:bg-black/80', className)}
    >
      <Heart className={activo ? 'fill-primary text-primary' : 'text-white'} />
    </Button>
  )
}
