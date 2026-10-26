import { BRAND_PARTS } from '../brand'

// Una "C" abierta con un punto: el punto es un nodo de datos que sale de la letra.
export function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M24.2 10.2A10 10 0 1 0 24.2 21.8" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="24.6" cy="16" r="2.7" className="fill-accent" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-xl tracking-tight text-ink">
      <LogoMark />
      <span>
        <span className="font-semibold">{BRAND_PARTS[0]}</span>
        <span className="font-normal text-accent">{BRAND_PARTS[1]}</span>
      </span>
    </span>
  )
}
