
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
  FriendsO,
  SettingO,
  UserO
}from '@react-vant/icons'

const MainLayout = ()=>{
  const tabs = [
    {icon:<HomeO/>,title:'首页',path:'/home'},
    {icon:<FriendsO/>,title:'收藏',path:'/message'},
    {icon:<Search/>,title:'发布',path:'/publish'},
    {icon:<SettingO/>,title:'行程',path:'/explore'},
    {icon:<UserO/>,title:'我的账号',path:'/account'},
  ];
  const [active,setActive] = useState<number>();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
   const index = tabs.findIndex(tab=>location.pathname.startsWith(tab.path))
   setActive(index)
  })

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
        navigate(tabs[index].path)
      }

     }
     >
    {
      tabs.map((tab,index)=>(
        <Tabbar.Item
        key={index}
        icon = {tab.icon}
        >
          {tab.title}
        </Tabbar.Item>
      ))
    }
     </ Tabbar>
    </div>
  )
}
export default MainLayout