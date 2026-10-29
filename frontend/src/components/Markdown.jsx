import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const el = (Tag, className) =>
  function Styled({ node, ...props }) {
    void node
    return <Tag className={className} {...props} />
  }

const components = {
  h1: el('h1', 'mt-2 mb-5 font-display text-4xl leading-tight sm:text-5xl'),
  h2: el('h2', 'mt-12 mb-3 font-display text-2xl leading-tight sm:text-3xl'),
  h3: el('h3', 'mt-8 mb-2 font-display text-xl'),
  p: el('p', 'my-4 text-[1.05rem] leading-8'),
  ul: el('ul', 'my-4 list-disc space-y-2 pl-6 marker:text-accent'),
  ol: el('ol', 'my-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent'),
  a: el('a', ''),
  strong: el('strong', 'font-semibold'),
  blockquote: el('blockquote', 'my-6 rounded-lg border border-line tint-1 px-5 py-3'),
  pre: el(
    'pre',
    'my-6 overflow-x-auto rounded-xl border border-line bg-code p-4 font-mono text-sm leading-6 text-code-ink [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0',
  ),
  code: el('code', 'rounded-md border border-line bg-panel px-1.5 py-0.5 font-mono text-[0.88em]'),
  table: function Table({ node, ...props }) {
    void node
    return (
      <div className="my-6 overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm" {...props} />
      </div>
    )
  },
  thead: el('thead', 'bg-panel'),
  th: el('th', 'px-3 py-2 text-left font-semibold whitespace-nowrap'),
  td: el('td', 'border-t border-line px-3 py-2 align-top'),
}

// Variante para respuestas cortas dentro de un cuadro (por ejemplo, las pistas de la IA).
const compactComponents = {
  ...components,
  p: el('p', 'my-1 leading-6'),
  ul: el('ul', 'my-1 list-disc space-y-1 pl-5'),
  ol: el('ol', 'my-1 list-decimal space-y-1 pl-5'),
  code: el('code', 'rounded bg-white/60 px-1 font-mono text-[0.9em]'),
}

export default function Markdown({ children, compact = false }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={compact ? compactComponents : components}>
      {children}
    </ReactMarkdown>
  )
}
