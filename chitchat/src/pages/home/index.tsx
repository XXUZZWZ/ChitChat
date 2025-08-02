import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import styles from './index.module.css'
import { Search, Swiper } from 'react-vant'
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
      {/* <ChatArea/> */}
      <Swiper className={styles.swiper}>
        <Swiper.Item>1<ChatArea prompt="我是猫娘,快来和我说说最近的事情吧" placeholder="发消息给猫娘" /></Swiper.Item>
        <Swiper.Item>2<ChatArea prompt="我是住在魔法之森的精灵,你有什么烦恼吗？ " placeholder=" 发消息给精灵"/></Swiper.Item>
        <Swiper.Item>3<ChatArea prompt=" 我是一个机器瓦力，你有什么烦心事吗？" placeholder="发消息给瓦力"/></Swiper.Item>
      </Swiper>
    </div>
  )
}

export default Home
