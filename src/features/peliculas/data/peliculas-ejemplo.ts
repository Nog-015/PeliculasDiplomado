import type { Pelicula } from '../models/pelicula'

// Datos de ejemplo para trabajar sin la API (M1 a M3). En M4 los cambiamos por TMDB.
// Sin póster a propósito: así se ve el ícono de reemplazo. Las notas son aproximadas.
function ejemplo(id: number, title: string, release_date: string, vote_average: number): Pelicula {
  return {
    id,
    title,
    original_title: title,
    overview: '',
    poster_path: null,
    backdrop_path: null,
    release_date,
    vote_average,
    vote_count: 1000,
    genre_ids: [],
  }
}

export const PELICULAS_EJEMPLO: Pelicula[] = [
  ejemplo(238, 'El Padrino', '1972-03-14', 8.7),
  ejemplo(603, 'Matrix', '1999-03-30', 8.2),
  ejemplo(129, 'El viaje de Chihiro', '2001-07-20', 8.5),
  ejemplo(354912, 'Coco', '2017-10-27', 8.2),
  ejemplo(496243, 'Parásitos', '2019-05-30', 8.5),
  ejemplo(157336, 'Interestelar', '2014-11-05', 8.4),
  ejemplo(1, 'Una película sin votos', '', 0),
  ejemplo(2, 'La peor película del año', '2020-01-01', 3.9),
  ejemplo(3, 'Una del montón', '2023-08-11', 5.6),
  ejemplo(680, 'Pulp Fiction', '1994-09-10', 8.5),
]
