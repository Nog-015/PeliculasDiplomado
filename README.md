# Cartelera · clase-react-2026

Catálogo de películas con la API de [TMDB](https://www.themoviedb.org), hecho en la última clase de React del módulo **Programación del lado del cliente** (URBE 2026).

React 19 + TypeScript + Vite, Tailwind 4, componentes de [shadcn/ui](https://ui.shadcn.com), íconos de [Lucide](https://lucide.dev), peticiones con [Axios](https://axios-http.com) y rutas con React Router.

## Cómo arrancar

```bash
git clone https://github.com/Ronjrs97/clase-react-2026.git
cd clase-react-2026
npm install
npm run dev        # http://localhost:5173
```

Requisitos: Node **22.22+** o **24+** (revisa con `node -v`).

A partir de M4 hace falta el token de TMDB:

1. Crea una cuenta en TMDB y entra a **Configuración → API** (https://www.themoviedb.org/settings/api).
2. Copia `.env.example` como `.env.local` y pega el **API Read Access Token** (el largo, empieza con `eyJ`).
3. Reinicia `npm run dev` (Vite solo lee `.env.local` al arrancar).

> `.env.local` no se sube a git. Cada quien usa su propio token.

## Cómo está armado

La interfaz ya viene hecha: Header, tarjetas, filtros, paginador, estados vacíos, la ficha de detalle. En clase escribimos **solo la parte de React**. Busca los comentarios `TODO M1`, `TODO M2`… en el código.

```
src/
├── app/router.tsx              M8
├── core/
│   ├── api/tmdb.ts             instancia de Axios (lista)
│   ├── config/tmdb.ts          URLs, idioma, imágenes (lista)
│   ├── favoritas/              M7 · Context
│   └── layout/                 Header, NoEncontrada (+ Layout en M8)
├── features/
│   ├── peliculas/
│   │   ├── components/         tarjetas, grilla, filtros, ficha
│   │   ├── data/               películas de ejemplo (M1 a M3)
│   │   ├── hooks/              M6 · usePeliculas
│   │   ├── models/             interfaces de TMDB
│   │   ├── pages/              CatalogoPeliculas (+ DetallePelicula en M8)
│   │   └── services/           peticiones a TMDB (listo)
│   └── favoritas/pages/        MisFavoritas
└── shared/
    ├── components/             EstadoVacio, MensajeError, Paginador, EsqueletoGrilla
    ├── hooks/                  useLocalStorage (listo) · useConsulta (M6)
    └── models/
```

## Hitos

| Tag | Qué se hace |
|---|---|
| `m0-esqueleto` | Punto de partida (rama `main`) |
| `m1-favoritas` | useState, eventos y levantar el estado |
| `m2-vistas` | Renderizado condicional y children |
| `m3-busqueda` | Input controlado y dato derivado |
| `m4-api` | Axios, servicio y useEffect con carga y error |
| `m5-filtros` | Género, orden y paginación |
| `m6-hook-propio` | useConsulta y usePeliculas |
| `m7-context` | Favoritas con Context, sin prop drilling |
| `m8-router` | React Router: rutas, Link, useParams y detalle |

### Si te quedaste atrás

Trae la solución de un hito sobre tu `src` y sigue con el grupo:

```bash
git fetch --tags
git checkout m4-api -- src      # reemplaza tu src por el del hito M4
```

Para ver qué cambió entre dos hitos:

```bash
git diff m3-busqueda m4-api -- src
```

Para mirar la solución completa sin tocar tu trabajo: `git switch soluciones` (y `git switch main` para volver).

## Scripts

```bash
npm run dev        # servidor de desarrollo
npm run build      # revisa tipos y compila a dist/
npm run lint       # revisa el código con oxlint
```
