'use client'
import { useState, useEffect } from 'react'
import { matches, groupMatchesByDate, formatDate, Match } from '@/data/matches'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function HomePage() {
  const [generatedIds, setGeneratedIds] = useState<Set<string>>(new Set())
  const grouped = groupMatchesByDate(matches)
  const dates = Object.keys(grouped).sort()

  useEffect(() => {
    supabase.from('analyses').select('match_id').then(({ data }) => {
      if (data) setGeneratedIds(new Set(data.map((d: any) => d.match_id)))
    })
  }, [])

  const today = new Date().toISOString().split('T')[0]
  const todayOrNext = dates.find(d => d >= today) || dates[0]

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh' }}>
      {/* 顶部导航 */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2744 0%, #0f3460 100%)',
        padding: '20px 16px 16px',
        position: 'sticky', top: 0, zIndex: 10,
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: '#e8b84b', letterSpacing: 2 }}>
              WORLD CUP 2026
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
              AI深度赛事分析
            </div>
          </div>
          <div style={{
            background: 'rgba(232,184,75,0.15)',
            border: '1px solid rgba(232,184,75,0.3)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 12,
            color: '#e8b84b'
          }}>
            48支球队 · 104场
          </div>
        </div>
      </div>

      {/* 赛程列表 */}
      <div style={{ padding: '12px 0 40px' }}>
        {dates.map(date => (
          <div key={date}>
            <div style={{
              padding: '12px 16px 6px',
              fontSize: 12,
              color: date === todayOrNext ? '#e8b84b' : 'rgba(255,255,255,0.4)',
              fontWeight: date === todayOrNext ? 700 : 400,
              letterSpacing: 1,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              {date === todayOrNext && (
                <span style={{
                  background: '#e8b84b', color: '#0a2744',
                  fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700
                }}>今日</span>
              )}
              {formatDate(date)}
            </div>
            {grouped[date].map(match => (
              <MatchCard key={match.id} match={match} hasAnalysis={generatedIds.has(match.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchCard({ match, hasAnalysis }: { match: Match; hasAnalysis: boolean }) {
  return (
    <Link href={`/match/${match.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: hasAnalysis ? 'rgba(24,95,165,0.08)' : 'rgba(255,255,255,0.03)',
        border: hasAnalysis ? '1px solid rgba(24,95,165,0.3)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 14,
        margin: '0 12px 10px',
        padding: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
          <span style={{
            background: 'rgba(232,184,75,0.15)',
            color: '#e8b84b',
            fontSize: 11,
            padding: '2px 8px',
            borderRadius: 4,
            fontWeight: 500
          }}>{match.group}组</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            {match.time} JST · {match.venue.slice(0, 6)}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 32, lineHeight: 1 }}>{match.homeFlag}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#e6edf3', marginTop: 4 }}>{match.homeTeam}</div>
          </div>

          <div style={{ padding: '0 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>VS</div>
            {hasAnalysis && (
              <div style={{ display: 'flex', width: 72, height: 5, borderRadius: 3, overflow: 'hidden', gap: 1 }}>
                <div style={{ flex: 1.2, background: '#185FA5' }}></div>
                <div style={{ flex: 0.6, background: '#5F5E5A' }}></div>
                <div style={{ flex: 0.8, background: '#D85A30' }}></div>
              </div>
            )}
          </div>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 32, lineHeight: 1 }}>{match.awayFlag}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#e6edf3', marginTop: 4 }}>{match.awayTeam}</div>
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
          {hasAnalysis ? (
            <span style={{
              background: 'rgba(29,158,117,0.15)',
              color: '#1D9E75',
              fontSize: 11, padding: '3px 8px', borderRadius: 20,
              display: 'flex', alignItems: 'center', gap: 4
            }}>
              ✦ AI分析已生成 · 点击查看
            </span>
          ) : (
            <span style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 11, padding: '3px 8px', borderRadius: 20
            }}>
              分析待生成
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
