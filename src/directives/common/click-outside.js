// usage : <div v-click-outside="YourCallBack">
function stopProp (event) {
    event.stopPropagation();
}

function callBackFn (el, binding, vnode) {
    return vnode.context[binding.expression];
}
let callBack;
export default {
    bind (el, binding, vnode) {
        el.addEventListener('click', stopProp);
        callBack = callBackFn(el, binding, vnode);
        document.body.addEventListener('click', callBack);
    },
    unbind () {
        this.el.removeEventListener('click', stopProp);
        document.body.removeEventListener('click', callBack);
    }
};
