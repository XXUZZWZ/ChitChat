import { create } from "zustand";
import { doLogin, checkLogin } from "../api/user";
import ChatHistoryUtil from "../utils/ChatHistoryUtil";
// 创建 store
export const useUserStore = create((set) => ({
  user: null, // 用户信息
  isLogin: false, // 是否登录
  Login: async ({ username = "", password = "" }) => {
    const res = await doLogin({ username, password });
    
    const { token, data: user } = res.data;
    
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
  CheckLogin: async() => {
    const response = await checkLogin();
    if (response.code === 0) {
      set({
        isLogin: true,
      });
    }
  },
}));
