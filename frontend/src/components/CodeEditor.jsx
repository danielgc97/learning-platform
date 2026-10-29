import Editor from '@monaco-editor/react'
import { useDarkMode } from '../theme'

function defineThemes(monaco) {
  monaco.editor.defineTheme('cvb-light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#ffffff',
      'editorLineNumber.foreground': '#9b9a93',
      'editor.lineHighlightBackground': '#f6f4ee',
    },
  })
  monaco.editor.defineTheme('cvb-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0b0b0b',
      'editorLineNumber.foreground': '#6b665b',
      'editor.lineHighlightBackground': '#171715',
    },
  })
}

const LINE = 21

// El editor crece con el código en vez de dejar un bloque vacío debajo de una línea.
export default function CodeEditor({ value, onChange, language, minHeight = 120, maxHeight = 420 }) {
  const dark = useDarkMode()
  const height = Math.min(maxHeight, Math.max(minHeight, value.split('\n').length * LINE + 28))
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        beforeMount={defineThemes}
        theme={dark ? 'cvb-dark' : 'cvb-light'}
        loading={<div className="p-4 font-mono text-sm text-muted">Cargando editor...</div>}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'IBM Plex Mono', Consolas, monospace",
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
