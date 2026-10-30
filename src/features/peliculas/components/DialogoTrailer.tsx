import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { Video } from '../models/pelicula'

// Dialog de shadcn en modo "no controlado": el propio Dialog guarda si está abierto.
// DialogTrigger lo abre; la X o Esc lo cierran. Al cerrarse, el iframe desaparece y el video se detiene.
export function DialogoTrailer({ video }: { video: Video }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Play className="fill-current" /> Ver tráiler
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">{video.name}</DialogTitle>
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1`}
            title={video.name}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
