import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'react-vant'
import './index.css'
import 'lib-flexible'
import App from './App.tsx'
import GlobalBackground from './components/GlobalBackground/GlobalBackground.tsx'

const themeVars = {
  // Dark 主题配置

  // Rate 组件
  rateIconFullColor: '#ffd21e',

  // Slider 组件
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackgroundColor: '#4fc3f7',

  // Button 组件
  buttonPrimaryBorderColor: '#4fc3f7',
  buttonPrimaryBackgroundColor: '#4fc3f7',
  buttonDefaultColor: '#ffffff',
  buttonDefaultBorderColor: '#3a3a3c',
  buttonDefaultBackgroundColor: '#2c2c2e',

  // Tabbar 组件 (Dark 主题)
  tabbarBackgroundColor: 'rgba(28, 28, 30, 0.95)',
  tabbarItemActiveColor: '#4fc3f7',
  tabbarItemInactiveColor: '#8e8e93',
  tabbarActiveColor: '#4fc3f7',
  tabbarInactiveColor: '#8e8e93',
  tabbarTextColor: '#8e8e93',
  // 移除激活时的背景色变化
  tabbarItemActiveBackgroundColor: 'transparent',
  tabbarItemInactiveBackgroundColor: 'transparent',

  // 主色调 (Dark 主题)
  primaryColor: '#4fc3f7',
  successColor: '#34c759',
  warningColor: '#ff9f0a',
  dangerColor: '#ff453a',

  // 文本颜色 (Dark 主题)
  textColor: '#ffffff',
  textColor2: '#ebebf5',
  textColor3: '#8e8e93',

  // 背景色 (Dark 主题)
  backgroundColor: '#000000',
  backgroundColor2: '#1c1c1e',

  // 边框色 (Dark 主题)
  borderColor: '#3a3a3c',

  // 字体大小
  fontSizeSm: '12px',
  fontSizeMd: '14px',
  fontSizeLg: '16px',
}

createRoot(document.getElementById('root')!).render(
  <Router>
   
    <ConfigProvider themeVars={themeVars}>
    <GlobalBackground
      type="image"
      imageConfig={{
        url:"https://img.3dmgame.com/uploads/images/news/20220913/1663040832_649686.jpg",
        size: 'cover',
        position: 'center',
        repeat: 'no-repeat',
        opacity: 0.8
      }}
    >
       <App />
    </GlobalBackground>
    </ConfigProvider>
  </Router>
)
