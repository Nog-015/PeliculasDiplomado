import { Skeleton } from '@/components/ui/skeleton'

// Placeholder mientras llega la primera respuesta
export function EsqueletoGrilla({ cantidad = 10 }: { cantidad?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5" aria-busy="true" aria-label="Cargando">
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[2/3] rounded-xl" />
          <Skeleton className="mt-3 h-4 w-3/4" />
          <Skeleton className="mt-2 h-3 w-1/3" />
        </div>
      ))}
    </div>
  )
}
