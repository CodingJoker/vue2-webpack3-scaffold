// 拦截器和axios相关配置
import axios from 'axios';
// import { resetLogin } from 'Utils/login.js';
// import router from '../router.js'
// 设置头部信息
axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
// 设置Respnose拦截器
axios.interceptors.response.use((res) => {
    // 在这里对返回的数据进行处理
    return res;
}, (err) => {
    console.log(err);
    // if (err.response) {
    //     switch (err.response.status) {
    //     case 401:
    //         // 返回 401 清除token信息并跳转到登录页面
    //         resetLogin();
    //         router.push({
    //             path : '/login'
    //         })
    //     }
    // }
    // 返回接口返回的错误信息
    return Promise.reject(err.response.data);
});
export default axios;
