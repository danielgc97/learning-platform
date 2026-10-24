import { useSyncExternalStore } from 'react'

const listeners = new Set()
const root = document.documentElement

const isDark = () => root.classList.contains('dark')

export function setDark(dark) {
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    // Sin almacenamiento (modo privado): el cambio vale solo para esta visita.
  }
  listeners.forEach((notify) => notify())
}

export function useDarkMode() {
  return useSyncExternalStore((notify) => {
    listeners.add(notify)
    return () => listeners.delete(notify)
  }, isDark)
}
