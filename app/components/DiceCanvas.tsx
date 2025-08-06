'use client'

import { useEffect, useRef } from 'react'

interface DiceCanvasProps {
  value: number
  isRolling: boolean
  onClick: () => void
}

export default function DiceCanvas({ value, isRolling, onClick }: DiceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 生成唯一的绘制ID
    const drawId = Math.random().toString(36).substr(2, 9)
    
    // 设置画布尺寸
    const size = 120
    canvas.width = size
    canvas.height = size

    // 清除画布
    ctx.clearRect(0, 0, size, size)

    // 绘制骰子背景
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 2
    
    // 绘制圆角矩形
    const radius = 15
    ctx.beginPath()
    ctx.moveTo(radius, 0)
    ctx.lineTo(size - radius, 0)
    ctx.quadraticCurveTo(size, 0, size, radius)
    ctx.lineTo(size, size - radius)
    ctx.quadraticCurveTo(size, size, size - radius, size)
    ctx.lineTo(radius, size)
    ctx.quadraticCurveTo(0, size, 0, size - radius)
    ctx.lineTo(0, radius)
    ctx.quadraticCurveTo(0, 0, radius, 0)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // 绘制阴影效果
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 5
    ctx.shadowOffsetY = 5

    // 绘制点数
    ctx.fillStyle = '#333333'
    ctx.shadowColor = 'transparent'
    
    const dotRadius = 8
    const positions = getDotPositions(value, size, dotRadius)
    
    positions.forEach(pos => {
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, dotRadius, 0, 2 * Math.PI)
      ctx.fill()
    })

    // 添加多重防篡改水印
    const timestamp = Date.now()
    const checksum = (value * timestamp).toString(36).slice(-4)
    
    // 时间戳水印
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.font = '6px Arial'
    ctx.fillText(timestamp.toString().slice(-6), 2, size - 2)
    
    // 校验和水印
    ctx.fillText(checksum, size - 25, 10)
    
    // 绘制ID水印
    ctx.fillText(drawId, size - 30, size - 2)
    
    // 隐藏的验证点（用于检测篡改）
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)'
    ctx.fillRect(0, 0, 1, 1)
    
    // 将Canvas数据保存到dataset中用于验证
    canvas.dataset.drawId = drawId
    canvas.dataset.checksum = checksum
    canvas.dataset.timestamp = timestamp.toString()
    canvas.dataset.value = value.toString()
    
  }, [value])

  // 获取点数位置
  const getDotPositions = (num: number, size: number, dotRadius: number) => {
    const margin = 25
    const center = size / 2
    const quarter = size / 4
    const threeQuarter = (3 * size) / 4

    switch (num) {
      case 1:
        return [{ x: center, y: center }]
      case 2:
        return [
          { x: quarter, y: quarter },
          { x: threeQuarter, y: threeQuarter }
        ]
      case 3:
        return [
          { x: quarter, y: quarter },
          { x: center, y: center },
          { x: threeQuarter, y: threeQuarter }
        ]
      case 4:
        return [
          { x: quarter, y: quarter },
          { x: threeQuarter, y: quarter },
          { x: quarter, y: threeQuarter },
          { x: threeQuarter, y: threeQuarter }
        ]
      case 5:
        return [
          { x: quarter, y: quarter },
          { x: threeQuarter, y: quarter },
          { x: center, y: center },
          { x: quarter, y: threeQuarter },
          { x: threeQuarter, y: threeQuarter }
        ]
      case 6:
        return [
          { x: quarter, y: margin },
          { x: threeQuarter, y: margin },
          { x: quarter, y: center },
          { x: threeQuarter, y: center },
          { x: quarter, y: size - margin },
          { x: threeQuarter, y: size - margin }
        ]
      default:
        return []
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className={`dice-canvas ${isRolling ? 'rolling' : ''}`}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease'
      }}
    />
  )
}