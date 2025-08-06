'use client'

import { useEffect } from 'react'

export default function AntiCheat() {
  useEffect(() => {
    // 防止DOM修改
    const protectDOM = () => {
      // 监听DOM变化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // 检测到可疑的DOM修改
            const target = mutation.target as Element
            if (target.classList?.contains('dice-canvas') || 
                target.classList?.contains('result-text') ||
                target.tagName === 'CANVAS') {
              console.warn('检测到可疑的DOM修改！')
              // 可以在这里添加更严格的处理
            }
          }
        })
      })

      // 开始监听整个文档
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true
      })

      return observer
    }

    // 防止Canvas篡改
    const protectCanvas = () => {
      // 监听Canvas元素的创建
      const originalCreateElement = document.createElement
      
      document.createElement = function(tagName: string) {
        const element = originalCreateElement.call(this, tagName)
        
        if (tagName.toLowerCase() === 'canvas') {
          console.log('Canvas元素被创建')
          // 可以在这里添加Canvas保护逻辑
        }
        
        return element
      }
    }

    // 防止图片替换
    const protectImages = () => {
      const originalCreateElement = document.createElement
      
      document.createElement = function(tagName: string) {
        const element = originalCreateElement.call(this, tagName)
        
        if (tagName.toLowerCase() === 'img') {
          // 监听图片元素的创建
          console.warn('检测到图片元素创建，可能存在替换风险')
        }
        
        return element
      }
    }

    // 防止CSS注入
    const protectCSS = () => {
      const originalInsertRule = CSSStyleSheet.prototype.insertRule
      
      CSSStyleSheet.prototype.insertRule = function(rule: string, index?: number) {
        // 检测可疑的CSS规则
        if (rule.includes('.dice-canvas') || 
            rule.includes('.result-text') ||
            rule.includes('background-image')) {
          console.warn('检测到可疑的CSS注入:', rule)
        }
        
        return originalInsertRule.call(this, rule, index)
      }
    }

    // 生成页面完整性哈希
    const generatePageHash = () => {
      try {
        const pageContent = document.documentElement.outerHTML
        // 使用简单的哈希算法避免btoa编码问题
        let hash = 0
        for (let i = 0; i < pageContent.length; i++) {
          const char = pageContent.charCodeAt(i)
          hash = ((hash << 5) - hash) + char
          hash = hash & hash // 转换为32位整数
        }
        const hashStr = Math.abs(hash).toString(36).slice(0, 8)
        sessionStorage.setItem('pageHash', hashStr)
        return hashStr
      } catch (error) {
        console.warn('生成页面哈希失败:', error)
        return ''
      }
    }

    // 验证页面完整性
    const verifyPageIntegrity = () => {
      setInterval(() => {
        try {
          const currentContent = document.documentElement.outerHTML
          let hash = 0
          for (let i = 0; i < currentContent.length; i++) {
            const char = currentContent.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash
          }
          const currentHash = Math.abs(hash).toString(36).slice(0, 8)
          const originalHash = sessionStorage.getItem('pageHash')
          
          if (originalHash && currentHash !== originalHash) {
            console.warn('页面完整性验证失败，可能被篡改')
            // 可以在这里添加更严格的处理
          }
        } catch (error) {
          console.warn('页面完整性验证失败:', error)
        }
      }, 5000)
    }

    // 启动所有保护措施
    const domObserver = protectDOM()
    protectCanvas()
    protectImages()
    protectCSS()
    generatePageHash()
    verifyPageIntegrity()

    // 清理函数
    return () => {
      domObserver.disconnect()
    }
  }, [])

  return null
}