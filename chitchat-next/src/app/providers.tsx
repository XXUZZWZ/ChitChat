"use client";
import { ConfigProvider } from "react-vant";
import "react-vant/lib/index.css";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 动态加载，避免 SSR 阶段引用 window
    import("lib-flexible").catch(() => {});
  }, []);
  return (
    <ConfigProvider
      themeVars={{
        rateIconFullColor: "#ffd21e",
        sliderBarHeight: "4px",
        sliderButtonWidth: "20px",
        sliderButtonHeight: "20px",
        sliderActiveBackgroundColor: "#4fc3f7",
        buttonPrimaryBorderColor: "#4fc3f7",
        buttonPrimaryBackgroundColor: "#4fc3f7",
        buttonDefaultColor: "#ffffff",
        buttonDefaultBorderColor: "#3a3a3c",
        buttonDefaultBackgroundColor: "#2c2c2e",
        tabbarBackgroundColor: "rgba(28, 28, 30, 0.95)",
        tabbarItemActiveColor: "#4fc3f7",
        tabbarItemInactiveColor: "#8e8e93",
        tabbarActiveColor: "#4fc3f7",
        tabbarInactiveColor: "#8e8e93",
        tabbarTextColor: "#8e8e93",
        tabbarItemActiveBackgroundColor: "transparent",
        tabbarItemInactiveBackgroundColor: "transparent",
        searchBackgroundColor: "#2c2c2e",
        searchPlaceholderColor: "#ffffff",
        searchTextColor: "#ffffff",
        searchContentBackgroundColor: "#2c2c2e",
        inputTextColor: "#ffffff",
        primaryColor: "#4fc3f7",
        successColor: "#34c759",
        warningColor: "#ff9f0a",
        dangerColor: "#ff453a",
        backgroundColor: "#000000",
        backgroundColor2: "#1c1c1e",
        borderColor: "#3a3a3c",
      }}
    >
      {children}
    </ConfigProvider>
  );
}


