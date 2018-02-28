// import store from 'Stores';
// import { login } from 'Utils/login';
// import ls from 'Utils/localstorage-store';
Vue.use(VueRouter);
const routes = [
    {
        path : '/',
        redirect : '/index'
    },
    {
        path : '/index',
        component : () => import(/* webpackChunkName: "pages/index" */'Pages/index.vue'),
        meta : {
            // 需要状态保持才添加
            keepAlive : true,
            // 是否需要登录鉴权
            auth : false
        }
    },
    // {
    //     path : '/login',
    //     name : 'login'
    // },
    {
        path : '/404',
        component : () => import(/* webpackChunkName: "pages/error" */'Pages/error.vue')
    }
];
const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    // 路由跳转之前重置操作
    Vue.prototype.$share();
    if (to.meta && to.meta.title) {
        Vue.prototype.$setTitle(to.meta.title);
    }
    // 登录逻辑需要自己根据系统情况编写
    // if (store.state.status.login) {
    //     // 如果已经登录
    //     return next();
    // }
    // if (to.meta && to.meta.auth) {
    //     // 未登录需要鉴权的路由 跳转到后台接口，然后后台重定向到login
    //     login({
    //         from : to.path
    //     });
    // } else {
    //     //  未登录不需要鉴权的路由
    //     if (to.name !== 'login') {
    //         next();
    //     } else {
    //         if (from.path !== '/') {
    //             login({
    //                 from : from.path,
    //                 action : to.query
    //             });
    //             // login() 重定向了， 这里就不用调用next();
    //         } else {
    //             store.dispatch({
    //                 type : 'getUserInfo'
    //             }).then((res) => {
    //                 // const fromUrl = getSessionStore('loginFromUrl');
    //                 const fromUrl = ls.get('loginFromUrl');
    //                 if (fromUrl !== null && fromUrl !== '' && fromUrl !== '/login') {
    //                     ls.remove('loginFromUrl');
    //                     next({
    //                         path : fromUrl
    //                     });
    //                 } else {
    //                     next('/');
    //                 }
    //             });
    //         }
    //     }
    // }
    return next();
});
export default router;
