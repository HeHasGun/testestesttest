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
      let devtools = {
        open: false,
        orientation: null as string | null
      }
      
      const threshold = 160
      
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true
            console.warn('检测到开发者工具打开！')
            // 立即触发debugger断点
            debugger
            alert('请关闭开发者工具！')
            window.location.href = 'about:blank'
          }
        } else {
          devtools.open = false
        }
      }, 500)
    }

    // 强化F12检测
    const enhancedF12Detection = () => {
      // 监听所有可能打开开发者工具的按键
      document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
          e.preventDefault()
          debugger
          alert('F12已被禁用！')
          return false
        }
        
        // Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
          e.preventDefault()
          debugger
          alert('开发者工具已被禁用！')
          return false
        }
        
        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
          e.preventDefault()
          debugger
          alert('控制台已被禁用！')
          return false
        }
        
        // Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
          e.preventDefault()
          debugger
          alert('元素选择器已被禁用！')
          return false
        }
        
        // Ctrl+U
        if (e.ctrlKey && e.key === 'u') {
          e.preventDefault()
          debugger
          alert('查看源代码已被禁用！')
          return false
        }
      })
      
      // 定期检测控制台
      setInterval(() => {
        const start = performance.now()
        debugger
        const end = performance.now()
        
        // 如果debugger被跳过，说明开发者工具可能打开
        if (end - start > 100) {
          console.warn('检测到调试器活动！')
          window.location.href = 'about:blank'
        }
      }, 1000)
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
    enhancedF12Detection()
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