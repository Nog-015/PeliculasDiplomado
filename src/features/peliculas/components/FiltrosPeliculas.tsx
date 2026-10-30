import { Search, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ORDENES, type Genero, type Orden } from '../models/pelicula'

interface Props {
  busqueda: string
  genero: number | undefined
  orden: Orden
  generos: Genero[]
  onBuscar: (texto: string) => void
  onGenero: (genero: number | undefined) => void
  onOrden: (orden: Orden) => void
}

export function FiltrosPeliculas({ busqueda, genero, orden, generos, onBuscar, onGenero, onOrden }: Props) {
  // M3 · Lo que se está escribiendo vive aquí; la búsqueda "oficial" vive en el padre.
  // Así no se busca en cada tecla, solo al enviar.
  const [texto, setTexto] = useState(busqueda)

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault() // sin esto, el navegador recarga la página
    onBuscar(texto.trim())
  }

  function limpiar() {
    setTexto('')
    onBuscar('')
  }

  // TMDB no deja combinar búsqueda por texto con género u orden
  const buscando = busqueda !== ''

  return (
    <div className="mb-8 flex flex-wrap items-end gap-3">
      <form onSubmit={enviar} className="flex min-w-64 flex-1 gap-2" role="search">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          {/* M3 · Input CONTROLADO: value viene del estado y onChange lo actualiza en cada tecla */}
          <Input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Buscar por título…"
            aria-label="Buscar película"
            className="pl-9"
          />
          {texto && (
            <button type="button" onClick={limpiar} aria-label="Limpiar búsqueda" className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">Género</span>
        {/* Los Select de shadcn trabajan con strings: convertimos a número al recibir */}
        <Select
          value={genero ? String(genero) : 'todos'}
          onValueChange={(v) => onGenero(v === 'todos' ? undefined : Number(v))}
          disabled={buscando}
        >
          <SelectTrigger className="w-44" aria-label="Género">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {generos.map((g) => (
              <SelectItem key={g.id} value={String(g.id)}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">Ordenar</span>
        <Select value={orden} onValueChange={(v) => onOrden(v as Orden)} disabled={buscando}>
          <SelectTrigger className="w-48" aria-label="Ordenar">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ORDENES.map((o) => (
              <SelectItem key={o.valor} value={o.valor}>
                {o.texto}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {buscando && <p className="w-full text-xs text-muted-foreground">Al buscar por título, TMDB ignora el género y el orden.</p>}
    </div>
  )
}
