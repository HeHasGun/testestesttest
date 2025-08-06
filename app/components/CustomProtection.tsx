'use client'

import { useEffect } from 'react'

export default function CustomProtection() {
  useEffect(() => {
    // 禁用F12键
    const handleKeyDown = (e: KeyboardEvent) => {
      // 禁用F12
      if (e.key === 'F12') {
        e.preventDefault()
        e.stopPropagation()
        // alert('F12功能已被禁用！')
        return false
      }
      
      // 禁用Ctrl+Shift+I (开发者工具)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        e.stopPropagation()
        // alert('开发者工具已被禁用！')
        return false
      }
      
      // 禁用Ctrl+Shift+J (控制台)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        e.stopPropagation()
        // alert('控制台已被禁用！')
        return false
      }
      
      // 禁用Ctrl+U (查看源代码)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        e.stopPropagation()
        // alert('查看源代码已被禁用！')
        return false
      }
      
      // 禁用Ctrl+Shift+C (元素选择器)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        e.stopPropagation()
        // alert('元素选择器已被禁用！')
        return false
      }
    }

    // 禁用右键菜单
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      // alert('右键菜单已被禁用！')
      return false
    }

    // 检测开发者工具
    const detectDevTools = () => {
      const threshold = 160
      
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          // alert('检测到开发者工具！页面将被重定向。')
          window.location.href = '/'
        }
      }, 1)
    }

    // 防止调试器断点
    const antiDebugger = () => {
      setInterval(() => {
        // 检测调试器
        const start = performance.now()
        debugger
        const end = performance.now()
        
        if (end - start > 100) {
          window.location.href = '/'
        }
      }, 200)
    }

    // 清除控制台
    const clearConsole = () => {
      setInterval(() => {
        console.clear()
      }, 200)
    }

    // 添加事件监听器
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    
    // 启动检测
    detectDevTools()
    antiDebugger()
    clearConsole()

    // 清理函数
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return null
}