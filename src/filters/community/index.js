export function timeFormat (value) {
    if (!value) {
        return '';
    }
    const time = new Date(value.replace(/-/g, '/')).valueOf();
    const passhours = (new Date().valueOf() - time) / 1000 / 60 / 60;
    if (passhours > 72) {
        return value.substring(0, 10);
    } else if (passhours >= 24 && passhours <= 72) {
        return `${parseInt(passhours / 24)} 天前`;
    } else if (passhours > 1 && passhours < 24) {
        return `${parseInt(passhours)} 小时前`;
    } else if (parseInt(passhours * 60)) {
        return `${parseInt(passhours * 60)} 分钟前`;
    } else {
        return '刚刚';
    }
}

export function numberFormat (value) {
    var str = value;
    value = parseInt(value);
    if (value >= 10000) {
        const pre = parseInt(value / 10000);
        const sub = parseInt(value % 10000 / 1000);
        str = sub === 0 ? `${pre}w` : `${pre}.${sub}w`;
    } else if (value > 1000) {
        const pre = parseInt(value / 1000);
        const sub = parseInt(value % 1000 / 100);
        str = sub === 0 ? `${pre}k` : `${pre}.${sub}k`;
    }
    return str;
}
//  去除所有html标签
export function simpleRichtxt (value) {
    let val = value.replace(/<[^>]+>/g, '');
    val = val.replace(/&nbsp;/ig, '');
    val = val.trim();
    return val;
}
