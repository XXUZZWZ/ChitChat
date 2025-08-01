import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import styles from './index.module.css'
import { Search } from 'react-vant'
import ChatArea from '../../components/ChatArea'
const Home = () => {
  useTitle('首页')
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/search')
  }
  return (
    <div className='flex flex-col h-screen h-all'>
      <Search placeholder="请输入内容" onClickInput={handleSearch} className='bg-inherit fixed-top'/>
      <ChatArea/>
    </div>
  )
}

export default Home
