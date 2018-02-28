document.body.ontouchmove = function (e) {
    e.preventDefault();
};
// let startX = 0;
let startY = 0;
function touchStartFunc (evt) {
    try {
        const touch = evt.touches[0];
        // let x = Number(touch.pageX);
        const y = Number(touch.pageY);
        // startX = x;
        startY = y;
    } catch (e) {
        console.error(`touchStartFunc: ${e.message}`);
    }
}
document.addEventListener('touchstart', touchStartFunc, false);
const _ss = document.body;
_ss.ontouchmove = function (ev) {
    const _point = ev.touches[0];
    const _top = _ss.scrollTop;
    const _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
    if (_top === 0) {
        if (_point.clientY > startY) {
            ev.cancelable && ev.preventDefault();
        } else {
            ev.stopPropagation();
        }
    } else if (_top === _bottomFaVal) {
        console.log('到底了！');
    } else if (_top > 0 && _top < _bottomFaVal) {
        ev.stopPropagation();
    } else {
        ev.cancelable && ev.preventDefault();
    }
};
