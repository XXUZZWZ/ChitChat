import { create } from "zustand";
import { doLogin, checkLogin } from "../api/user";
import ChatHistoryUtil from "../utils/ChatHistoryUtil";

// 定义store的类型
interface UserStore {
  user: any;
  isLogin: boolean;
  Login: (credentials: { username?: string; password?: string }) => Promise<void>;
  Logout: () => void;
  CheckLogin: () => Promise<void>;
  InitializeAuth: () => Promise<void>;
}

// 检查初始登录状态
const checkInitialLoginStatus = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await checkLogin();
      // 假设成功响应包含用户信息，失败时会抛出错误
      return !!response;
    } catch (error) {
      // token无效，清除它
      localStorage.removeItem('token');
      return false;
    }
  }
  return false;
};

// 创建 store
export const useUserStore = create<UserStore>((set) => ({
  user: null, // 用户信息
  isLogin: !!localStorage.getItem('token'), // 初始根据token存在与否设置登录状态
  Login: async ({ username = "", password = "" }) => {
    const res = await doLogin({ username, password });

    const { token, data: user } = res as { token: string; data: any }; // 直接从res解构，因为axios拦截器已经返回了res.data

    console.log("user", user, "token", token);
    localStorage.setItem("token", token);
    set({
      user,
      isLogin: true,
    });
  },
  Logout: () => {
    localStorage.removeItem("token");
    ChatHistoryUtil.clearAllChatHistory();
    set({
      user: null,
      isLogin: false,
    });
  },
  CheckLogin: async () => {
    try {
      const response = await checkLogin();
      // 如果请求成功，说明token有效
      set({
        isLogin: !!response,
      });
    } catch (error) {
      // token无效
      set({
        isLogin: false,
      });
    }
  },
  // 初始化时检查登录状态
  InitializeAuth: async () => {
    const isValidLogin = await checkInitialLoginStatus();
    set({
      isLogin: isValidLogin,
    });
  },
}));
