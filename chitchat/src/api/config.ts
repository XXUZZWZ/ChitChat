import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.response.use((res) => res.data)
axios.interceptors.request.use((config) => {
  const  token = localStorage.getItem("token");
  // 如果有就说明有token，已登录。
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axios;