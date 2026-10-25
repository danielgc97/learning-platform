import { BRAND_PARTS } from '../brand'

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-ink">
      <span className="size-2.5 bg-accent" aria-hidden="true" />
      <span>
        {BRAND_PARTS[0]}
        <span className="text-accent">{BRAND_PARTS[1]}</span>
      </span>
    </span>
  )
}
