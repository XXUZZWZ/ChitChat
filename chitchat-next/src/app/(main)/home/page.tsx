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
      style={{
        minHeight: "100vh",
        backgroundImage: !imageLoading ? `url(${currentImage})` : "none",
        backgroundColor: imageLoading ? "#1c1c1e" : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.3s ease-in-out",
        padding: 12,
      }}
    >
      <FloatingBall offset={{ top: "10px", right: "1px" }} draggable={false} adsorb={false}>
        <svg viewBox="0 0 1024 1024" width="32" height="32">
          <path d="M186.0352 378.7776c-73.7536 0-133.76 60.0064-133.76 133.76s60.0064 133.76 133.76 133.76 133.76-60.0064 133.76-133.76S259.7888 378.7776 186.0352 378.7776zM268.8768 512.5376c0 45.696-37.1712 82.8672-82.8416 82.8672S103.168 558.208 103.168 512.5376s37.1712-82.8416 82.8672-82.8416S268.8768 466.8416 268.8768 512.5376zM509.7472 378.7776c-73.7536 0-133.76 60.0064-133.76 133.76s60.0064 133.76 133.76 133.76 133.76-60.0064 133.76-133.76S583.5008 378.7776 509.7472 378.7776zM592.5888 512.5376c0 45.696-37.1712 82.8672-82.8672 82.8672s-82.8416-37.1712-82.8416-82.8672 37.1712-82.8416 82.8416-82.8416S592.5888 466.8416 592.5888 512.5376zM839.04 378.7776c-73.7536 0-133.76 60.0064-133.76 133.76s60.0064 133.76 133.76 133.76c73.7536 0 133.76-60.0064 133.76-133.76S912.7936 378.7776 839.04 378.7776zM921.8816 512.5376c0 45.696-37.1712 82.8672-82.8416 82.8672s-82.8672-37.1712-82.8672-82.8672 37.1712-82.8416 82.8672-82.8416S921.8816 466.8416 921.8816 512.5376z" fill="#e6e6e6"></path>
        </svg>
      </FloatingBall>

      <FloatingBall offset={{ top: "10px", right: "40px" }} draggable={false} adsorb={false}>
        <svg viewBox="0 0 1024 1024" width="32" height="32">
          <path d="M920.32 841.813333l-172.373333-172.373333a365.781333 365.781333 0 0 0 71.253333-217.173333c0-202.24-164.693333-366.933333-366.933333-366.933334S85.333333 250.026667 85.333333 452.266667s164.693333 366.933333 366.933334 366.933333c81.066667 0 156.16-26.453333 217.173333-71.253333l172.373333 172.373333c10.666667 10.666667 25.173333 16.213333 39.253334 16.213333a55.381333 55.381333 0 0 0 39.253333-94.72zM175.786667 452.266667c0-152.746667 124.16-276.906667 276.906666-276.906667s276.906667 124.16 276.906667 276.906667-124.16 276.906667-276.906667 276.906666-276.906667-124.16-276.906666-276.906666z" fill="#e6e6e6"></path>
        </svg>
      </FloatingBall>

      <div style={{ height: 12 }} />
      <Swiper ref={swiperRef} onChange={handleChange} indicator={false} stuckAtBoundary defaultIndex={0}>
        {aiRoleList.map((item) => (
          <Swiper.Item key={item.id}>
            <div style={{ height: 16 }} />
            <ChatArea
              id={item.id}
              prompt={item.prompt}
              placeholder={item.placeholder}
              backgroundImage={item.imageUrl}
            />
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
}



