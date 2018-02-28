import 'babel-polyfill';
import App from './app.vue';
import router from './router';
import store from 'Stores';
import axios from 'Services/http';
import 'Utils/fontsize-adapt';
import 'Utils/forbid-body-scroll-over-top';
import VueTouch from 'vue-touch';
import share from 'Utils/share';
import { GLOBAL_ENV_KEY, GLOBAL_ENV_LOCAL, getEnvHostName } from './_env';

// 设置环境变量
window[GLOBAL_ENV_KEY] = GLOBAL_ENV_LOCAL;
// 开启调试面板
Vue.config.devtools = true;
Vue.prototype.$http = axios;
// 分享
Vue.prototype.$share = function (shareMsg) {
    const _shareMsg = shareMsg;
    if (shareMsg && !shareMsg.link && this.$route) {
        // 手动拼接微信分享链接修复wechat在低android中使用location.href链接不变bug
        _shareMsg.link = `http://${getEnvHostName()}/#${this.$route.fullPath}`;
    }
    share(_shareMsg);
};
Vue.prototype.$share();
// 设置title
Vue.prototype.$setTitle = _ => { document.title = _ };
Vue.use(VueTouch, {
    name : 'v-touch'
});
new Vue({
    el : '#app',
    axios,
    router,
    store,
    render : h => h(App)
});
