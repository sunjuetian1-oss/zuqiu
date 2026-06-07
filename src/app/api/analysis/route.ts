import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const matchId = req.nextUrl.searchParams.get('matchId')
  if (!matchId) return NextResponse.json({ analysis: null })

  const { data } = await supabase
    .from('analyses')
    .select('data')
    .eq('match_id', matchId)
    .maybeSingle()

  return NextResponse.json({ analysis: data?.data || null })
}
