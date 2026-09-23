import { useEffect, useMemo, useState } from 'react'
import { ROOMS, SEASONS, itemKey, requiredOf } from './data.js'
import { load, save, useProgress } from './useProgress.js'

const PREFS_KEY = 'stardew-cc-prefs-v1'

const doneCount = (bundle, checked) => bundle.items.filter((_, idx) => checked[itemKey(bundle, idx)]).length
const isBundleDone = (bundle, checked) => doneCount(bundle, checked) >= requiredOf(bundle)

function Icon({ img, alt }) {
  const [broken, setBroken] = useState(false)
  if (broken) return <span className="icon icon-fallback" aria-hidden="true">?</span>
  return <img className="icon" src={`/icons/${img}.png`} alt={alt} loading="lazy" onError={() => setBroken(true)} />
}

function SeasonDots({ s }) {
  if (s === 'PVOI') return <span className="season-all" title="Ano todo">ano todo</span>
  return (
    <span className="seasons">
      {s.split('').map((k) => (
        <span key={k} className="dot" style={{ background: SEASONS[k].color }} title={SEASONS[k].label} />
      ))}
    </span>
  )
}

function Progress({ value, max }) {
  const pct = max ? Math.round((value / max) * 100) : 0
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

function Bundle({ bundle, checked, toggle, season }) {
  const count = doneCount(bundle, checked)
  const required = requiredOf(bundle)
  const done = count >= required

  return (
    <section className={`bundle ${done ? 'bundle-done' : ''}`}>
      <header className="bundle-head">
        <h3>{bundle.name}</h3>
        <span className={`badge ${done ? 'badge-done' : ''}`}>
          {done ? '✓ Completo' : `${count}/${required}`}
        </span>
      </header>
      {required < bundle.items.length && (
        <p className="bundle-note">Escolha {required} de {bundle.items.length}</p>
      )}
      <ul className="items">
        {bundle.items.map((item, idx) => {
          const key = itemKey(bundle, idx)
          const isChecked = !!checked[key]
          const outOfSeason = season && !item.s.includes(season)
          const unneeded = done && !isChecked
          return (
            <li key={key} className={[isChecked && 'checked', outOfSeason && 'out-season', unneeded && 'unneeded'].filter(Boolean).join(' ')}>
              <label>
                <input type="checkbox" checked={isChecked} onChange={() => toggle(key)} />
                <Icon img={item.img} alt="" />
                <span className="item-main">
                  <span className="item-name">
                    {item.name}
                    {item.qty > 1 && <span className="qty"> ×{item.qty}</span>}
                    {item.quality && <span className={`quality q-${item.quality}`}>★ {item.quality}</span>}
                  </span>
                  <span className="item-hint">{item.hint}</span>
                </span>
                <SeasonDots s={item.s} />
              </label>
            </li>
          )
        })}
      </ul>
      <footer className="bundle-reward">Recompensa: <strong>{bundle.reward}</strong></footer>
    </section>
  )
}

function Room({ room, checked, toggle, season, hideDone }) {
  const bundlesDone = room.bundles.filter((b) => isBundleDone(b, checked)).length
  const roomDone = bundlesDone === room.bundles.length
  const visible = hideDone ? room.bundles.filter((b) => !isBundleDone(b, checked)) : room.bundles
  if (hideDone && visible.length === 0) return null

  return (
    <div className={`room ${roomDone ? 'room-done' : ''}`} id={room.id}>
      <div className="room-head">
        <div>
          <h2>{room.name}{room.bonus && <span className="bonus"> (após o Centro)</span>}</h2>
          <p className="room-reward">Recompensa: <strong>{room.reward}</strong></p>
        </div>
        <div className="room-progress">
          <span>{bundlesDone}/{room.bundles.length} conjuntos</span>
          <Progress value={bundlesDone} max={room.bundles.length} />
        </div>
      </div>
      <div className="bundles">
        {visible.map((b) => (
          <Bundle key={b.id} bundle={b} checked={checked} toggle={toggle} season={season} />
        ))}
      </div>
    </div>
  )
}

// Lista de itens que ainda faltam, agrupados por nome, só de conjuntos incompletos
function MissingList({ checked, season }) {
  const rows = useMemo(() => {
    const map = new Map()
    for (const room of ROOMS) {
      for (const bundle of room.bundles) {
        if (isBundleDone(bundle, checked)) continue
        const optional = requiredOf(bundle) < bundle.items.length
        bundle.items.forEach((item, idx) => {
          if (checked[itemKey(bundle, idx)]) return
          if (season && !item.s.includes(season)) return
          const k = `${item.name}|${item.quality ?? ''}`
          const row = map.get(k) ?? { item, qty: 0, where: [] }
          row.qty += item.qty ?? 1
          row.where.push(`${bundle.name}${optional ? ' (opcional)' : ''}`)
          map.set(k, row)
        })
      }
    }
    return [...map.values()].sort((a, b) => a.item.name.localeCompare(b.item.name, 'pt'))
  }, [checked, season])

  if (rows.length === 0) {
    return <p className="empty">Nada faltando {season ? `para ${SEASONS[season].label}` : ''} 🎉</p>
  }

  return (
    <ul className="missing">
      {rows.map(({ item, qty, where }) => (
        <li key={`${item.name}|${item.quality}`}>
          <Icon img={item.img} alt="" />
          <span className="item-main">
            <span className="item-name">
              {item.name}
              {qty > 1 && <span className="qty"> ×{qty}</span>}
              {item.quality && <span className={`quality q-${item.quality}`}>★ {item.quality}</span>}
            </span>
            <span className="item-hint">{where.join(' · ')} — {item.hint}</span>
          </span>
          <SeasonDots s={item.s} />
        </li>
      ))}
    </ul>
  )
}

const STATUS_LABEL = {
  local: 'Salvo só neste navegador',
  sincronizando: 'Sincronizando…',
  ok: 'Sincronizado',
  offline: 'Sem conexão com o servidor — tentando de novo',
}

function ShareBar({ fazenda, status, share, leave }) {
  const [msg, setMsg] = useState('')

  const copy = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      setMsg('Link copiado!')
    } catch {
      setMsg(url)
    }
  }

  const onShare = async () => {
    const url = await share()
    if (url) copy(url)
    else setMsg('Não foi possível conectar ao servidor.')
  }

  return (
    <div className={`share share-${status}`}>
      <span className="share-status">
        <span className="share-dot" /> {STATUS_LABEL[status]}
        {fazenda && <> · fazenda <code>{fazenda}</code></>}
      </span>
      {fazenda ? (
        <>
          <button onClick={() => copy(window.location.href)}>Copiar link</button>
          <button className="link" onClick={() => { leave(); setMsg('') }}>Parar de compartilhar</button>
        </>
      ) : (
        <button onClick={onShare}>Compartilhar progresso</button>
      )}
      {msg && <span className="share-msg">{msg}</span>}
    </div>
  )
}

export default function App() {
  const { checked, toggle, reset: resetProgress, fazenda, status, share, leave } = useProgress()
  const [prefs, setPrefs] = useState(() => load(PREFS_KEY, { season: '', hideDone: false, view: 'conjuntos' }))

  useEffect(() => save(PREFS_KEY, prefs), [prefs])

  const setPref = (patch) => setPrefs((p) => ({ ...p, ...patch }))

  const mainRooms = ROOMS.filter((r) => !r.bonus)
  const allBundles = mainRooms.flatMap((r) => r.bundles)
  const totalDone = allBundles.filter((b) => isBundleDone(b, checked)).length

  const reset = () => {
    const msg = fazenda
      ? 'Desmarcar todos os itens para todos que usam este link? Isso não pode ser desfeito.'
      : 'Desmarcar todos os itens? Isso não pode ser desfeito.'
    if (confirm(msg)) resetProgress()
  }

  return (
    <div className="app">
      <header className="top">
        <h1>Centro Comunitário</h1>
        <p className="subtitle">Checklist dos conjuntos de Stardew Valley.</p>
        <ShareBar fazenda={fazenda} status={status} share={share} leave={leave} />
        <div className="overall">
          <span>{totalDone}/{allBundles.length} conjuntos concluídos</span>
          <Progress value={totalDone} max={allBundles.length} />
        </div>
        <nav className="rooms-nav">
          {ROOMS.map((r) => {
            const d = r.bundles.filter((b) => isBundleDone(b, checked)).length
            return (
              <a key={r.id} href={`#${r.id}`} className={d === r.bundles.length ? 'nav-done' : ''} onClick={() => setPref({ view: 'conjuntos' })}>
                {r.name} <small>{d}/{r.bundles.length}</small>
              </a>
            )
          })}
        </nav>
      </header>

      <div className="toolbar">
        <div className="tabs">
          <button className={prefs.view === 'conjuntos' ? 'active' : ''} onClick={() => setPref({ view: 'conjuntos' })}>Conjuntos</button>
          <button className={prefs.view === 'faltando' ? 'active' : ''} onClick={() => setPref({ view: 'faltando' })}>O que falta</button>
        </div>
        <div className="seasons-filter">
          <button className={!prefs.season ? 'active' : ''} onClick={() => setPref({ season: '' })}>Todas</button>
          {Object.entries(SEASONS).map(([k, v]) => (
            <button key={k} className={prefs.season === k ? 'active' : ''} onClick={() => setPref({ season: k })} style={{ '--season': v.color }}>
              <span className="dot" style={{ background: v.color }} /> {v.label}
            </button>
          ))}
        </div>
        {prefs.view === 'conjuntos' && (
          <label className="toggle">
            <input type="checkbox" checked={prefs.hideDone} onChange={(e) => setPref({ hideDone: e.target.checked })} />
            Ocultar concluídos
          </label>
        )}
      </div>

      <main>
        {prefs.view === 'conjuntos' ? (
          ROOMS.map((room) => (
            <Room key={room.id} room={room} checked={checked} toggle={toggle} season={prefs.season} hideDone={prefs.hideDone} />
          ))
        ) : (
          <MissingList checked={checked} season={prefs.season} />
        )}
      </main>

      <footer className="foot">
        <button className="danger" onClick={reset}>Resetar progresso</button>
        <p>
          Dados: <a href="https://pt.stardewvalleywiki.com/Conjuntos" target="_blank" rel="noreferrer">Stardew Valley Wiki</a>. Ícones © ConcernedApe.
        </p>
      </footer>
    </div>
  )
}
