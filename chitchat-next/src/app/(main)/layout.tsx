"use client";
import { Tabbar } from "react-vant";
import { HomeO, ChatO, Plus, Search as SearchIcon, UserO, WapHome, Chat, Contact } from "@react-vant/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const tabs = useMemo(
    () => [
      { icon: <HomeO />, title: "首页", path: "/home" },
      { icon: <ChatO />, title: "消息", path: "/message" },
      { icon: <Plus />, title: "发布", path: "/publish" },
      { icon: <SearchIcon />, title: "探索", path: "/explore" },
      { icon: <UserO />, title: "我的", path: "/account" },
    ],
    []
  );

  const [active, setActive] = useState<number>(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const index = tabs.findIndex((tab) => pathname?.startsWith(tab.path));
    setActive(index >= 0 ? index : 0);
  }, [pathname, tabs]);

  return (
    <div className="flex flex-col min-h-screen bg-background">      <div className="flex-1 overflow-hidden" >{children}</div>
      
      {/* 美化底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-50">        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20 shadow-lg">          <Tabbar
            value={active}
            onChange={(key) => {
              const index = typeof key === "string" ? parseInt(key, 10) : (key as number);
              setActive(index);
              router.replace(tabs[index].path);
            }}
            className="max-w-md mx-auto px-2 sm:px-4"
            style={{
              '--rv-tabbar-background': 'transparent',
              '--rv-tabbar-item-active-color': '#6366f1',
              '--rv-tabbar-item-text-color': '#64748b',
              '--rv-tabbar-item-active-background': 'transparent',
              '--rv-tabbar-height': '64px',
            } as React.CSSProperties}
          >
            {tabs.map((tab, index) => {
              let displayIcon;
              const isActive = active === index;
              
              if (isActive) {
                switch (index) {
                  case 0:
                    displayIcon = <WapHome />;
                    break;
                  case 1:
                    displayIcon = <Chat />;
                    break;
                  case 2:
                    displayIcon = <Plus />;
                    break;
                  case 3:
                    displayIcon = <SearchIcon />;
                    break;
                  case 4:
                    displayIcon = <Contact />;
                    break;
                  default:
                    displayIcon = tab.icon;
                }
              } else {
                displayIcon = tab.icon;
              }

              return (
                <Tabbar.Item 
                  key={index} 
                  icon={
                    <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>                      {displayIcon}
                    </div>
                  }
                  className={`transition-all duration-300 ${isActive ? 'font-semibold' : ''}`}
                >
                  {tab.title}
                </Tabbar.Item>
              );
            })}
          </Tabbar>        </div>      </div>
    </div>
  );
}


