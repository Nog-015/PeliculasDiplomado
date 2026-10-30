import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface Props {
  mensaje: string
  onReintentar?: () => void // el ? la hace opcional
}

export function MensajeError({ mensaje, onReintentar }: Props) {
  return (
    <Alert variant="destructive" className="mx-auto mt-10 max-w-md">
      <TriangleAlert />
      <AlertTitle>No se pudo cargar</AlertTitle>
      <AlertDescription>
        <p>{mensaje}</p>
        {/* Solo se muestra el botón si el padre mandó la función */}
        {onReintentar && (
          <Button variant="outline" size="sm" className="mt-3" onClick={onReintentar}>
            Reintentar
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
