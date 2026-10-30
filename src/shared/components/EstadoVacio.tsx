import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  icono: LucideIcon // un COMPONENTE como prop
  titulo: string
  children?: ReactNode // lo que va entre <EstadoVacio> y </EstadoVacio>
}

// children: el padre decide qué va adentro (un texto, un botón, lo que sea)
export function EstadoVacio({ icono: Icono, titulo, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center text-muted-foreground">
      {/* Para usar un componente que llegó por props, su nombre debe empezar con mayúscula */}
      <Icono className="size-10" />
      <p className="text-lg font-medium text-foreground">{titulo}</p>
      {children}
    </div>
  )
}
