import { useEffect, useRef, useState } from 'react'
import CourseIndex from './CourseIndex'
import { ArrowRightIcon } from './Icons'

// El índice vive fuera de la lección, en un cajón pegado al borde izquierdo: así la
// franja de la derecha queda libre para el vídeo de la clase.
// Con ratón basta rozar la pestaña para verlo; con un clic (o un toque, que es la única
// forma en el móvil) se queda fijo hasta que se cierra.
export default function CourseDrawer(props) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const root = useRef(null)

  const close = () => {
    setOpen(false)
    setPinned(false)
  }

  useEffect(() => {
    if (!pinned) return
    const onKey = (e) => e.key === 'Escape' && close()
    // Fijado se cierra al tocar cualquier otra cosa: no es un diálogo, no debe estorbar.
    const onDown = (e) => !root.current?.contains(e.target) && close()
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [pinned])

  const hover = (next) => (e) => e.pointerType === 'mouse' && !pinned && setOpen(next)

  return (
    <div
      ref={root}
      // Panel y pestaña viajan juntos en un mismo carril: cerrado, el carril se corre
      // su propio ancho a la izquierda y solo asoma la pestaña pegada al borde.
      // El carril no debe capturar clics; solo lo hacen la pestaña y el panel.
      className={`pointer-events-none fixed inset-y-0 left-0 z-30 flex w-max items-center transition-transform duration-300 ease-(--ease-lab) motion-reduce:transition-none ${
        open ? 'translate-x-0' : '-translate-x-72'
      }`}
      onPointerEnter={hover(true)}
      onPointerLeave={hover(false)}
    >
      <nav
        inert={!open}
        aria-label="Índice del curso"
        className={`pointer-events-auto h-full w-72 overflow-y-auto border-r border-line bg-surface px-5 py-6 ${
          open ? 'shadow-2xl shadow-black/20' : ''
        }`}
      >
        <CourseIndex {...props} onNavigate={close} />
      </nav>

      <button
        type="button"
        onClick={() => (pinned ? close() : (setPinned(true), setOpen(true)))}
        aria-expanded={open}
        aria-label={open ? 'Cerrar el índice del curso' : 'Ver el índice del curso'}
        // La pestaña se queda pegada al panel: al abrirse viaja con él.
        className="pointer-events-auto -ml-px flex h-32 w-6 items-center justify-center rounded-r-md border border-l-0 border-line bg-panel text-muted shadow-sm transition-colors hover:text-ink"
      >
        <ArrowRightIcon width={14} height={14} className={open ? 'rotate-180' : ''} />
      </button>
    </div>
  )
}
