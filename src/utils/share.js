import { filterHTML } from 'Utils/common';
let data = {};
function onBridgeReady () {
    // 转发朋友圈
    window.WeixinJSBridge.on('menu:share:timeline', (e) => {
        window.WeixinJSBridge.invoke('shareTimeline', data, (res) => {
            data.cb();
        });
    });
    // 分享给朋友
    window.WeixinJSBridge.on('menu:share:appmessage', (argv) => {
        window.WeixinJSBridge.invoke('sendAppMessage', data, (res) => {
            data.cb();
        });
    });
}

export default function (config) {
    data = {
        'img_url' : 'http://gad.qpic.cn/assets/m/img/global/ico_share_gad_w.png',
        'img_width' : 1000,
        'img_height' : 1000,
        'link' : window.location.href,
        // desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
        'desc' : '这里设置分享描述',
        'title' : '这里设置title',
        'cb' : function () {}
    };

    // 不使用Object.assign(data, config)的原因是防止传入 { title : ''} 空值覆盖原值
    if (config) {
        if (config.title) {
            data.title = filterHTML(config.title);
        }
        if (config.desc) {
            data.desc = filterHTML(config.desc);
        }
        if (config.cb) {
            data.cb = config.cb;
        }
        if (config.img_url) {
            // 防止编译失败才这样写
            data['img_url'] = config['img_url'];
        }
        if (config.link) {
            data.link = config.link;
        }
    }

    try {
        if (typeof window.WeixinJSBridge === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
            onBridgeReady();
        } else {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }
    } catch (e) {
        console.err(e);
    }
}
