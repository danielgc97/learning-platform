const TILES = ['bg-c1', 'bg-c2', 'bg-c3', 'bg-c4']

const BY_SLUG = {
  'fundamentos-ia': TILES[0],
  'sql-fundamentos': TILES[1],
  'python-fundamentos': TILES[2],
  'agentes-fundamentos': TILES[3],
}

export function tileFor(slug) {
  return BY_SLUG[slug] ?? TILES[[...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % TILES.length]
}
