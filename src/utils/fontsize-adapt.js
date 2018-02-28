(function (doc, win) {
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const recalc = function () {
        const r = doc.documentElement;
        const a = r.getBoundingClientRect().width;
        if (a >= 562.5) {
            r.style.fontSize = '15px';
        } else if (a <= 320) {
            r.style.fontSize = '8.53px';
        } else {
            r.style.fontSize = `${a / 37.5}px`;
        }
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
