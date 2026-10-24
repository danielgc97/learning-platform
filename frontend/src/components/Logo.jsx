import { BRAND_PARTS } from '../brand'
import { CodeIcon } from './Icons'

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
      <span className="flex size-7 items-center justify-center rounded-lg bg-teal-600 text-white dark:bg-teal-500 dark:text-slate-950">
        <CodeIcon width={16} height={16} />
      </span>
      <span>
        {BRAND_PARTS[0]}
        <span className="text-teal-600 dark:text-teal-400">{BRAND_PARTS[1]}</span>
      </span>
    </span>
  )
}
