'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { matches } from '@/data/matches'

export default function MatchPage() {
  const params = useParams()
  const router = useRouter()
  const matchId = params.id as string
  const match = matches.find(m => m.id === matchId)
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overall')

  useEffect(() => {
    if (!matchId) return
    fetch(`/api/analysis?matchId=${matchId}`)
      .then(r => r.json())
      .then(d => { setAnalysis(d.analysis); setLoading(false) })
  }, [matchId])

  if (!match) return <div style={{ padding: 20, color: '#fff' }}>比赛不存在</div>

  const tabs = [
    { id: 'overall', label: '综合' },
    { id: 'gk', label: '守门员' },
    { id: 'def', label: '后卫' },
    { id: 'mid', label: '中场' },
    { id: 'fwd', label: '前锋' },
    { id: 'tactics', label: '战术' },
    { id: 'coach', label: '教练' },
  ]

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(160deg, #0a2744 0%, #0f3460 100%)', padding: '16px 16px 20px' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16, padding: 0 }}>← 返回赛程</button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>{match.group}组 · {match.date} {match.time} JST · {match.venue}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 48 }}>{match.homeFlag}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginTop: 6 }}>{match.homeTeam}</div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>VS</div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 48 }}>{match.awayFlag}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginTop: 6 }}>{match.awayTeam}</div>
          </div>
        </div>
        {analysis && (
          <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.07)', borderRadius: 12, marginTop: 18, padding: 14 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{match.homeTeam}胜</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#5DCAA5' }}>{analysis.homeWinProb}%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>平局</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{analysis.drawProb}%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{match.awayTeam}胜</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#F0997B' }}>{analysis.awayWinProb}%</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', overflowX: 'auto', background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 5 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '12px 14px', background: 'none', border: 'none', fontSize: 13, whiteSpace: 'nowrap', cursor: 'pointer', color: activeTab === tab.id ? '#e8b84b' : 'rgba(255,255,255,0.45)', borderBottom: activeTab === tab.id ? '2px solid #e8b84b' : '2px solid transparent', fontWeight: activeTab === tab.id ? 600 : 400 }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 12px 40px' }}>
        {loading && <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>⚽ 加载中...</div>}
        {!loading && !analysis && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔮</div>
            <div>分析尚未生成</div>
            <div style={{ fontSize: 12, marginTop: 8 }}>赛前将由管理员生成</div>
          </div>
        )}
        {analysis && (
          <>
            {activeTab === 'overall' && <OverallTab analysis={analysis} match={match} />}
            {activeTab === 'gk' && <PlayersTab players={analysis.dimensions.goalkeeper} homeFlag={match.homeFlag} awayFlag={match.awayFlag} />}
            {activeTab === 'def' && <PlayersTab players={analysis.dimensions.defenders} homeFlag={match.homeFlag} awayFlag={match.awayFlag} />}
            {activeTab === 'mid' && <PlayersTab players={analysis.dimensions.midfielders} homeFlag={match.homeFlag} awayFlag={match.awayFlag} />}
            {activeTab === 'fwd' && <PlayersTab players={analysis.dimensions.forwards} homeFlag={match.homeFlag} awayFlag={match.awayFlag} />}
            {activeTab === 'tactics' && <TacticsTab tactics={analysis.dimensions.tactics} match={match} />}
            {activeTab === 'coach' && <CoachTab coach={analysis.dimensions.coach} homeFlag={match.homeFlag} awayFlag={match.awayFlag} summary={analysis.summary} />}
          </>
        )}
      </div>
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 14, marginBottom: 10 }}>{children}</div>
}

function ScoreRow({ flag, score, color }: { flag: string; score: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: 16 }}>{flag}</span>
      <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#e6edf3', width: 28, textAlign: 'right' }}>{score}</span>
    </div>
  )
}

function Analysis({ text }: { text: string }) {
  return <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>{text}</div>
}

function OverallTab({ analysis, match }: any) {
  const d = analysis.dimensions
  return (
    <>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>综合实力</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>权重 {d.overall.weight}%</span>
        </div>
        <ScoreRow flag={match.homeFlag} score={d.overall.homeScore} color="#185FA5" />
        <ScoreRow flag={match.awayFlag} score={d.overall.awayScore} color="#D85A30" />
        <Analysis text={d.overall.analysis} />
      </Card>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>近期状态</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>权重 {d.recentForm.weight}%</span>
        </div>
        <ScoreRow flag={match.homeFlag} score={d.recentForm.homeScore} color="#185FA5" />
        <ScoreRow flag={match.awayFlag} score={d.recentForm.awayScore} color="#D85A30" />
        <Analysis text={d.recentForm.analysis} />
      </Card>
      <div style={{ background: 'rgba(232,184,75,0.06)', border: '1px solid rgba(232,184,75,0.2)', borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#e8b84b', marginBottom: 8 }}>综合总结</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>{analysis.summary}</div>
      </div>
    </>
  )
}

function PlayersTab({ players, homeFlag, awayFlag }: any) {
  return (
    <>
      {players.map((p: any, i: number) => (
        <div key={i}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', padding: '12px 2px 6px', letterSpacing: 1 }}>{p.position}</div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ display: 'flex' }}>
              <PlayerSide flag={homeFlag} player={p.homePlayer} color="#185FA5" />
              <PlayerSide flag={awayFlag} player={p.awayPlayer} color="#D85A30" border />
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, padding: '10px 14px 12px', background: 'rgba(0,0,0,0.2)' }}>{p.analysis}</div>
          </div>
        </div>
      ))}
    </>
  )
}

function PlayerSide({ flag, player, color, border }: any) {
  return (
    <div style={{ flex: 1, padding: '12px 12px 10px', borderLeft: border ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{flag} #{player.number}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3', margin: '3px 0 2px' }}>{player.name}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{player.club}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color }}>{player.score}</span>
        <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${player.score}%`, height: '100%', background: color, borderRadius: 3 }} />
        </div>
      </div>
    </div>
  )
}

function TacticsTab({ tactics, match }: any) {
  const formations: Record<string, { cx: number; cy: number; label: string }[]> = {
    '4-3-3': [
      { cx: 70, cy: 182, label: 'GK' },
      { cx: 22, cy: 152, label: 'LB' }, { cx: 48, cy: 152, label: 'CB' }, { cx: 92, cy: 152, label: 'CB' }, { cx: 118, cy: 152, label: 'RB' },
      { cx: 35, cy: 110, label: 'CM' }, { cx: 70, cy: 105, label: 'CM' }, { cx: 105, cy: 110, label: 'CM' },
      { cx: 22, cy: 62, label: 'LW' }, { cx: 70, cy: 55, label: 'ST' }, { cx: 118, cy: 62, label: 'RW' },
    ],
    '4-4-2': [
      { cx: 70, cy: 182, label: 'GK' },
      { cx: 22, cy: 152, label: 'LB' }, { cx: 48, cy: 152, label: 'CB' }, { cx: 92, cy: 152, label: 'CB' }, { cx: 118, cy: 152, label: 'RB' },
      { cx: 22, cy: 108, label: 'LM' }, { cx: 52, cy: 108, label: 'CM' }, { cx: 88, cy: 108, label: 'CM' }, { cx: 118, cy: 108, label: 'RM' },
      { cx: 45, cy: 55, label: 'ST' }, { cx: 95, cy: 55, label: 'ST' },
    ],
    '4-2-3-1': [
      { cx: 70, cy: 182, label: 'GK' },
      { cx: 22, cy: 152, label: 'LB' }, { cx: 48, cy: 152, label: 'CB' }, { cx: 92, cy: 152, label: 'CB' }, { cx: 118, cy: 152, label: 'RB' },
      { cx: 48, cy: 125, label: 'DM' }, { cx: 92, cy: 125, label: 'DM' },
      { cx: 22, cy: 90, label: 'LM' }, { cx: 70, cy: 85, label: 'AM' }, { cx: 118, cy: 90, label: 'RM' },
      { cx: 70, cy: 50, label: 'ST' },
    ],
    '4-1-4-1': [
      { cx: 70, cy: 182, label: 'GK' },
      { cx: 22, cy: 155, label: 'LB' }, { cx: 48, cy: 155, label: 'CB' }, { cx: 92, cy: 155, label: 'CB' }, { cx: 118, cy: 155, label: 'RB' },
      { cx: 70, cy: 128, label: 'DM' },
      { cx: 20, cy: 100, label: 'LM' }, { cx: 50, cy: 100, label: 'CM' }, { cx: 90, cy: 100, label: 'CM' }, { cx: 120, cy: 100, label: 'RM' },
      { cx: 70, cy: 55, label: 'ST' },
    ],
    '3-5-2': [
      { cx: 70, cy: 182, label: 'GK' },
      { cx: 35, cy: 152, label: 'CB' }, { cx: 70, cy: 148, label: 'CB' }, { cx: 105, cy: 152, label: 'CB' },
      { cx: 18, cy: 108, label: 'LWB' }, { cx: 45, cy: 112, label: 'CM' }, { cx: 70, cy: 108, label: 'CM' }, { cx: 95, cy: 112, label: 'CM' }, { cx: 122, cy: 108, label: 'RWB' },
      { cx: 45, cy: 55, label: 'ST' }, { cx: 95, cy: 55, label: 'ST' },
    ],
  }

  function Pitch({ flag, team, formation, color }: any) {
    const dots = formations[formation] || formations['4-3-3']
    return (
      <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 12 }}>{flag}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>{formation}</div>
        </div>
        <svg width="100%" viewBox="0 0 140 200" style={{ display: 'block' }}>
          <rect width="140" height="200" fill="#1a6b2e" />
          <rect x="10" y="10" width="120" height="180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <line x1="10" y1="100" x2="130" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          <circle cx="70" cy="100" r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          <rect x="45" y="10" width="50" height="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          <rect x="45" y="170" width="50" height="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
          {dots.map((d: any, i: number) => (
            <g key={i}>
              <circle cx={d.cx} cy={d.cy} r="7" fill={color} stroke="rgba(255,255,255,0.8)" strokeWidth="0.8" />
              <text x={d.cx} y={d.cy + 4} textAnchor="middle" fill="#fff" fontSize="5.5" fontWeight="600">{d.label}</text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <Pitch flag={match.homeFlag} team={match.homeTeam} formation={tactics.homeFormation} color="#185FA5" />
        <Pitch flag={match.awayFlag} team={match.awayTeam} formation={tactics.awayFormation} color="#993C1D" />
      </div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3' }}>战术评分</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>权重 {tactics.weight}%</span>
        </div>
        <ScoreRow flag={match.homeFlag} score={tactics.homeScore} color="#185FA5" />
        <ScoreRow flag={match.awayFlag} score={tactics.awayScore} color="#D85A30" />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '10px 0 4px' }}>
          {tactics.homeStyle.map((s: string) => <span key={s} style={{ background: 'rgba(24,95,165,0.2)', color: '#85B7EB', fontSize: 11, padding: '3px 8px', borderRadius: 10 }}>{s}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
          {tactics.awayStyle.map((s: string) => <span key={s} style={{ background: 'rgba(153,60,29,0.2)', color: '#F0997B', fontSize: 11, padding: '3px 8px', borderRadius: 10 }}>{s}</span>)}
        </div>
        <Analysis text={tactics.analysis} />
      </Card>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3', marginBottom: 10 }}>战术克制分析</div>
        {tactics.clashPoints.map((cp: any, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>{cp.type === 'warning' ? '⚠️' : cp.type === 'advantage' ? '⚡' : 'ℹ️'}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{cp.text}</span>
          </div>
        ))}
      </Card>
    </>
  )
}

function CoachTab({ coach, homeFlag, awayFlag, summary }: any) {
  return (
    <>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ display: 'flex' }}>
          <CoachSide flag={homeFlag} coach={coach.homeCoach} color="#185FA5" />
          <CoachSide flag={awayFlag} coach={coach.awayCoach} color="#D85A30" border />
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, padding: '10px 14px 12px', background: 'rgba(0,0,0,0.2)' }}>{coach.analysis}</div>
      </div>
      <div style={{ background: 'rgba(232,184,75,0.06)', border: '1px solid rgba(232,184,75,0.2)', borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#e8b84b', marginBottom: 8 }}>综合总结</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>{summary}</div>
      </div>
    </>
  )
}

function CoachSide({ flag, coach, color, border }: any) {
  return (
    <div style={{ flex: 1, padding: '12px 12px 10px', borderLeft: border ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{flag} 主教练</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3', margin: '3px 0 2px' }}>{coach.name}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{coach.experience}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color }}>{coach.score}</span>
        <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${coach.score}%`, height: '100%', background: color, borderRadius: 3 }} />
        </div>
      </div>
    </div>
  )
}
