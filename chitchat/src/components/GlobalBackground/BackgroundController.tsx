import React from 'react'
import { Button, Space, Popup } from 'react-vant'
import { useGlobalBackground } from '../hooks/useGlobalBackground'

interface BackgroundControllerProps {
  visible: boolean
  onClose: () => void
}

const BackgroundController: React.FC<BackgroundControllerProps> = ({
  visible,
  onClose
}) => {
  const {
    setColorBackground,
    setGradientBackground,
    setImageBackground,
    setPresetBackground,
    resetBackground
  } = useGlobalBackground()

  const handleColorChange = (color: string) => {
    setColorBackground(color)
    onClose()
  }

  const handleGradientChange = (colors: string[], direction: string) => {
    setGradientBackground(colors, direction)
    onClose()
  }

  const handlePresetChange = (presetName: string) => {
    setPresetBackground(presetName as any)
    onClose()
  }

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      position="bottom"
      style={{ height: '60vh' }}
    >
      <div style={{ padding: '20px' }}>
        <h3 style={{ color: '#fff', marginBottom: '20px' }}>背景设置</h3>
        
        {/* 预设背景 */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#fff', marginBottom: '10px' }}>预设主题</h4>
          <Space wrap>
            <Button 
              size="small" 
              onClick={() => handlePresetChange('darkTheme')}
            >
              深色主题
            </Button>
            <Button 
              size="small" 
              onClick={() => handlePresetChange('lightTheme')}
            >
              浅色主题
            </Button>
            <Button 
              size="small" 
              onClick={() => handlePresetChange('blueGradient')}
            >
              蓝色渐变
            </Button>
            <Button 
              size="small" 
              onClick={() => handlePresetChange('purpleGradient')}
            >
              紫色渐变
            </Button>
            <Button 
              size="small" 
              onClick={() => handlePresetChange('darkGradient')}
            >
              深色渐变
            </Button>
          </Space>
        </div>

        {/* 纯色背景 */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#fff', marginBottom: '10px' }}>纯色背景</h4>
          <Space wrap>
            <Button 
              size="small" 
              style={{ backgroundColor: '#000000' }}
              onClick={() => handleColorChange('#000000')}
            >
              黑色
            </Button>
            <Button 
              size="small" 
              style={{ backgroundColor: '#1a1a1a' }}
              onClick={() => handleColorChange('#1a1a1a')}
            >
              深灰
            </Button>
            <Button 
              size="small" 
              style={{ backgroundColor: '#2d3748' }}
              onClick={() => handleColorChange('#2d3748')}
            >
              蓝灰
            </Button>
            <Button 
              size="small" 
              style={{ backgroundColor: '#1a202c' }}
              onClick={() => handleColorChange('#1a202c')}
            >
              深蓝
            </Button>
          </Space>
        </div>

        {/* 渐变背景 */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#fff', marginBottom: '10px' }}>渐变背景</h4>
          <Space wrap>
            <Button 
              size="small" 
              onClick={() => handleGradientChange(['#ff6b6b', '#ee5a24'], 'to bottom')}
            >
              红橙渐变
            </Button>
            <Button 
              size="small" 
              onClick={() => handleGradientChange(['#4834d4', '#686de0'], 'to bottom right')}
            >
              紫色渐变
            </Button>
            <Button 
              size="small" 
              onClick={() => handleGradientChange(['#00d2d3', '#54a0ff'], 'to bottom')}
            >
              青蓝渐变
            </Button>
          </Space>
        </div>

        {/* 重置按钮 */}
        <div style={{ marginTop: '30px' }}>
          <Button 
            type="primary" 
            block 
            onClick={() => {
              resetBackground()
              onClose()
            }}
          >
            重置为默认背景
          </Button>
        </div>
      </div>
    </Popup>
  )
}

export default BackgroundController
