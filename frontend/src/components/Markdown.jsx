import ReactMarkdown from 'react-markdown'

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
  ol: el('ol', 'my-4 list-decimal space-y-2 pl-6 marker:font-bold marker:text-accent'),
  a: el('a', ''),
  strong: el('strong', 'font-bold'),
  blockquote: el('blockquote', 'my-6 rounded-r-lg border-l-4 border-ink bg-c1/40 px-5 py-3'),
  pre: el(
    'pre',
    'my-6 overflow-x-auto rounded-xl border-2 border-ink bg-code p-4 font-mono text-sm leading-6 text-code-ink shadow-[4px_4px_0_0_var(--shadow)] [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0',
  ),
  code: el('code', 'rounded-md border border-line bg-panel px-1.5 py-0.5 font-mono text-[0.88em]'),
}

export default function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}
