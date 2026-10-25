import ReactMarkdown from 'react-markdown'

const el = (Tag, className) =>
  function Styled({ node, ...props }) {
    void node
    return <Tag className={className} {...props} />
  }

const components = {
  h1: el('h1', 'mt-2 mb-6 font-display text-5xl leading-[1.05] tracking-tight'),
  h2: el('h2', 'mt-12 mb-3 border-t border-line pt-6 font-display text-3xl leading-tight'),
  h3: el('h3', 'mt-8 mb-2 font-mono text-xs font-medium tracking-widest text-muted uppercase'),
  p: el('p', 'my-4 leading-7'),
  ul: el('ul', 'my-4 list-disc space-y-1.5 pl-6 marker:text-accent'),
  ol: el('ol', 'my-4 list-decimal space-y-1.5 pl-6 marker:font-mono marker:text-accent'),
  a: el('a', 'font-medium'),
  strong: el('strong', 'font-semibold'),
  blockquote: el('blockquote', 'my-6 border-l-4 border-accent pl-5 font-display text-xl leading-snug italic'),
  pre: el(
    'pre',
    'my-6 overflow-x-auto bg-code p-4 font-mono text-sm leading-6 text-code-ink [&>code]:bg-transparent [&>code]:p-0',
  ),
  code: el('code', 'bg-panel px-1.5 py-0.5 font-mono text-[0.88em]'),
}

export default function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}
