import store from 'store';
import expire from 'store/plugins/expire';
const plugins = [expire];
const ls = window.localStorage;
const storage = {
    name : 'gadStorage',
    read : (key) => ls.getItem(key),
    write : (key, value) => ls.setItem(key, value),
    remove : (key) => ls.removeItem(key),
    clearAll : () => ls.clear()
};
const lsStore = store.createStore(storage, plugins);
lsStore.getOnce = (key) => {
    const value = lsStore.get(key);
    lsStore.remove(key);
    return value;
};
export default lsStore;
