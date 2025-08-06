'use client'

import { useEffect, useState } from 'react'

export default function TimeWatermark() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Shanghai'
      })
      setCurrentTime(timeString)
    }

    // 立即更新一次
    updateTime()
    
    // 每秒更新时间
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* 页面四角时间水印 */}
      <div className="watermark-container">
        {/* 左上角 */}
        <div className="watermark top-left">
          <div className="watermark-text">{currentTime}</div>
          <div className="watermark-sub">安全验证</div>
        </div>
        
        {/* 右上角 */}
        <div className="watermark top-right">
          <div className="watermark-text">{currentTime}</div>
          <div className="watermark-sub">防篡改</div>
        </div>
        
        {/* 左下角 */}
        <div className="watermark bottom-left">
          <div className="watermark-text">{currentTime}</div>
          <div className="watermark-sub">真随机</div>
        </div>
        
        {/* 右下角 */}
        <div className="watermark bottom-right">
          <div className="watermark-text">{currentTime}</div>
          <div className="watermark-sub">已保护</div>
        </div>
      </div>

      {/* 密密麻麻的页面水印 */}
      <div className="dense-watermarks">
        {Array.from({ length: 300 }, (_, i) => {
          const row = Math.floor(i / 25)
          const col = i % 25
          return (
            <div key={i} className="dense-watermark" style={{
              left: `${col * 4 + 2}%`,
              top: `${row * 8 + 4}%`,
              transform: `rotate(${-20 + (i % 4) * 10}deg)`
            }}>
              <div className="dense-watermark-text">{currentTime}</div>
              <div className="dense-watermark-sub">防篡改</div>
            </div>
          )
        })}
      </div>

      {/* 额外的斜向水印层 */}
      <div className="diagonal-watermarks">
        {Array.from({ length: 200 }, (_, i) => {
          const x = (i % 20) * 5
          const y = Math.floor(i / 20) * 10
          return (
            <div key={i} className="diagonal-watermark" style={{
              left: `${x + 2.5}%`,
              top: `${y + 5}%`,
              transform: `rotate(${45 + (i % 2) * 90}deg)`
            }}>
              <div className="diagonal-watermark-text">{currentTime}</div>
            </div>
          )
        })}
      </div>

      {/* 微小密集水印 */}
      <div className="micro-watermarks">
        {Array.from({ length: 600 }, (_, i) => {
          const row = Math.floor(i / 30)
          const col = i % 30
          return (
            <div key={i} className="micro-watermark" style={{
              left: `${col * 3.33 + 1}%`,
              top: `${row * 5 + 2.5}%`,
              transform: `rotate(${-30 + (i % 6) * 10}deg)`
            }}>
              {currentTime.slice(-8)}
            </div>
          )
        })}
      </div>
    </>
  )
}