import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import useAiRoleListStore from '../../store/useAiRoleListStore'
import styles from './index.module.css'
import { Search, Swiper } from 'react-vant'
import ChatArea from '../../components/ChatArea'
import { useGlobalBackground } from '../../hooks/useGlobalBackground'
const Home = () => {
  useTitle('首页')
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/search')
  }
  const { setImageBackground} = useGlobalBackground()
  const { aiRoleList ,loading ,fetchMoreAiRoleList} = useAiRoleListStore();
  const handleChange = (index)=>{
    setImageBackground(aiRoleList[index].imageUrl)
    console.log(index);
     if(index>=aiRoleList.length-1){
       fetchMoreAiRoleList()
     }
  }
  return (
    <div className='flex flex-col h-screen h-all '>
      <Search placeholder="请输入内容" onClickInput={handleSearch} className='bg-inherit fixed-top'/>
      {/* <ChatArea/> */}
      <Swiper 
      className={styles.swiper} 
      onChange={handleChange} 
      touchable={!loading}
      indicator={false}
      stuckAtBoundary={true}
      >
      {
        aiRoleList.map((item)=>{
          return (
            <Swiper.Item 
            key={item.id}
            
            >
             
              <div>&nbsp;</div>
              <ChatArea prompt={item.prompt} placeholder={item.placeholder}/>
            </Swiper.Item>
          )
        })
      } 
      </Swiper>
    </div>
  )
}

export default Home
