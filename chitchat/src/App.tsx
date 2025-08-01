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

const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))
const Account = lazy(() => import('./pages/account'))
const Publish = lazy(() => import('./pages/publish'))
const Explore = lazy(() => import('./pages/explore'))
const Message = lazy(() => import('./pages/message'))
const Search = lazy(() => import('./pages/search'))

function App() {


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
    </>
  )
}

export default App
