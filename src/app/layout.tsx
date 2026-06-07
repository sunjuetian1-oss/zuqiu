import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '世界杯2026 AI分析',
  description: '2026世界杯赛事AI深度分析，球队对比、球员数据、胜负预测',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
