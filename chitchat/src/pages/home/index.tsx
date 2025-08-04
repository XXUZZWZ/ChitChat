import { useNavigate, useLocation } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import useAiRoleListStore from '../../store/useAiRoleListStore'
import styles from './index.module.css'
import { Search, Swiper } from 'react-vant'
import ChatArea from '../../components/ChatArea'
import LocalStorageUtil from '../../utils/LocalStorageUtil'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
const Home = () => {
  useTitle('首页')
  const navigate = useNavigate();
  const location = useLocation();
  const [initialIndex, setInitialIndex] = useState(0);
  const swiperRef = useRef(null);
  
  const handleSearch = () => {
    navigate('/search')
  }
  
  const { aiRoleList, loading, fetchMoreAiRoleList } = useAiRoleListStore();
  
  useEffect(() => {
    LocalStorageUtil.setItem('aiRoleList', aiRoleList)
  }, [aiRoleList])

  // 处理从message页面跳转过来的选中角色
  useLayoutEffect(() => {
    if (location.state?.selectedRole && aiRoleList.length > 0) {
      const selectedRole = location.state.selectedRole;
      const index = aiRoleList.findIndex(role => role.id === selectedRole.id);
      
      if (index !== -1) {
        setInitialIndex(index);
        
        // 使用 setTimeout 确保 Swiper 已经渲染完成
        setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.swipeTo(index);
          }
        }, 300);
      }
      
      // 清除state，避免重复触发
      setTimeout(() => {
        navigate(location.pathname, { replace: true, state: {} });
      }, 500);
    }
  }, [location.state, aiRoleList, navigate, location.pathname]);
  
  const handleChange = (index) => {
    if (index >= aiRoleList.length - 1) {
      fetchMoreAiRoleList()
    }
  }
  
  return (
    <div 
      className='flex flex-col h-screen h-all' 
      style={{  
        background: 'url("http://dummyimage.com/412x915/79f29c/fff&text=image")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        backgroundAttachment: 'fixed',
      }}
    >
      <Search placeholder="请输入内容" onClickInput={handleSearch} className={styles.search} />
      
      <Swiper 
        ref={swiperRef}
        className={styles.swiper} 
        onChange={handleChange} 
        touchable={!loading}
        indicator={false}
        stuckAtBoundary={true}
        defaultIndex={initialIndex}
        key={`swiper-${initialIndex}-${aiRoleList.length}`}
      >
        {aiRoleList.map((item) => {
          return (
            <Swiper.Item key={item.id}>
              <div>&nbsp;</div>
              <ChatArea prompt={item.prompt} placeholder={item.placeholder}/>
            </Swiper.Item>
          )
        })} 
      </Swiper>
    </div>
  )
}

export default Home
