import { BotIcon, CodeIcon, DatabaseIcon } from './Icons'

const VISUALS = [
  { match: 'sql', Icon: DatabaseIcon, tile: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
  { match: 'python', Icon: CodeIcon, tile: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
  { match: 'agent', Icon: BotIcon, tile: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
]

export function courseVisual(slug) {
  return VISUALS.find((v) => slug.includes(v.match)) ?? VISUALS[1]
}
