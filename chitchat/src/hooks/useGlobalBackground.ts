import { useState, useCallback } from 'react'

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'image'
  value?: string
  imageConfig?: {
    url: string
    size?: 'cover' | 'contain' | 'auto'
    position?: string
    repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
    opacity?: number
  }
  gradientConfig?: {
    direction?: string
    colors: string[]
  }
  fixed?: boolean
}

// 预设的背景配置
export const backgroundPresets = {
  // 纯色背景
  darkTheme: {
    type: 'color' as const,
    value: '#000000'
  },
  lightTheme: {
    type: 'color' as const,
    value: '#ffffff'
  },
  
  // 渐变背景
  blueGradient: {
    type: 'gradient' as const,
    gradientConfig: {
      direction: 'to bottom',
      colors: ['#1e3c72', '#2a5298']
    }
  },
  purpleGradient: {
    type: 'gradient' as const,
    gradientConfig: {
      direction: 'to bottom right',
      colors: ['#667eea', '#764ba2']
    }
  },
  darkGradient: {
    type: 'gradient' as const,
    gradientConfig: {
      direction: 'to bottom',
      colors: ['#0c0c0c', '#1a1a1a', '#2d2d2d']
    }
  },
  
  // 图片背景示例
  starryNight: {
    type: 'image' as const,
    imageConfig: {
      url: '/images/starry-night.jpg',
      size: 'cover',
      position: 'center',
      repeat: 'no-repeat',
      opacity: 0.8
    },
    fixed: true
  }
}

export const useGlobalBackground = (initialConfig?: BackgroundConfig) => {
  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundConfig>(
    initialConfig || backgroundPresets.darkTheme
  )

  // 设置纯色背景
  const setColorBackground = useCallback((color: string) => {
    setBackgroundConfig({
      type: 'color',
      value: color
    })
  }, [])

  // 设置渐变背景
  const setGradientBackground = useCallback((
    colors: string[], 
    direction: string = 'to bottom'
  ) => {
    setBackgroundConfig({
      type: 'gradient',
      gradientConfig: {
        direction,
        colors
      }
    })
  }, [])

  // 设置图片背景
  const setImageBackground = useCallback((
    url: string,
    options?: {
      size?: 'cover' | 'contain' | 'auto'
      position?: string
      repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
      opacity?: number
      fixed?: boolean
    }
  ) => {
    setBackgroundConfig({
      type: 'image',
      imageConfig: {
        url,
        size: options?.size || 'cover',
        position: options?.position || 'center',
        repeat: options?.repeat || 'no-repeat',
        opacity: options?.opacity || 1
      },
      fixed: options?.fixed || false
    })
  }, [])

  // 使用预设背景
  const setPresetBackground = useCallback((presetName: keyof typeof backgroundPresets) => {
    setBackgroundConfig(backgroundPresets[presetName])
  }, [])

  // 重置为默认背景
  const resetBackground = useCallback(() => {
    setBackgroundConfig(backgroundPresets.darkTheme)
  }, [])

  return {
    backgroundConfig,
    setBackgroundConfig,
    setColorBackground,
    setGradientBackground,
    setImageBackground,
    setPresetBackground,
    resetBackground,
    presets: backgroundPresets
  }
}
