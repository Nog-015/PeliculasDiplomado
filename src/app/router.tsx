import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from '@/core/layout/Layout'
import { NoEncontrada } from '@/core/layout/NoEncontrada'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { DetallePelicula } from '@/features/peliculas/pages/DetallePelicula'
import { Estrenos } from '@/features/peliculas/pages/Estrenos'

// M8 · El mapa de la app: qué componente se pinta para cada URL (como app.routes.ts en Angular)
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout, // la ruta padre: Header + <Outlet /> + footer
    children: [
      { index: true, element: <Navigate to="/peliculas" replace /> },
      { path: 'peliculas', Component: CatalogoPeliculas },
      { path: 'peliculas/:id', Component: DetallePelicula }, // :id es un segmento dinámico
      { path: 'estrenos', Component: Estrenos },
      { path: 'favoritas', Component: MisFavoritas },
      { path: '*', Component: NoEncontrada }, // 404: cualquier ruta que no coincida
    ],
  },
])
