export const DateFormat = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
    // const date = new Date();
    // console.log(DateFormat(new Date(), "yyyy年MM月dd日 hh:mm:ss.S")); // 输出: 2016年04月01日 10:41:08.133
    // console.log(DateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")); // 输出: 2016-04-01 10:41:08
    // console.log(DateFormat(new Date(), "yy-MM-dd hh:mm:ss")); // 输出: 16-04-01 10:41:08
    // console.log(DateFormat(new Date(), "yy-M-d hh:mm:ss")); // 输出: 16-4-1 10:41:08
    const o = {
        'y+' : date.getFullYear(),
        'M+' : date.getMonth() + 1,
        'd+' : date.getDate(),
        'h+' : date.getHours(),
        'm+' : date.getMinutes(),
        's+' : date.getSeconds(),
        // 季度
        'q+' : Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        'S+' : date.getMilliseconds()
    };
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            if (k === 'y+') {
                fmt = fmt.replace(RegExp.$1, (`${o[k]}`).substr(4 - RegExp.$1.length));
            } else if (k === 'S+') {
                let lens = RegExp.$1.length;
                lens = lens === 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, (`00${o[k]}`).substr((`${o[k]}`).length - 1, lens));
            } else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
            }
        }
    }
    return fmt;
};
