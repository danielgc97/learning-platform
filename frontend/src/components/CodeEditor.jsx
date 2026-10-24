import Editor from '@monaco-editor/react'
import { useDarkMode } from '../theme'

export default function CodeEditor({ value, onChange, language, height = 180 }) {
  const dark = useDarkMode()
  return (
    <div className="overflow-hidden rounded-md border border-slate-300 dark:border-slate-700">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        theme={dark ? 'vs-dark' : 'light'}
        loading={<div className="p-4 text-sm text-slate-500">Cargando editor...</div>}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', Consolas, monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          tabSize: language === 'python' ? 4 : 2,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  )
}
