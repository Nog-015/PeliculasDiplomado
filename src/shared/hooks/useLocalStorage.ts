import { useEffect, useState } from 'react'

// Como useState, pero el valor sobrevive a recargar la página.
// Ya viene hecho: lo usa el Provider de favoritas en M7. Léanlo, es un hook propio de 15 líneas.
export function useLocalStorage<T>(clave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const guardado = localStorage.getItem(clave)
      return guardado ? (JSON.parse(guardado) as T) : inicial
    } catch {
      return inicial
    }
  })

  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor))
  }, [clave, valor])

  return [valor, setValor] as const
}
