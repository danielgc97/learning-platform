import { BRAND_PARTS } from '../brand'

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
      <rect x="21" y="5" width="6" height="6" fill="#2f54eb" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-ink">
      <span className="flex size-9 items-center justify-center rounded-lg border-2 border-ink bg-c1 text-[#111] shadow-[2px_2px_0_0_var(--shadow)]">
        <LogoMark size={24} />
      </span>
      <span>
        {BRAND_PARTS[0]}
        <span className="ml-0.5 rounded-md bg-c1 px-1.5 text-[#111]">{BRAND_PARTS[1]}</span>
      </span>
    </span>
  )
}
