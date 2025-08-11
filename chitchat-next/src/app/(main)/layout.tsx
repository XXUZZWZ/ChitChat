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
    <div className="flex flex-col min-h-screen" style={{ paddingBottom: "50px" }}>
      <div className="flex-1">{children}</div>
      <Tabbar
        value={active}
        onChange={(key) => {
          const index = typeof key === "string" ? parseInt(key, 10) : (key as number);
          setActive(index);
          router.replace(tabs[index].path);
        }}
      >
        {tabs.map((tab, index) => {
          let displayIcon;
          if (active === index) {
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
            <Tabbar.Item key={index} icon={displayIcon}>
              {tab.title}
            </Tabbar.Item>
          );
        })}
      </Tabbar>
    </div>
  );
}


