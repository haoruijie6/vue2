import axios from "axios";

// 创建axios实例
const instance = axios.create({
    baseURL: "http://localhost:18888/",
    // 设置相应的时间
    timeout: 20000,
});

// 请求拦截器
instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 响应式拦截器
instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
