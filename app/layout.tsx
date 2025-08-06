import './globals.css'
import type { Metadata } from 'next'
import DevToolProtection from './components/DevToolProtection'
import CustomProtection from './components/CustomProtection'
import AntiCheat from './components/AntiCheat'
import TimeWatermark from './components/TimeWatermark'

export const metadata: Metadata = {
  title: '摇骰子 - Dice Roller',
  description: '一个简单有趣的摇骰子游戏',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <DevToolProtection />
        <CustomProtection />
        <AntiCheat />
        <TimeWatermark />
        {children}
      </body>
    </html>
  )
}