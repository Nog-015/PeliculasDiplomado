import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

// El componente más simple: una función que recibe props y devuelve JSX.
// Las props llegan como UN objeto; aquí lo desestructuramos.
export function Calificacion({ valor, className }: { valor: number; className?: string }) {
  // TMDB califica de 0 a 10; mostramos con un decimal
  const nota = valor.toFixed(1)

  // JSX es JavaScript: un ternario elige el color según la nota
  const color = valor >= 7 ? 'text-emerald-400' : valor >= 5 ? 'text-crispeta' : 'text-primary'

  return (
    <span className={cn('inline-flex items-center gap-1 text-sm font-semibold tabular-nums', color, className)} title={`${nota} de 10`}>
      <Star className="size-4 fill-current" />
      {nota}
    </span>
  )
}
