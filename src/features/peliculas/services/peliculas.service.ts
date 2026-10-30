import { tmdb } from '@/core/api/tmdb'
import { MAX_PAGINAS, type Pagina } from '@/shared/models/pagina'
import { hoyLocal, type DetallePelicula, type Genero, type Orden, type Pelicula } from '../models/pelicula'

// El servicio: funciones que hablan con la API. Los componentes nunca arman URLs.
// Axios ya convierte la respuesta a JSON y lanza error si el estado no es 2xx.

export interface FiltrosListado {
  pagina: number
  genero?: number
  orden?: Orden
}

// /discover filtra por género y ordena, pero NO busca por texto
export async function descubrir({ pagina, genero, orden = 'popularity.desc' }: FiltrosListado, signal?: AbortSignal) {
  const { data } = await tmdb.get<Pagina<Pelicula>>('/discover/movie', {
    params: {
      page: pagina,
      with_genres: genero, // si es undefined, Axios no lo manda
      sort_by: orden,
      // Sin esto, "mejor calificadas" se llena de películas con un solo voto
      'vote_count.gte': orden === 'vote_average.desc' ? 300 : undefined,
      // Evita estrenos futuros en "más recientes"
      'primary_release_date.lte': orden === 'primary_release_date.desc' ? hoy() : undefined,
      include_adult: false,
    },
    signal,
  })
  return data
}

// /search busca por texto, pero NO acepta género ni orden (limitación de TMDB)
export async function buscar(texto: string, pagina: number, signal?: AbortSignal) {
  const { data } = await tmdb.get<Pagina<Pelicula>>('/search/movie', {
    params: { query: texto, page: pagina, include_adult: false },
    signal,
  })
  return data
}

export async function obtenerEstrenos(pagina: number, region: string, signal?: AbortSignal) {
  const hoy = hoyLocal()
  const [primeraEspanol, primeraIngles] = await Promise.all([
    tmdb.get<Pagina<Pelicula>>('/movie/upcoming', { params: { page: 1, region, language: 'es-MX' }, signal }),
    tmdb.get<Pagina<Pelicula>>('/movie/upcoming', { params: { page: 1, region, language: 'en-US' }, signal }),
  ])
  const totalPaginasApi = Math.min(primeraEspanol.data.total_pages, MAX_PAGINAS)
  const paginasRestantes = await Promise.all(
    Array.from({ length: totalPaginasApi - 1 }, (_, indice) => indice + 2).map(async (paginaApi) =>
      Promise.all([
        tmdb.get<Pagina<Pelicula>>('/movie/upcoming', { params: { page: paginaApi, region, language: 'es-MX' }, signal }),
        tmdb.get<Pagina<Pelicula>>('/movie/upcoming', { params: { page: paginaApi, region, language: 'en-US' }, signal }),
      ]),
    ),
  )
  const paginasEspanol = [primeraEspanol.data, ...paginasRestantes.map(([espanol]) => espanol.data)]
  const paginasIngles = [primeraIngles.data, ...paginasRestantes.map(([, ingles]) => ingles.data)]
  const titulosIngles = new Map(paginasIngles.flatMap((pagina) => pagina.results.map((p) => [p.id, p.title] as const)))
  const peliculas = new Map<number, Pelicula>()

  for (const respuesta of paginasEspanol) {
    for (const pelicula of respuesta.results) {
      if (pelicula.release_date >= hoy) {
        peliculas.set(pelicula.id, {
          ...pelicula,
          title: tituloPreferido(pelicula, titulosIngles.get(pelicula.id)),
        })
      }
    }
  }

  const ordenados = [...peliculas.values()].sort((a, b) => a.release_date.localeCompare(b.release_date))
  const inicio = (pagina - 1) * 20
  const resultadosPagina = ordenados.slice(inicio, inicio + 20)

  return {
    ...primeraEspanol.data,
    page: pagina,
    results: resultadosPagina,
    total_results: ordenados.length,
    total_pages: Math.ceil(ordenados.length / 20),
  }
}

function tituloPreferido(p: Pelicula, tituloIngles?: string) {
  if (p.title !== p.original_title || p.original_language === 'es') return p.title
  return tituloIngles || p.title
}

// append_to_response: reparto, videos y similares en UNA sola petición
export async function obtenerDetalle(id: number, signal?: AbortSignal) {
  const { data } = await tmdb.get<DetallePelicula>(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar', include_video_language: 'es,en' },
    signal,
  })
  return data
}

export async function obtenerGeneros(signal?: AbortSignal) {
  const { data } = await tmdb.get<{ genres: Genero[] }>('/genre/movie/list', { signal })
  return data.genres
}

function hoy() {
  return new Date().toISOString().slice(0, 10)
}
