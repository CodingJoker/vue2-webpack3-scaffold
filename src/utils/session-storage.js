
/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
    if (!name) return;
    let value = {};
    if (typeof content !== 'string') {
        value = {
            type : 'Object',
            value : content
        };
    } else {
        value = {
            type : 'String',
            value : content
        }
    }
    window.sessionStorage.setItem(name, JSON.stringify(value));
};

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
    if (!name) return;
    const obj = JSON.parse(window.sessionStorage.getItem(name));
    return obj ? obj.value : null;
};
/**
 * 获取sessionStorag后删除相应的键值对
 */
export const getOnceSessionStore = name => {
    const obj = getSessionStore(name);
    removeSessionStore(name);
    return obj;
};

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
};
