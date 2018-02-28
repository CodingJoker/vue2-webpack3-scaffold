import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
// import { getSessionStore } from 'Utils/session-storage.js';
import ls from 'Utils/localstorage-store';
Vue.use(Vuex);

const state = {
    userInfo : ls.get('userInfo') ? ls.get('userInfo') : {},
    // 活动
    somethings : [],
    status : {
        // 状态记录写在这里
        login : !!ls.get('isLogin')
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
