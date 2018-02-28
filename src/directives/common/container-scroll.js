export default {
    // 当绑定元素插入到 DOM 中。
    // <div v-container-scroll="yourCallBackFunc" data-direction="top" data-distance="200">
    // data-direction  value: default bottom | top ，距离底部触发还是距离顶部触发
    // data-distance value : default 100  | int , 距离多少px触发
    bind (elm, binding, vnode) {
        const el = $(elm);
        const direction = elm.dataset ? (elm.dataset.direction ? elm.dataset.direction : 'bottom') : 'bottom';
        const distance = elm.dataset ? (elm.dataset.distance ? elm.dataset.distance : 100) : 100;
        let beforeScroll = el[0].scrollTop;
        el.scroll((e) => {
            if (direction === 'top') {
                // 向上滑动
                if (el[0].scrollTop < beforeScroll && el[0].scrollTop <= distance) {
                    vnode.context[binding.expression]();
                }
            } else {
                if (beforeScroll < el[0].scrollTop && el[0].scrollTop + el[0].offsetHeight + distance >= el[0].scrollHeight) {
                    vnode.context[binding.expression]();
                }
            }
            beforeScroll = el[0].scrollTop;
        });
    }
};
