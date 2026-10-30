import axios from 'axios'
import { useEffect, useEffectEvent, useState } from 'react'

// M6 · Hook propio: el useEffect + AbortController del catálogo, escrito UNA sola vez.
// Un hook es una función que empieza con "use" y usa otros hooks.
//
// `clave` describe QUÉ se pide (ej. "descubrir|28|popularity.desc|2"). Si cambia, se vuelve a pedir.
// Es la misma idea que usa TanStack Query.
export function useConsulta<T>(clave: string, consultar: (signal: AbortSignal) => Promise<T>) {
  const [datos, setDatos] = useState<T>()
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [intento, setIntento] = useState(0)

  // useEffectEvent (React 19.2): siempre usa la última versión de `consultar`
  // sin meterla en las dependencias (si no, se pediría en cada render).
  const ejecutar = useEffectEvent(consultar)

  useEffect(() => {
    const control = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        setDatos(await ejecutar(control.signal))
      } catch (e) {
        if (!axios.isCancel(e)) setError((e as Error).message)
      } finally {
        if (!control.signal.aborted) setCargando(false)
      }
    }
    cargar()

    return () => control.abort()
  }, [clave, intento])

  return { datos, error, cargando, reintentar: () => setIntento((n) => n + 1) }
}
