import { useEffect, useState } from 'react'
import { apiFetch } from './api'

export function useApi(path) {
  const [state, setState] = useState({ data: null, error: null, loading: true })

  useEffect(() => {
    let cancelled = false
    setState({ data: null, error: null, loading: true })
    apiFetch(path)
      .then((data) => !cancelled && setState({ data, error: null, loading: false }))
      .catch((e) => !cancelled && setState({ data: null, error: e.message, loading: false }))
    return () => {
      cancelled = true
    }
  }, [path])

  return state
}
