import axios from 'axios'
import { IDIOMA, TMDB_API, TMDB_TOKEN } from '../config/tmdb'

// El token largo (v4) va en la cabecera; la API key corta (v3) va como parámetro
const esTokenV4 = TMDB_TOKEN.startsWith('eyJ')

// Una instancia de Axios con lo que se repite en cada petición:
// la URL base, el idioma y la autenticación. Los servicios solo ponen la ruta.
export const tmdb = axios.create({
  baseURL: TMDB_API,
  params: { language: IDIOMA, ...(!esTokenV4 && { api_key: TMDB_TOKEN }) },
  headers: esTokenV4 ? { Authorization: `Bearer ${TMDB_TOKEN}` } : {},
})

// Interceptores: código que corre en TODAS las peticiones, antes de salir y al volver.
// Antes de salir: si no hay token, ni lo intentamos.
tmdb.interceptors.request.use((config) => {
  if (!TMDB_TOKEN) throw new Error('Falta VITE_TMDB_TOKEN en .env.local')
  return config
})

// Al volver con error: lo traducimos a un mensaje para el usuario. Así ningún componente
// tiene que saber qué significa un 401: en los componentes basta con error.message.
tmdb.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error) // cancelación: se deja pasar tal cual
    const estado = axios.isAxiosError(error) ? error.response?.status : undefined
    const mensajes: Record<number, string> = {
      401: 'Token de TMDB inválido',
      404: 'No encontramos lo que buscas',
      429: 'Demasiadas peticiones, espera un momento',
    }
    const mensaje = estado ? (mensajes[estado] ?? `TMDB respondió con error ${estado}`) : 'No hay conexión con TMDB'
    return Promise.reject(new Error(mensaje, { cause: error }))
  },
)
