import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import useAiRoleListStore from '../../store/useAiRoleListStore'
import styles from './index.module.css'
import { Search, Swiper } from 'react-vant'
import ChatArea from '../../components/ChatArea'
import LocalStorageUtil from '../../utils/LocalStorageUtil'
import { useEffect } from 'react'
const Home = () => {
  useTitle('首页')
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/search')
  }
  const { aiRoleList ,loading ,fetchMoreAiRoleList} = useAiRoleListStore();
  useEffect(()=>{
    LocalStorageUtil.setItem('aiRoleList',aiRoleList)
  },[aiRoleList])
  const handleChange = (index)=>{
    console.log(index);
     if(index>=aiRoleList.length-1){
       fetchMoreAiRoleList()
     }
  }
  return (
    <div 
    className='flex flex-col h-screen h-all ' 
    style={{  
      background: 'url("http://dummyimage.com/412x915/79f29c/fff&text=image")', 
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed',
    }}
    >
      <Search placeholder="请输入内容" onClickInput={handleSearch} className={styles.search} />
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
