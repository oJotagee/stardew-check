import { useCallback, useEffect, useRef, useState } from 'react'

// Progresso salvo no localStorage e, quando há uma "fazenda" compartilhada,
// sincronizado com /api/progresso (Neon). Outros jogadores veem as mudanças
// na próxima consulta (a cada POLL_MS ou ao voltar para a aba).

const CHECKED_KEY = 'stardew-cc-checked-v1'
const FAZENDA_KEY = 'stardew-cc-fazenda-v1'
const POLL_MS = 30000

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function save(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // armazenamento indisponível (aba anônima etc.) — segue sem persistir
  }
}

function setUrlFazenda(fazenda: string | null) {
  const url = new URL(window.location.href)
  if (fazenda) url.searchParams.set('fazenda', fazenda)
  else url.searchParams.delete('fazenda')
  window.history.replaceState(null, '', url)
}

const initialFazenda = () => new URLSearchParams(window.location.search).get('fazenda') || load<string | null>(FAZENDA_KEY, null)

export type Checked = Record<string, true>
export type SyncStatus = 'local' | 'sincronizando' | 'ok' | 'offline'

export function useProgress() {
  const [checked, setChecked] = useState<Checked>(() => load<Checked>(CHECKED_KEY, {}))
  const [fazenda, setFazenda] = useState<string | null>(initialFazenda)
  const [status, setStatus] = useState<SyncStatus>(fazenda ? 'sincronizando' : 'local')
  // Uma consulta só é aplicada se nenhuma gravação começou/estava em andamento
  // durante ela — assim não "desfaz" um clique que ainda não chegou ao servidor.
  const pending = useRef(0)
  const writes = useRef(0)

  useEffect(() => save(CHECKED_KEY, checked), [checked])

  useEffect(() => {
    save(FAZENDA_KEY, fazenda)
    setUrlFazenda(fazenda)
  }, [fazenda])

  const pull = useCallback(async () => {
    if (!fazenda) return
    const before = writes.current
    try {
      const res = await fetch(`/api/progresso?fazenda=${encodeURIComponent(fazenda)}`)
      if (!res.ok) throw new Error(String(res.status))
      const { itens } = (await res.json()) as { itens: string[] }
      if (pending.current === 0 && writes.current === before) setChecked(Object.fromEntries(itens.map((k) => [k, true as const])))
      setStatus('ok')
    } catch {
      setStatus('offline')
    }
  }, [fazenda])

  useEffect(() => {
    if (!fazenda) return
    pull()
    const id = setInterval(() => !document.hidden && pull(), POLL_MS)
    const onVisible = () => !document.hidden && pull()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [fazenda, pull])

  const send = async (method: 'POST' | 'DELETE', body?: Record<string, boolean>, target = fazenda): Promise<boolean> => {
    if (!target) return false
    pending.current++
    writes.current++
    try {
      const url = method === 'DELETE' ? `/api/progresso?fazenda=${encodeURIComponent(target)}` : '/api/progresso'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify({ fazenda: target, itens: body }) : undefined,
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('ok')
      return true
    } catch {
      setStatus('offline')
      return false
    } finally {
      pending.current--
    }
  }

  const toggle = (key: string) => {
    const value = !checked[key]
    setChecked((prev) => {
      const next = { ...prev }
      if (value) next[key] = true
      else delete next[key]
      return next
    })
    if (fazenda) send('POST', { [key]: value })
  }

  const reset = () => {
    setChecked({})
    if (fazenda) send('DELETE')
  }

  // Cria uma fazenda nova com o progresso atual e devolve o link para compartilhar
  const share = async (): Promise<string | null> => {
    const id = crypto.randomUUID().replace(/-/g, '').slice(0, 10)
    setStatus('sincronizando')
    const ok = await send('POST', checked, id)
    if (!ok) return null
    setFazenda(id)
    const url = new URL(window.location.href)
    url.searchParams.set('fazenda', id)
    return url.toString()
  }

  // Para de sincronizar; mantém o progresso atual só neste navegador
  const leave = () => {
    setFazenda(null)
    setStatus('local')
  }

  return { checked, toggle, reset, fazenda, status, share, leave }
}
