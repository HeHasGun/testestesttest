'use client'

import { useEffect } from 'react'

export default function DevToolProtection() {
  useEffect(() => {
    // 动态导入disable-devtool以避免SSR问题
    const loadDevToolProtection = async () => {
      try {
        const { default: disableDevtool } = await import('disable-devtool')
        
        disableDevtool({
          // 检测到开发者工具时的回调
          ondevtoolopen: (type: any, next: any) => {
            const message = '检测到开发者工具已打开！\n为了保护应用安全，页面将被重定向。'
            // alert(message)
            // 重定向到空白页面
            window.location.href = '/'
          },
          // 禁用右键菜单
          disableMenu: true,
          // 禁用选择文本
          disableSelect: true,
          // 禁用复制
          disableCopy: true,
          // 禁用剪切
          disableCut: true,
          // 禁用粘贴
          disablePaste: true,
          // 清除控制台
          clearLog: true,
          // 检测间隔（毫秒）
          interval: 500
        })
      } catch (error) {
        console.warn('防调试功能加载失败:', error)
      }
    }

    loadDevToolProtection()
  }, [])

  return null
}