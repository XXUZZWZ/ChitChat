

import {
  Outlet,
  useNavigate,
  useLocation
}from "react-router-dom"
import {
  useEffect,
  useState
}from 'react'
import {
 Tabbar
}from 'react-vant'
import {
  HomeO,
  Search,
  StarO,
  Plus,
  UserO,
  WapHome,
  Star,
  Contact
}from '@react-vant/icons'



const MainLayout = ()=>{
  const tabs = [
    {icon:<HomeO/>,title:'首页',path:'/home'},
    {icon:<StarO/>,title:'收藏',path:'/message'},
    {icon:<Plus/>,title:'发布',path:'/publish'},
    {icon:<Search/>,title:'探索',path:'/explore'},
    {icon:<UserO/>,title:'我的',path:'/account'},
  ];
  const [active,setActive] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
   const index = tabs.findIndex(tab=>location.pathname.startsWith(tab.path))
   setActive(index>=0?index:0)
  },[location.pathname])

  return (
    <div className="flex flex-col h-screen"  style={{paddingBottom:"50px"}}>
        <div className="flex-1">
          <Outlet/>
        </div>
        
     {/* MainLayout */}
     {/* tabbar */}
     < Tabbar
     value={active}
     onChange={
      (key: string | number)=>{
        const index = typeof key === 'string' ? parseInt(key, 10) : key;
        setActive(index)
        navigate(tabs[index].path, { replace: true })
      }

     }
     >
    {
      tabs.map((tab,index)=>{
        // 根据激活状态选择图标
        let displayIcon;
        if (active === index) {
          // 激活状态使用填充图标
          switch(index) {
            case 0: displayIcon = <WapHome/>; break;  // 首页
            case 1: displayIcon = <Star/>; break;     // 收藏
            case 2: displayIcon = <Plus/>; break;     // 发布
            case 3: displayIcon = <Search/>; break;   // 探索
            case 4: displayIcon = <Contact/>; break;     // 我的账号
            default: displayIcon = tab.icon;
          }
        } else {
          // 非激活状态使用轮廓图标
          displayIcon = tab.icon;
        }

        return (
          <Tabbar.Item
            key={index}
            icon={displayIcon}
          >
            {tab.title}
          </Tabbar.Item>
        )
      })
    }
     </ Tabbar>
    </div>
  )
}
export default MainLayout