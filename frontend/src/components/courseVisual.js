import { BotIcon, CodeIcon, DatabaseIcon, SparkIcon } from './Icons'

const VISUALS = [
  { match: 'fundamentos-ia', Icon: SparkIcon, tile: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300' },
  { match: 'sql', Icon: DatabaseIcon, tile: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
  { match: 'python', Icon: CodeIcon, tile: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
  { match: 'agent', Icon: BotIcon, tile: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
]

export function courseVisual(slug) {
  return VISUALS.find((v) => slug.includes(v.match)) ?? VISUALS[1]
}
