export interface AnalysisResult {
  matchId: string
  homeWinProb: number
  drawProb: number
  awayWinProb: number
  dimensions: {
    overall: DimensionScore
    recentForm: DimensionScore
    goalkeeper: PlayerComparison[]
    defenders: PlayerComparison[]
    midfielders: PlayerComparison[]
    forwards: PlayerComparison[]
    tactics: TacticsAnalysis
    coach: CoachComparison
  }
  summary: string
}

export interface DimensionScore {
  homeScore: number
  awayScore: number
  analysis: string
  weight: number
}

export interface PlayerComparison {
  position: string
  homePlayer: { name: string; club: string; score: number; number: string }
  awayPlayer: { name: string; club: string; score: number; number: string }
  analysis: string
}

export interface TacticsAnalysis {
  homeFormation: string
  awayFormation: string
  homeStyle: string[]
  awayStyle: string[]
  homeScore: number
  awayScore: number
  clashPoints: { type: 'warning' | 'advantage' | 'info'; text: string }[]
  analysis: string
  weight: number
}

export interface CoachComparison {
  homeCoach: { name: string; experience: string; score: number }
  awayCoach: { name: string; experience: string; score: number }
  analysis: string
  weight: number
}

export async function generateAnalysis(
  homeTeam: string,
  awayTeam: string,
  matchId: string
): Promise<AnalysisResult> {
  const prompt = `你是一位专业的足球分析师。请对2026年世界杯小组赛 ${homeTeam} vs ${awayTeam} 进行深度分析。

请严格按照以下JSON格式返回，不要有任何其他文字：

{
  "homeWinProb": 主队胜率百分比整数,
  "drawProb": 平局概率百分比整数,
  "awayWinProb": 客队胜率百分比整数,
  "dimensions": {
    "overall": {
      "homeScore": 主队综合实力0-100整数,
      "awayScore": 客队综合实力0-100整数,
      "analysis": "约150字的综合实力对比分析",
      "weight": 25
    },
    "recentForm": {
      "homeScore": 主队近期状态0-100整数,
      "awayScore": 客队近期状态0-100整数,
      "analysis": "约100字的近期状态分析",
      "weight": 20
    },
    "goalkeeper": [
      {
        "position": "GK · 守门员",
        "homePlayer": { "name": "主队首发门将姓名", "club": "所在俱乐部", "score": 0到100整数, "number": "球衣号码" },
        "awayPlayer": { "name": "客队首发门将姓名", "club": "所在俱乐部", "score": 0到100整数, "number": "球衣号码" },
        "analysis": "约80字对比分析，最后说明谁占优"
      }
    ],
    "defenders": [
      {
        "position": "CB · 中后卫",
        "homePlayer": { "name": "主队主力中后卫", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "客队主力中后卫", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "约80字分析"
      },
      {
        "position": "LB/RB · 边后卫",
        "homePlayer": { "name": "主队主力边后卫", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "客队主力边后卫", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "约80字分析"
      }
    ],
    "midfielders": [
      {
        "position": "CM · 中场核心",
        "homePlayer": { "name": "主队中场核心", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "客队中场核心", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "约80字分析"
      }
    ],
    "forwards": [
      {
        "position": "ST · 中锋",
        "homePlayer": { "name": "主队首发中锋", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "客队首发中锋", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "约80字分析"
      },
      {
        "position": "LW/RW · 边锋",
        "homePlayer": { "name": "主队边锋", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "客队边锋", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "约80字分析"
      }
    ],
    "tactics": {
      "homeFormation": "主队常用阵型如4-3-3",
      "awayFormation": "客队常用阵型如4-4-2",
      "homeStyle": ["主队风格标签1", "标签2", "标签3"],
      "awayStyle": ["客队风格标签1", "标签2", "标签3"],
      "homeScore": 战术得分整数,
      "awayScore": 战术得分整数,
      "clashPoints": [
        { "type": "warning", "text": "战术克制点1，约50字" },
        { "type": "advantage", "text": "一方优势点，约50字" },
        { "type": "info", "text": "中性分析点，约50字" }
      ],
      "analysis": "约100字战术整体分析",
      "weight": 15
    },
    "coach": {
      "homeCoach": { "name": "主队教练姓名", "experience": "执教经验简述", "score": 整数 },
      "awayCoach": { "name": "客队教练姓名", "experience": "执教经验简述", "score": 整数 },
      "analysis": "约100字教练对比分析",
      "weight": 10
    }
  },
  "summary": "约200字的综合总结，点出关键胜负因素，语言生动，适合普通球迷阅读"
}

注意：三个概率之和必须等于100。所有分析用中文。`

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) throw new Error(`DeepSeek API错误: ${response.status}`)

  const data = await response.json()
  const text = data.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)

  return { matchId, ...parsed }
}
