export interface Match {
  id: string
  group: string
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  venue: string
  stage: string
}

export const matches: Match[] = [
  { id: "A1", group: "A", date: "2026-06-11", time: "04:00", homeTeam: "墨西哥", awayTeam: "南非", homeFlag: "🇲🇽", awayFlag: "🇿🇦", venue: "墨西哥城大学球场", stage: "小组赛" },
  { id: "A2", group: "A", date: "2026-06-11", time: "11:00", homeTeam: "韩国", awayTeam: "捷克", homeFlag: "🇰🇷", awayFlag: "🇨🇿", venue: "瓜达拉哈拉阿克朗球场", stage: "小组赛" },
  { id: "A3", group: "A", date: "2026-06-18", time: "01:00", homeTeam: "捷克", awayTeam: "南非", homeFlag: "🇨🇿", awayFlag: "🇿🇦", venue: "亚特兰大梅赛德斯球场", stage: "小组赛" },
  { id: "A4", group: "A", date: "2026-06-18", time: "10:00", homeTeam: "墨西哥", awayTeam: "韩国", homeFlag: "🇲🇽", awayFlag: "🇰🇷", venue: "蒙特雷BBVA球场", stage: "小组赛" },
  { id: "A5", group: "A", date: "2026-06-25", time: "02:00", homeTeam: "捷克", awayTeam: "墨西哥", homeFlag: "🇨🇿", awayFlag: "🇲🇽", venue: "墨西哥城大学球场", stage: "小组赛" },
  { id: "A6", group: "A", date: "2026-06-25", time: "02:00", homeTeam: "南非", awayTeam: "韩国", homeFlag: "🇿🇦", awayFlag: "🇰🇷", venue: "蒙特雷BBVA球场", stage: "小组赛" },
  { id: "B1", group: "B", date: "2026-06-12", time: "04:00", homeTeam: "加拿大", awayTeam: "波黑", homeFlag: "🇨🇦", awayFlag: "🇧🇦", venue: "多伦多BMO球场", stage: "小组赛" },
  { id: "B2", group: "B", date: "2026-06-12", time: "10:00", homeTeam: "摩洛哥", awayTeam: "乌拉圭", homeFlag: "🇲🇦", awayFlag: "🇺🇾", venue: "纽约大都会体育场", stage: "小组赛" },
  { id: "B3", group: "B", date: "2026-06-19", time: "04:00", homeTeam: "波黑", awayTeam: "乌拉圭", homeFlag: "🇧🇦", awayFlag: "🇺🇾", venue: "多伦多BMO球场", stage: "小组赛" },
  { id: "B4", group: "B", date: "2026-06-19", time: "10:00", homeTeam: "加拿大", awayTeam: "摩洛哥", homeFlag: "🇨🇦", awayFlag: "🇲🇦", venue: "温哥华BC球场", stage: "小组赛" },
  { id: "B5", group: "B", date: "2026-06-26", time: "02:00", homeTeam: "乌拉圭", awayTeam: "加拿大", homeFlag: "🇺🇾", awayFlag: "🇨🇦", venue: "温哥华BC球场", stage: "小组赛" },
  { id: "B6", group: "B", date: "2026-06-26", time: "02:00", homeTeam: "波黑", awayTeam: "摩洛哥", homeFlag: "🇧🇦", awayFlag: "🇲🇦", venue: "纽约大都会体育场", stage: "小组赛" },
  { id: "C1", group: "C", date: "2026-06-12", time: "01:00", homeTeam: "阿根廷", awayTeam: "阿尔巴尼亚", homeFlag: "🇦🇷", awayFlag: "🇦🇱", venue: "迈阿密硬石球场", stage: "小组赛" },
  { id: "C2", group: "C", date: "2026-06-12", time: "07:00", homeTeam: "尼日利亚", awayTeam: "乌克兰", homeFlag: "🇳🇬", awayFlag: "🇺🇦", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "C3", group: "C", date: "2026-06-19", time: "01:00", homeTeam: "阿尔巴尼亚", awayTeam: "乌克兰", homeFlag: "🇦🇱", awayFlag: "🇺🇦", venue: "迈阿密硬石球场", stage: "小组赛" },
  { id: "C4", group: "C", date: "2026-06-19", time: "07:00", homeTeam: "阿根廷", awayTeam: "尼日利亚", homeFlag: "🇦🇷", awayFlag: "🇳🇬", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "C5", group: "C", date: "2026-06-26", time: "02:00", homeTeam: "乌克兰", awayTeam: "阿根廷", homeFlag: "🇺🇦", awayFlag: "🇦🇷", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "C6", group: "C", date: "2026-06-26", time: "02:00", homeTeam: "阿尔巴尼亚", awayTeam: "尼日利亚", homeFlag: "🇦🇱", awayFlag: "🇳🇬", venue: "迈阿密硬石球场", stage: "小组赛" },
  { id: "D1", group: "D", date: "2026-06-13", time: "01:00", homeTeam: "美国", awayTeam: "澳大利亚", homeFlag: "🇺🇸", awayFlag: "🇦🇺", venue: "西雅图仙女座球场", stage: "小组赛" },
  { id: "D2", group: "D", date: "2026-06-13", time: "11:00", homeTeam: "土耳其", awayTeam: "巴拉圭", homeFlag: "🇹🇷", awayFlag: "🇵🇾", venue: "圣克拉拉李维球场", stage: "小组赛" },
  { id: "D3", group: "D", date: "2026-06-20", time: "01:00", homeTeam: "澳大利亚", awayTeam: "巴拉圭", homeFlag: "🇦🇺", awayFlag: "🇵🇾", venue: "西雅图仙女座球场", stage: "小组赛" },
  { id: "D4", group: "D", date: "2026-06-20", time: "11:00", homeTeam: "土耳其", awayTeam: "美国", homeFlag: "🇹🇷", awayFlag: "🇺🇸", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "D5", group: "D", date: "2026-06-27", time: "02:00", homeTeam: "巴拉圭", awayTeam: "美国", homeFlag: "🇵🇾", awayFlag: "🇺🇸", venue: "圣克拉拉李维球场", stage: "小组赛" },
  { id: "D6", group: "D", date: "2026-06-27", time: "02:00", homeTeam: "澳大利亚", awayTeam: "土耳其", homeFlag: "🇦🇺", awayFlag: "🇹🇷", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "E1", group: "E", date: "2026-06-13", time: "04:00", homeTeam: "西班牙", awayTeam: "塞尔维亚", homeFlag: "🇪🇸", awayFlag: "🇷🇸", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "E2", group: "E", date: "2026-06-13", time: "07:00", homeTeam: "哥伦比亚", awayTeam: "哥斯达黎加", homeFlag: "🇨🇴", awayFlag: "🇨🇷", venue: "堪萨斯城阿罗黑德球场", stage: "小组赛" },
  { id: "E3", group: "E", date: "2026-06-20", time: "04:00", homeTeam: "塞尔维亚", awayTeam: "哥斯达黎加", homeFlag: "🇷🇸", awayFlag: "🇨🇷", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "E4", group: "E", date: "2026-06-20", time: "07:00", homeTeam: "西班牙", awayTeam: "哥伦比亚", homeFlag: "🇪🇸", awayFlag: "🇨🇴", venue: "堪萨斯城阿罗黑德球场", stage: "小组赛" },
  { id: "E5", group: "E", date: "2026-06-27", time: "02:00", homeTeam: "哥斯达黎加", awayTeam: "西班牙", homeFlag: "🇨🇷", awayFlag: "🇪🇸", venue: "堪萨斯城阿罗黑德球场", stage: "小组赛" },
  { id: "E6", group: "E", date: "2026-06-27", time: "02:00", homeTeam: "塞尔维亚", awayTeam: "哥伦比亚", homeFlag: "🇷🇸", awayFlag: "🇨🇴", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "F1", group: "F", date: "2026-06-14", time: "01:00", homeTeam: "法国", awayTeam: "中国", homeFlag: "🇫🇷", awayFlag: "🇨🇳", venue: "旧金山李维球场", stage: "小组赛" },
  { id: "F2", group: "F", date: "2026-06-14", time: "04:00", homeTeam: "瑞士", awayTeam: "科特迪瓦", homeFlag: "🇨🇭", awayFlag: "🇨🇮", venue: "旧金山李维球场", stage: "小组赛" },
  { id: "F3", group: "F", date: "2026-06-21", time: "01:00", homeTeam: "中国", awayTeam: "科特迪瓦", homeFlag: "🇨🇳", awayFlag: "🇨🇮", venue: "旧金山李维球场", stage: "小组赛" },
  { id: "F4", group: "F", date: "2026-06-21", time: "04:00", homeTeam: "法国", awayTeam: "瑞士", homeFlag: "🇫🇷", awayFlag: "🇨🇭", venue: "旧金山李维球场", stage: "小组赛" },
  { id: "F5", group: "F", date: "2026-06-28", time: "02:00", homeTeam: "科特迪瓦", awayTeam: "法国", homeFlag: "🇨🇮", awayFlag: "🇫🇷", venue: "旧金山李维球场", stage: "小组赛" },
  { id: "F6", group: "F", date: "2026-06-28", time: "02:00", homeTeam: "中国", awayTeam: "瑞士", homeFlag: "🇨🇳", awayFlag: "🇨🇭", venue: "旧金山李维球场", stage: "小组赛" },
  { id: "G1", group: "G", date: "2026-06-14", time: "07:00", homeTeam: "巴西", awayTeam: "克罗地亚", homeFlag: "🇧🇷", awayFlag: "🇭🇷", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "G2", group: "G", date: "2026-06-14", time: "10:00", homeTeam: "德国", awayTeam: "日本", homeFlag: "🇩🇪", awayFlag: "🇯🇵", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "G3", group: "G", date: "2026-06-21", time: "07:00", homeTeam: "日本", awayTeam: "克罗地亚", homeFlag: "🇯🇵", awayFlag: "🇭🇷", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "G4", group: "G", date: "2026-06-21", time: "10:00", homeTeam: "巴西", awayTeam: "德国", homeFlag: "🇧🇷", awayFlag: "🇩🇪", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "G5", group: "G", date: "2026-06-28", time: "02:00", homeTeam: "克罗地亚", awayTeam: "巴西", homeFlag: "🇭🇷", awayFlag: "🇧🇷", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "G6", group: "G", date: "2026-06-28", time: "02:00", homeTeam: "日本", awayTeam: "德国", homeFlag: "🇯🇵", awayFlag: "🇩🇪", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "H1", group: "H", date: "2026-06-15", time: "01:00", homeTeam: "葡萄牙", awayTeam: "津巴布韦", homeFlag: "🇵🇹", awayFlag: "🇿🇼", venue: "波士顿吉列球场", stage: "小组赛" },
  { id: "H2", group: "H", date: "2026-06-15", time: "04:00", homeTeam: "厄瓜多尔", awayTeam: "奥地利", homeFlag: "🇪🇨", awayFlag: "🇦🇹", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "H3", group: "H", date: "2026-06-22", time: "01:00", homeTeam: "津巴布韦", awayTeam: "奥地利", homeFlag: "🇿🇼", awayFlag: "🇦🇹", venue: "波士顿吉列球场", stage: "小组赛" },
  { id: "H4", group: "H", date: "2026-06-22", time: "04:00", homeTeam: "葡萄牙", awayTeam: "厄瓜多尔", homeFlag: "🇵🇹", awayFlag: "🇪🇨", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "H5", group: "H", date: "2026-06-29", time: "02:00", homeTeam: "奥地利", awayTeam: "葡萄牙", homeFlag: "🇦🇹", awayFlag: "🇵🇹", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "H6", group: "H", date: "2026-06-29", time: "02:00", homeTeam: "津巴布韦", awayTeam: "厄瓜多尔", homeFlag: "🇿🇼", awayFlag: "🇪🇨", venue: "波士顿吉列球场", stage: "小组赛" },
  { id: "I1", group: "I", date: "2026-06-15", time: "07:00", homeTeam: "英格兰", awayTeam: "突尼斯", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇹🇳", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "I2", group: "I", date: "2026-06-15", time: "10:00", homeTeam: "塞内加尔", awayTeam: "荷兰", homeFlag: "🇸🇳", awayFlag: "🇳🇱", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "I3", group: "I", date: "2026-06-22", time: "07:00", homeTeam: "突尼斯", awayTeam: "荷兰", homeFlag: "🇹🇳", awayFlag: "🇳🇱", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "I4", group: "I", date: "2026-06-22", time: "10:00", homeTeam: "英格兰", awayTeam: "塞内加尔", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇸🇳", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "I5", group: "I", date: "2026-06-29", time: "02:00", homeTeam: "荷兰", awayTeam: "英格兰", homeFlag: "🇳🇱", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", venue: "洛杉矶SoFi球场", stage: "小组赛" },
  { id: "I6", group: "I", date: "2026-06-29", time: "02:00", homeTeam: "突尼斯", awayTeam: "塞内加尔", homeFlag: "🇹🇳", awayFlag: "🇸🇳", venue: "达拉斯AT&T球场", stage: "小组赛" },
  { id: "J1", group: "J", date: "2026-06-16", time: "01:00", homeTeam: "比利时", awayTeam: "斯洛伐克", homeFlag: "🇧🇪", awayFlag: "🇸🇰", venue: "费城林肯金融球场", stage: "小组赛" },
  { id: "J2", group: "J", date: "2026-06-16", time: "04:00", homeTeam: "新西兰", awayTeam: "巴拿马", homeFlag: "🇳🇿", awayFlag: "🇵🇦", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "J3", group: "J", date: "2026-06-23", time: "01:00", homeTeam: "斯洛伐克", awayTeam: "巴拿马", homeFlag: "🇸🇰", awayFlag: "🇵🇦", venue: "费城林肯金融球场", stage: "小组赛" },
  { id: "J4", group: "J", date: "2026-06-23", time: "04:00", homeTeam: "比利时", awayTeam: "新西兰", homeFlag: "🇧🇪", awayFlag: "🇳🇿", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "J5", group: "J", date: "2026-06-30", time: "02:00", homeTeam: "巴拿马", awayTeam: "比利时", homeFlag: "🇵🇦", awayFlag: "🇧🇪", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "J6", group: "J", date: "2026-06-30", time: "02:00", homeTeam: "斯洛伐克", awayTeam: "新西兰", homeFlag: "🇸🇰", awayFlag: "🇳🇿", venue: "费城林肯金融球场", stage: "小组赛" },
  { id: "K1", group: "K", date: "2026-06-16", time: "07:00", homeTeam: "意大利", awayTeam: "厄立特里亚", homeFlag: "🇮🇹", awayFlag: "🇪🇷", venue: "波士顿吉列球场", stage: "小组赛" },
  { id: "K2", group: "K", date: "2026-06-16", time: "10:00", homeTeam: "乌兹别克斯坦", awayTeam: "科威特", homeFlag: "🇺🇿", awayFlag: "🇰🇼", venue: "圣地亚哥球场", stage: "小组赛" },
  { id: "K3", group: "K", date: "2026-06-23", time: "07:00", homeTeam: "厄立特里亚", awayTeam: "乌兹别克斯坦", homeFlag: "🇪🇷", awayFlag: "🇺🇿", venue: "波士顿吉列球场", stage: "小组赛" },
  { id: "K4", group: "K", date: "2026-06-23", time: "10:00", homeTeam: "意大利", awayTeam: "科威特", homeFlag: "🇮🇹", awayFlag: "🇰🇼", venue: "圣地亚哥球场", stage: "小组赛" },
  { id: "K5", group: "K", date: "2026-06-30", time: "02:00", homeTeam: "科威特", awayTeam: "意大利", homeFlag: "🇰🇼", awayFlag: "🇮🇹", venue: "圣地亚哥球场", stage: "小组赛" },
  { id: "K6", group: "K", date: "2026-06-30", time: "02:00", homeTeam: "厄立特里亚", awayTeam: "乌兹别克斯坦", homeFlag: "🇪🇷", awayFlag: "🇺🇿", venue: "波士顿吉列球场", stage: "小组赛" },
  { id: "L1", group: "L", date: "2026-06-17", time: "01:00", homeTeam: "苏格兰", awayTeam: "约旦", homeFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayFlag: "🇯🇴", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "L2", group: "L", date: "2026-06-17", time: "04:00", homeTeam: "丹麦", awayTeam: "佛得角", homeFlag: "🇩🇰", awayFlag: "🇨🇻", venue: "费城林肯金融球场", stage: "小组赛" },
  { id: "L3", group: "L", date: "2026-06-24", time: "01:00", homeTeam: "约旦", awayTeam: "佛得角", homeFlag: "🇯🇴", awayFlag: "🇨🇻", venue: "纽约大都会球场", stage: "小组赛" },
  { id: "L4", group: "L", date: "2026-06-24", time: "04:00", homeTeam: "苏格兰", awayTeam: "丹麦", homeFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayFlag: "🇩🇰", venue: "费城林肯金融球场", stage: "小组赛" },
  { id: "L5", group: "L", date: "2026-07-01", time: "02:00", homeTeam: "佛得角", awayTeam: "苏格兰", homeFlag: "🇨🇻", awayFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", venue: "费城林肯金融球场", stage: "小组赛" },
  { id: "L6", group: "L", date: "2026-07-01", time: "02:00", homeTeam: "约旦", awayTeam: "丹麦", homeFlag: "🇯🇴", awayFlag: "🇩🇰", venue: "纽约大都会球场", stage: "小组赛" },
]

export function groupMatchesByDate(matches: Match[]) {
  const groups: Record<string, Match[]> = {}
  matches.forEach(m => {
    if (!groups[m.date]) groups[m.date] = []
    groups[m.date].push(m)
  })
  return groups
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const month = d.getMonth() + 1
  const day = d.getDate()
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const weekday = weekdays[d.getDay()]
  return `${month}月${day}日（周${weekday}）`
}
