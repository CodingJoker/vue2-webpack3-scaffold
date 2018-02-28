// 分享字数限制
// 统一使用分享字数限制，保证输出统一，防止产品修改字数要求后小一方遗漏
export const shareTextLimit = ({
    title,
    desc
}, titleLimit = 20, descLimit = 50) => {
    return {
        title : title.slice(0, titleLimit),
        desc : desc.slice(0, descLimit)
    }
};

// ios scrll top fixed
export const scrollTop = (el) => {
    el = typeof el === 'object' ? el : document.querySelector(el);
    if (!el) {
        return;
    }
    const offset = el.scrollTop;
    if (offset === 0) { return; }
    el.style.overflow = 'hidden'; // stops momentum scrolling
    const stepSize = offset / (offset < 1000 ? 15 : 30);
    const _animate = function () {
        el.scrollTop -= stepSize;

        if (el.scrollTop > 0) { // keep scrolling up
            setTimeout(_animate, 10);
        } else { // enough
            _onFinish();
        }
    };
    const _onFinish = function () {
        el.scrollTop = 0;
        el.style.overflow = null;
    };
    _animate();
};

// 解决低端android location.reload不刷新问题
export const updateUrl = (url, key) => {
    // 默认是"t"
    key = `${(key || 't')}=`;
    // 正则：t=1472286066028
    const reg = new RegExp(`${key}\\d+`);
    const timestamp = +new Date();
    if (url.indexOf(key) > -1) {
        // 有时间戳，直接更新
        console.log()
        return url.replace(reg, `${key}${timestamp}`);
    } else {
        // 没有时间戳，加上时间戳
        if (url.indexOf('\?') > -1) {
            const urlArr = url.split('\?');
            if (urlArr[1]) {
                return `${urlArr[0]}?${key}${timestamp}&${urlArr[1]}`;
            } else {
                return `${urlArr[0]}?${key}${timestamp}`;
            }
        } else {
            // if (url.indexOf('#') > -1) {
            //     return `${url.split('#')[0]}?${key}${timestamp}${location.hash}`;
            // } else {
            //     return `${url}?${key}${timestamp}`;
            // }
            return `${url}?${key}${timestamp}`;
        }
    }
};

export const filterHTML = (str) => {
    if (!str) {
        return str;
    }
    str = str.replace(/<\/?[^>]+>/g, ''); // 去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); // 去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); // 去除多余空行
    str = str.replace(/&nbsp;/g, ''); // 去掉&nbsp;
    return str;
};
