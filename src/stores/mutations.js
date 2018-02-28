import {
    SAVE_USERINFO,
    RESET_LOGIN
} from './mutation-types.js';
// import _ from 'lodash';
// import { setSessionStore } from 'Utils/session-storage.js';
import ls from 'Utils/localstorage-store';
export default {
    // 保存用户信息
    [SAVE_USERINFO] (state, userInfo) {
        state.userInfo = userInfo;
        // 过期时间 一周
        const expireTime = new Date().getTime() + 1000 * 3600 * 24 * 7;
        ls.set('userInfo', userInfo, expireTime);
        state.status.login = true;
        ls.set('isLogin', true, expireTime);
    },
    [RESET_LOGIN] (state) {
        state.status.login = false;
        ls.remove('isLogin');
        state.userInfo = {};
        ls.remove('userInfo');
    }
}

