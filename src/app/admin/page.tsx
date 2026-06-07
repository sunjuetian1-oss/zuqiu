'use client'
import { useState } from 'react'
import { matches, formatDate } from '@/data/matches'

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, 'ok' | 'error'>>({})

  async function generate(matchId: string) {
    setLoading(matchId)
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, secret }),
      })
      setResults(prev => ({ ...prev, [matchId]: r.ok ? 'ok' : 'error' }))
    } catch {
      setResults(prev => ({ ...prev, [matchId]: 'error' }))
    }
    setLoading(null)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 16px', minHeight: '100vh' }}>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: '#e8b84b', marginBottom: 4 }}>ADMIN · 分析生成</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>每场比赛点击生成一次，所有用户共享同一份分析</div>
      <div style={{ marginBottom: 20 }}>
        <input type="password" placeholder="管理员密码" value={secret} onChange={e => setSecret(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }} />
      </div>
      {matches.map(m => (
        <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, color: '#e6edf3', fontWeight: 500 }}>{m.homeFlag} {m.homeTeam} vs {m.awayTeam} {m.awayFlag}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{m.group}组 · {formatDate(m.date)} {m.time}</div>
          </div>
          <button onClick={() => generate(m.id)} disabled={loading === m.id}
            style={{ padding: '6px 14px', background: results[m.id] === 'ok' ? 'rgba(29,158,117,0.2)' : results[m.id] === 'error' ? 'rgba(200,50,50,0.2)' : 'rgba(232,184,75,0.15)', border: `1px solid ${results[m.id] === 'ok' ? '#1D9E75' : results[m.id] === 'error' ? '#e24b4a' : 'rgba(232,184,75,0.4)'}`, borderRadius: 6, color: results[m.id] === 'ok' ? '#1D9E75' : results[m.id] === 'error' ? '#e24b4a' : '#e8b84b', fontSize: 12, cursor: loading === m.id ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', minWidth: 72 }}>
            {loading === m.id ? '生成中...' : results[m.id] === 'ok' ? '✓ 完成' : results[m.id] === 'error' ? '✗ 失败' : '生成'}
          </button>
        </div>
      ))}
    </div>
  )
}
