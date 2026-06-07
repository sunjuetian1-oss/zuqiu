export async function generateAnalysis(homeTeam: string, awayTeam: string, matchId: string) {
  const prompt = `你是专业足球分析师。分析2026世界杯：${homeTeam} vs ${awayTeam}。

严格返回JSON，不要其他文字：

{
  "homeWinProb": 主队胜率整数,
  "drawProb": 平局概率整数,
  "awayWinProb": 客队胜率整数,
  "dimensions": {
    "overall": {
      "homeScore": 0到100整数,
      "awayScore": 0到100整数,
      "analysis": "150字综合实力分析",
      "weight": 25
    },
    "recentForm": {
      "homeScore": 0到100整数,
      "awayScore": 0到100整数,
      "analysis": "100字近期状态分析",
      "weight": 20
    },
    "goalkeeper": [
      {
        "position": "GK · 守门员",
        "homePlayer": { "name": "主队门将名", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "客队门将名", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "80字对比，说明谁占优"
      }
    ],
    "defenders": [
      {
        "position": "CB · 中后卫",
        "homePlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "80字分析"
      },
      {
        "position": "LB/RB · 边后卫",
        "homePlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "80字分析"
      }
    ],
    "midfielders": [
      {
        "position": "CM · 中场核心",
        "homePlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "80字分析"
      },
      {
        "position": "AM/DM · 功能型中场",
        "homePlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "80字分析"
      }
    ],
    "forwards": [
      {
        "position": "ST · 中锋",
        "homePlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "80字分析"
      },
      {
        "position": "LW/RW · 边锋",
        "homePlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "awayPlayer": { "name": "名字", "club": "俱乐部", "score": 整数, "number": "号码" },
        "analysis": "80字分析"
      }
    ],
    "tactics": {
      "homeFormation": "如4-3-3",
      "awayFormation": "如4-4-2",
      "homeStyle": ["风格标签1", "标签2", "标签3"],
      "awayStyle": ["风格标签1", "标签2", "标签3"],
      "homeScore": 整数,
      "awayScore": 整数,
      "clashPoints": [
        { "type": "warning", "text": "克制点50字" },
        { "type": "advantage", "text": "优势点50字" },
        { "type": "info", "text": "中性分析50字" }
      ],
      "analysis": "100字战术整体分析",
      "weight": 15
    },
    "coach": {
      "homeCoach": { "name": "教练名", "experience": "执教经验简述", "score": 整数 },
      "awayCoach": { "name": "教练名", "experience": "执教经验简述", "score": 整数 },
      "analysis": "100字教练对比",
      "weight": 10
    }
  },
  "summary": "200字综合总结，生动适合普通球迷"
}

三个概率之和必须等于100。全部用中文。`

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

  if (!response.ok) throw new Error(`DeepSeek错误: ${response.status}`)
  const data = await response.json()
  const text = data.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)
  return { matchId, ...parsed }
}
