import { useNavigate, useLocation } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import useAiRoleListStore from '../../store/useAiRoleListStore'
import styles from './index.module.css'
import { Search, Swiper } from 'react-vant'
import ChatArea from '../../components/ChatArea'
import HomeSkeleton from '../../components/HomeSkeleton'
import LocalStorageUtil from '../../utils/LocalStorageUtil'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
const Home = () => {
  useTitle('首页')
  const navigate = useNavigate();
  const location = useLocation();
  const [initialIndex, setInitialIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const swiperRef = useRef(null);
  
  const handleSearch = () => {
    navigate('/search')
  }
  
  const { aiRoleList, loading, fetchMoreAiRoleList } = useAiRoleListStore();
  
  useEffect(() => {
    LocalStorageUtil.setItem('aiRoleList', aiRoleList)
  }, [aiRoleList])

  // 预加载图片
  useLayoutEffect(() => {
    if (aiRoleList.length > 0) {
      const currentImage = getCurrentBackgroundImage();
      if (!loadedImages.has(currentImage)) {
        setImageLoading(true);
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, currentImage]));
          setImageLoading(false);
        };
        img.onerror = () => {
          setImageLoading(false);
        };
        img.src = currentImage;
      } else {
        setImageLoading(false);
      }
    }
  }, [currentIndex, aiRoleList]);

  // 处理从message页面跳转过来的选中角色
  useLayoutEffect(() => {
    if (location.state?.selectedRole && aiRoleList.length > 0) {
      const selectedRole = location.state.selectedRole;
      const index = aiRoleList.findIndex(role => role.id === selectedRole.id);
      
      if (index !== -1) {
        setInitialIndex(index);
        setCurrentIndex(index);
        
        setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.swipeTo(index);
          }
        }, 300);
      }
      
      setTimeout(() => {
        navigate(location.pathname, { replace: true, state: {} });
      }, 500);
    }
  }, [location.state, aiRoleList, navigate, location.pathname]);
  
  const handleChange = (index) => {
    setCurrentIndex(index);
    if (index >= aiRoleList.length - 1) {
      fetchMoreAiRoleList()
    }
  }

  // 获取当前背景图片
  const getCurrentBackgroundImage = () => {
    if (aiRoleList.length > 0 && aiRoleList[currentIndex]) {
      return aiRoleList[currentIndex].imageUrl;
    }
    return "http://dummyimage.com/412x915/79f29c/fff&text=image";
  }

  // 如果数据还在加载或者没有数据，显示骨架屏
  if (loading || aiRoleList.length === 0) {
    return <HomeSkeleton />;
  }
  
  return (
    <div 
      className={styles.container}
      style={{
        backgroundImage: !imageLoading ? `url(${getCurrentBackgroundImage()})` : 'none',
        backgroundColor: imageLoading ? '#1c1c1e' : 'transparent',
        transition: 'background-image 0.3s ease-in-out'
      }}
    >
     
      
      <Search placeholder="请输入内容" onClickInput={handleSearch} className={styles.search} />
      
      <Swiper 
        ref={swiperRef}
        className={styles.swiper} 
        onChange={handleChange} 
        touchable={!loading && !imageLoading}
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
