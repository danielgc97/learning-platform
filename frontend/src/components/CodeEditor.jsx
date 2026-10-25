import Editor from '@monaco-editor/react'
import { useDarkMode } from '../theme'

function defineThemes(monaco) {
  monaco.editor.defineTheme('cvb-light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#fbfaf6',
      'editorLineNumber.foreground': '#9a9484',
      'editor.lineHighlightBackground': '#f1ede2',
    },
  })
  monaco.editor.defineTheme('cvb-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#12110d',
      'editorLineNumber.foreground': '#6b665b',
      'editor.lineHighlightBackground': '#1b1914',
    },
  })
}

export default function CodeEditor({ value, onChange, language, height = 180 }) {
  const dark = useDarkMode()
  return (
    <div className="overflow-hidden border border-line">
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
          renderLineHighlight: 'line',
        }}
      />
    </div>
  )
}
