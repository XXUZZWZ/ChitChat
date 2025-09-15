"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FloatingBall, Swiper } from "react-vant";
import useAiRoleListStore from "@/store/useAiRoleListStore";
import ChatArea from "@/components/ChatArea";

export default function HomePage() {
  const { aiRoleList, loading, fetchMoreAiRoleList } = useAiRoleListStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const swiperRef = useRef<any>(null);

  const currentImage = useMemo(() => {
    if (aiRoleList.length > 0 && aiRoleList[currentIndex]) return aiRoleList[currentIndex].imageUrl;
    return "http://dummyimage.com/412x915/79f29c/fff&text=image";
  }, [aiRoleList, currentIndex]);

  useLayoutEffect(() => {
    if (aiRoleList.length === 0) return;
    if (!loadedImages.has(currentImage)) {
      setImageLoading(true);
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, currentImage]));
        setImageLoading(false);
      };
      img.onerror = () => setImageLoading(false);
      img.src = currentImage;
    } else {
      setImageLoading(false);
    }
  }, [currentImage, aiRoleList, loadedImages]);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
    if (index >= aiRoleList.length - 1) fetchMoreAiRoleList();
  };

  if (loading || aiRoleList.length === 0) {
    return <div style={{ padding: 24, color: "#fff" }}>Loading...</div>;
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: !imageLoading ? `url(${currentImage})` : "none",
        backgroundColor: imageLoading ? "#1c1c1e" : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* 背景渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
      
      {/* 背景模糊效果 */}
      <div 
        className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" 
        style={{ 
          background: !imageLoading ? 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)' : 'transparent' 
        }}
      />
      {/* 右上角操作按钮区域 */}
      <div className="absolute top-4 right-4 flex gap-3 z-10">        <FloatingBall
          className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          offset={{ top: "10px", right: "1px" }}
          draggable={false}
          adsorb={false}
        >
          <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
            <svg viewBox="0 0 1024 1024" width="24" height="24" className="text-white">
              <path d="M186.0352 378.7776c-73.7536 0-133.76 60.0064-133.76 133.76s60.0064 133.76 133.76 133.76 133.76-60.0064 133.76-133.76S259.7888 378.7776 186.0352 378.7776zM268.8768 512.5376c0 45.696-37.1712 82.8672-82.8416 82.8672S103.168 558.208 103.168 512.5376s37.1712-82.8416 82.8672-82.8416S268.8768 466.8416 268.8768 512.5376zM509.7472 378.7776c-73.7536 0-133.76 60.0064-133.76 133.76s60.0064 133.76 133.76 133.76 133.76-60.0064 133.76-133.76S583.5008 378.7776 509.7472 378.7776zM592.5888 512.5376c0 45.696-37.1712 82.8672-82.8672 82.8672s-82.8416-37.1712-82.8416-82.8672 37.1712-82.8416 82.8416-82.8416S592.5888 466.8416 592.5888 512.5376zM839.04 378.7776c-73.7536 0-133.76 60.0064-133.76 133.76s60.0064 133.76 133.76 133.76c73.7536 0 133.76-60.0064 133.76-133.76S912.7936 378.7776 839.04 378.7776zM921.8816 512.5376c0 45.696-37.1712 82.8672-82.8416 82.8672s-82.8672-37.1712-82.8672-82.8672 37.1712-82.8416 82.8672-82.8416S921.8816 466.8416 921.8816 512.5376z" fill="currentColor"></path>
            </svg>
          </div>
        </FloatingBall>

        <FloatingBall
          className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          offset={{ top: "10px", right: "40px" }}
          draggable={false}
          adsorb={false}
        >
          <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
            <svg viewBox="0 0 1024 1024" width="24" height="24" className="text-white">
              <path d="M920.32 841.813333l-172.373333-172.373333a365.781333 365.781333 0 0 0 71.253333-217.173333c0-202.24-164.693333-366.933333-366.933333-366.933334S85.333333 250.026667 85.333333 452.266667s164.693333 366.933333 366.933334 366.933333c81.066667 0 156.16-26.453333 217.173333-71.253333l172.373333 172.373333c10.666667 10.666667 25.173333 16.213333 39.253334 16.213333a55.381333 55.381333 0 0 0 39.253333-94.72zM175.786667 452.266667c0-152.746667 124.16-276.906667 276.906666-276.906667s276.906667 124.16 276.906667 276.906667-124.16 276.906667-276.906667 276.906666-276.906667-124.16-276.906666-276.906666z" fill="currentColor"></path>
            </svg>
          </div>
        </FloatingBall>
      </div>

      {/* 主内容区域 */}
      <div className="relative z-0 px-4 pt-20 pb-8">
        <div className="max-w-md mx-auto">
          <Swiper 
            ref={swiperRef} 
            onChange={handleChange} 
            indicator={false} 
            stuckAtBoundary 
            defaultIndex={0}
            className="slide-up"
          >
            {aiRoleList.map((item, index) => (
              <Swiper.Item key={item.id}>
                <div className="h-4" />
                <div className="mb-6 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {item.name || 'AI角色'}
                  </h2>
                  <p className="text-white/80 text-sm sm:text-base drop-shadow-md">
                    {item.description || '点击开始对话'}
                  </p>
                </div>
                <div className="px-2">
                  <ChatArea
                    id={item.id}
                    prompt={item.prompt}
                    placeholder={item.placeholder}
                    backgroundImage={item.imageUrl}
                  />
                </div>
              </Swiper.Item>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}



