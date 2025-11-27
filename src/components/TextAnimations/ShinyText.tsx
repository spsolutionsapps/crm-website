'use client'

import { CSSProperties, useEffect } from 'react'

interface ShinyTextProps {
  text: string
  className?: string
  gradientColors?: string[]
  duration?: number
}

export default function ShinyText({ 
  text, 
  className = '',
  gradientColors = ['#2F73F2', '#C0D5FB', '#2F73F2'],
  duration = 3
}: ShinyTextProps) {
  useEffect(() => {
    // Asegurar que la animación esté disponible
    const style = document.createElement('style')
    style.textContent = `
      @keyframes shiny-text-animation {
        0% {
          background-position: 200% center;
        }
        100% {
          background-position: -200% center;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const style: CSSProperties = {
    backgroundImage: `linear-gradient(120deg, ${gradientColors.join(', ')})`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    animation: `shiny-text-animation ${duration}s linear infinite`,
  }

  return (
    <span style={style} className={`shiny-text ${className}`}>
      {text}
    </span>
  )
}

