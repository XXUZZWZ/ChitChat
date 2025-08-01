import {
  Suspense,
  lazy
} from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import PureLayout from './layout/PureLayout'
import Loading from './components/Loading'
import GlobalBackground from './components/GlobalBackground/GlobalBackground'
import { useGlobalBackground } from './hooks/useGlobalBackground'

const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))
const Account = lazy(() => import('./pages/account'))
const Publish = lazy(() => import('./pages/publish'))
const Explore = lazy(() => import('./pages/explore'))
const Message = lazy(() => import('./pages/message'))
const Search = lazy(() => import('./pages/search'))

function App() {
  // 使用全局背景 Hook
  const { backgroundConfig } = useGlobalBackground()

  return (
    <GlobalBackground {...backgroundConfig}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/message" element={<Message />} />
            <Route path="/publish" element={<Publish />} />
          </Route>
          <Route element={<PureLayout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </Suspense>
    </GlobalBackground>
  )
}

export default App
