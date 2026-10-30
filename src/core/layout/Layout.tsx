import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './Header'

// M8 · Ruta "padre": lo que se repite en todas las páginas (antes estaba en App).
// <Outlet /> es el hueco donde se pinta la ruta hija, como <router-outlet> en Angular.
export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Datos e imágenes de{' '}
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline hover:text-foreground">
          TMDB
        </a>
        . Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
      </footer>
      <ScrollRestoration />
    </div>
  )
}
