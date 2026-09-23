// Baixa os ícones dos itens da wiki para public/icons (rode uma vez: npm run icons).
// Usa curl porque a wiki bloqueia o fetch do Node (403).
import { mkdirSync, existsSync, statSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { ROOMS } from '../src/data.ts'

const dir = fileURLToPath(new URL('../public/icons/', import.meta.url))
mkdirSync(dir, { recursive: true })

const names = new Set(ROOMS.flatMap((r) => r.bundles.flatMap((b) => b.items.map((it) => it.img))))
for (const name of names) {
  const file = `${dir}${name}.png`
  if (existsSync(file)) continue
  try {
    execFileSync('curl', ['-sfL', '-o', file, `https://stardewvalleywiki.com/Special:FilePath/${encodeURIComponent(name)}.png`])
    if (statSync(file).size === 0) throw new Error('vazio')
    console.log(`ok: ${name}`)
  } catch {
    rmSync(file, { force: true })
    console.warn(`falhou: ${name}`)
  }
}
