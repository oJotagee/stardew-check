// Função serverless da Vercel que guarda o progresso compartilhado no Neon.
//   GET    /api/progresso?fazenda=abc   -> { itens: ["rec-primavera:0", ...] }
//   POST   /api/progresso               body { fazenda, itens: { "rec-primavera:0": true, ... } }
//   DELETE /api/progresso?fazenda=abc   -> desmarca tudo
// Só os itens marcados são guardados (uma linha por item).
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '')

// Cria a tabela na primeira chamada, assim não é preciso rodar SQL manualmente
let ready: Promise<unknown> | undefined
const ensureTable = () =>
  (ready ??= sql`
    CREATE TABLE IF NOT EXISTS progresso (
      fazenda text NOT NULL,
      item text NOT NULL,
      PRIMARY KEY (fazenda, item)
    )`.catch((err) => {
    ready = undefined
    throw err
  }))

const FAZENDA_RE = /^[a-z0-9-]{4,40}$/
const ITEM_RE = /^[a-z0-9-]{1,40}:\d{1,2}$/

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } })

export async function GET(request: Request) {
  const fazenda = new URL(request.url).searchParams.get('fazenda')
  if (!FAZENDA_RE.test(fazenda ?? '')) return json({ erro: 'fazenda inválida' }, 400)
  await ensureTable()
  const rows = await sql`SELECT item FROM progresso WHERE fazenda = ${fazenda}`
  return json({ itens: rows.map((r) => r.item) })
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { fazenda?: unknown; itens?: unknown } | null
  const fazenda = typeof body?.fazenda === 'string' ? body.fazenda : ''
  const itens = body?.itens
  if (!FAZENDA_RE.test(fazenda) || typeof itens !== 'object' || itens === null) {
    return json({ erro: 'corpo inválido' }, 400)
  }
  const entries = Object.entries(itens)
  if (entries.length > 500 || entries.some(([k]) => !ITEM_RE.test(k))) return json({ erro: 'itens inválidos' }, 400)

  const marcar = entries.filter(([, v]) => v).map(([k]) => k)
  const desmarcar = entries.filter(([, v]) => !v).map(([k]) => k)

  await ensureTable()
  await sql.transaction([
    sql`INSERT INTO progresso (fazenda, item) SELECT ${fazenda}, unnest(${marcar}::text[]) ON CONFLICT DO NOTHING`,
    sql`DELETE FROM progresso WHERE fazenda = ${fazenda} AND item = ANY(${desmarcar}::text[])`,
  ])
  return json({ ok: true })
}

export async function DELETE(request: Request) {
  const fazenda = new URL(request.url).searchParams.get('fazenda')
  if (!FAZENDA_RE.test(fazenda ?? '')) return json({ erro: 'fazenda inválida' }, 400)
  await ensureTable()
  await sql`DELETE FROM progresso WHERE fazenda = ${fazenda}`
  return json({ ok: true })
}
