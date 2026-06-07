import { NextRequest, NextResponse } from 'next/server'
import { generateAnalysis } from '@/lib/deepseek'
import { supabase } from '@/lib/supabase'
import { matches } from '@/data/matches'

export async function POST(req: NextRequest) {
  try {
    const { matchId, secret } = await req.json()

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: '无权限' }, { status: 401 })
    }

    const match = matches.find(m => m.id === matchId)
    if (!match) {
      return NextResponse.json({ error: '比赛不存在' }, { status: 404 })
    }

    const analysis = await generateAnalysis(match.homeTeam, match.awayTeam, matchId)

    const { error } = await supabase
      .from('analyses')
      .upsert({
        match_id: matchId,
        data: analysis,
        created_at: new Date().toISOString(),
      })

    if (error) throw error

    return NextResponse.json({ success: true, analysis })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: '生成失败' }, { status: 500 })
  }
}
