import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { Toaster } from '@/components/ui/sonner'
import { router } from './app/router'
import { FavoritasProvider } from '@/core/favoritas/FavoritasProvider'
import './index.css'

// Punto de entrada: React toma el <div id="root"> del index.html y pinta ahí toda la app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritasProvider>
      {/* M8: ya no hay App; el router decide qué página se pinta según la URL */}
      <RouterProvider router={router} />
    </FavoritasProvider>
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
)
