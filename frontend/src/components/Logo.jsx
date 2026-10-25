import { BRAND_NAME } from '../brand'

export function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <g fill="currentColor">
        <rect x="5" y="21" width="6" height="6" />
        <rect x="13" y="21" width="6" height="6" />
        <rect x="21" y="21" width="6" height="6" />
        <rect x="13" y="13" width="6" height="6" />
        <rect x="21" y="13" width="6" height="6" />
      </g>
      <rect x="21" y="5" width="6" height="6" className="fill-accent" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-ink">
      <LogoMark />
      <span>{BRAND_NAME}</span>
    </span>
  )
}
