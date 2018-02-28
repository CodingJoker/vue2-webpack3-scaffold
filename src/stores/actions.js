import { UserInfo } from 'Services/getData';
import { SAVE_USERINFO } from 'Stores/mutation-types';
export default {
    async getUserInfo ({
        commit,
        state
    }) {
        const res = await UserInfo();
        if (res.status === 200 && res.data) {
            commit(SAVE_USERINFO, res.data);
        }
        return res;
    }
};
