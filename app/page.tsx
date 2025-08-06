'use client'

import { useState } from 'react'

export default function Home() {
  const [diceValue, setDiceValue] = useState<number>(1)
  const [isRolling, setIsRolling] = useState<boolean>(false)
  const [rollCount, setRollCount] = useState<number>(0)
  const [isUsingTrueRandom, setIsUsingTrueRandom] = useState<boolean>(false)
  const [hasRolled, setHasRolled] = useState<boolean>(false)
  const [rollTime, setRollTime] = useState<string>('')

  // 使用Web Crypto API生成真随机数
  const generateTrueRandom = (): number => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      // 生成32位随机数
      const array = new Uint32Array(1)
      window.crypto.getRandomValues(array)
      // 将随机数映射到1-6范围
      setIsUsingTrueRandom(true)
      return Math.floor((array[0] / (0xFFFFFFFF + 1)) * 6) + 1
    } else {
      // 降级到Math.random()作为备选
      console.warn('Web Crypto API不可用，使用Math.random()作为备选')
      setIsUsingTrueRandom(false)
      return Math.floor(Math.random() * 6) + 1
    }
  }

  const rollDice = () => {
    if (isRolling || hasRolled) return

    setIsRolling(true)
    setRollCount(prev => prev + 1)

    // 记录摇骰子的时间
    const now = new Date()
    const timeString = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    setRollTime(timeString)

    // 模拟骰子滚动过程
    let rollInterval: NodeJS.Timeout
    let rollDuration = 0
    const maxDuration = 1000 // 1秒滚动时间

    rollInterval = setInterval(() => {
      setDiceValue(generateTrueRandom())
      rollDuration += 100

      if (rollDuration >= maxDuration) {
        clearInterval(rollInterval)
        // 最终结果使用真随机数
        const finalValue = generateTrueRandom()
        setDiceValue(finalValue)
        setIsRolling(false)
        setHasRolled(true) // 标记已经摇过骰子
      }
    }, 100)
  }

  const resetGame = () => {
    setHasRolled(false)
    setRollCount(0)
    setDiceValue(1)
    setRollTime('')
  }

  const getDiceDisplay = (value: number): string => {
    const diceUnicode = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    return diceUnicode[value - 1]
  }

  return (
    <div className="container">
      <h1 className="title">🎲 摇骰子</h1>
      
      <div className="dice-container">
        <div 
          className={`dice ${isRolling ? 'rolling' : ''}`}
          onClick={rollDice}
        >
          {getDiceDisplay(diceValue)}
        </div>
      </div>

      <button 
        className="roll-button"
        onClick={rollDice}
        disabled={isRolling || hasRolled}
      >
        {isRolling ? '摇骰子中...' : hasRolled ? '已摇过骰子' : '点击摇骰子'}
      </button>

      {hasRolled && (
        <button 
          className="reset-button"
          onClick={resetGame}
        >
          重新开始
        </button>
      )}

      {rollCount > 0 && (
        <div className="result-text">
          摇骰子结果：{diceValue}
          {rollTime && (
            <div className="time-text">
              时间：{rollTime}
            </div>
          )}
        </div>
      )}

      <div className="random-indicator">
        {isUsingTrueRandom ? (
          <span className="true-random">🔒 使用加密级真随机数</span>
        ) : (
          <span className="pseudo-random">⚠️ 使用伪随机数（备选）</span>
        )}
      </div>
    </div>
  )
}