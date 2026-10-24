import ReactMarkdown from 'react-markdown'

const el = (Tag, className) =>
  function Styled({ node, ...props }) {
    void node
    return <Tag className={className} {...props} />
  }

const components = {
  h1: el('h1', 'mt-2 mb-4 text-3xl font-semibold tracking-tight'),
  h2: el('h2', 'mt-8 mb-3 text-2xl font-semibold tracking-tight'),
  h3: el('h3', 'mt-6 mb-2 text-xl font-semibold'),
  p: el('p', 'my-4 leading-7 text-slate-700 dark:text-slate-300'),
  ul: el('ul', 'my-4 list-disc space-y-1 pl-6'),
  ol: el('ol', 'my-4 list-decimal space-y-1 pl-6'),
  a: el('a', 'font-medium underline underline-offset-2'),
  blockquote: el('blockquote', 'my-4 border-l-4 border-teal-500 pl-4 text-slate-600 italic dark:text-slate-400'),
  pre: el(
    'pre',
    'my-4 overflow-x-auto rounded-md bg-slate-900 p-4 text-sm text-slate-100 [&>code]:bg-transparent [&>code]:p-0',
  ),
  code: el('code', 'rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-slate-800'),
}

export default function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
}
