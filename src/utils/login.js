// import {
//     setSessionStore,
//     removeSessionStore
// } from 'Utils/session-storage';
import ls from 'Utils/localstorage-store';
import store from 'Stores';
import { RESET_LOGIN } from 'Stores/mutation-types';
export const login = ({
    from,
    action
}) => {
    // 跳转到登录接口
    ls.set('loginFromUrl', from);
    ls.set('action', action);
    // if (location.host === 'h5.com') {
    //     location.href = 'http://h5.com/auth/mobile/login';
    // } else {
    //     location.href = '/auth/mobile/login';
    // }
};

export const resetLogin = () => {
    store.commit(RESET_LOGIN);
};
