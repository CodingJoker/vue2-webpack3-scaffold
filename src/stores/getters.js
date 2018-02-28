import _ from 'lodash';
export default {
    getSomethings : (state, getters) => (id) => {
        return state.somethings[_.findIndex(state.somethings, 'id', id)];
    }
}
