import { CalendarDays, Clapperboard, Film, Heart } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { useFavoritas } from '@/core/favoritas/favoritas-context'
import { cn } from '@/lib/utils'

// M8 · NavLink sabe si su ruta está activa (como routerLinkActive en Angular).
// buttonVariants: las mismas clases del Button de shadcn, aplicadas a un enlace.
const enlace = ({ isActive }: { isActive: boolean }) => cn(buttonVariants({ variant: isActive ? 'secondary' : 'ghost' }))

// Ya no recibe props: la vista activa la dice la URL y el total, el contexto
export function Header() {
  const { favoritas } = useFavoritas()

  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="size-5" />
          </span>
          <span>
            <span className="block text-xl leading-tight font-bold tracking-tight">Cartelera</span>
            <span className="block text-xs text-muted-foreground">Catálogo de películas</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          <NavLink to="/peliculas" className={enlace}>
            <Film />
            Películas
          </NavLink>
          <NavLink to="/estrenos" className={enlace}>
            <CalendarDays />
            Estrenos
          </NavLink>
          <NavLink to="/favoritas" className={enlace}>
            <Heart className="fill-primary text-primary" />
            Favoritas
            {favoritas.length > 0 && <Badge className="ml-1 h-5 min-w-5 px-1.5 tabular-nums">{favoritas.length}</Badge>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
