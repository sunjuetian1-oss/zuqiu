import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const matchId = req.nextUrl.searchParams.get('matchId')
  if (!matchId) return NextResponse.json({ error: '缺少matchId' }, { status: 400 })

  const { data, error } = await supabase
    .from('analyses')
    .select('data')
    .eq('match_id', matchId)
    .single()

  if (error || !data) return NextResponse.json({ analysis: null })
  return NextResponse.json({ analysis: data.data })
}
