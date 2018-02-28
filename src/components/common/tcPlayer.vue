<template>
    <div id="tcPlayer" style="width:100%; height:auto;"></div>
</template>
<script>
    import { TcPlayer } from 'Plugins/qcloud/video/vcplayer/tcPlayer-2.2.0.js';
    function getParams(name) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
    const rtmp = getParams('rtmp'),
        flv  = getParams('flv'),
        m3u8 = getParams('m3u8'),
        mp4  = getParams('mp4'),
        live = getParams('live'),
        coverpic = getParams('coverpic'),
        width = getParams('width'),
        height = getParams('height'),
        autoplay = getParams('autoplay');
    let options = {
        rtmp: rtmp,
        flv: flv ,
        coverpic: coverpic || {style:'cover', src:'//vodplayerinfo-10005041.file.myqcloud.com/3035579109/vod_paster_pause/paster_pause1469013308.jpg'},
        autoplay: true ,
        live: live,
        width : width || '480',
        height : height || '320'
    };
    export default {
        props : {
            // https://cloud.tencent.com/document/product/454/7479 config 参见video说明文档
            config : {
                type : Object,
                require :true,
            }
        },
        data() {
            return {
                player : {}
            }
        },
        mounted(){
            this.player = new TcPlayer('tcPlayer', Object.assign(options, this.config));
        },
        watch : {
            config(val) {
                if (this.player && this.player.el) {
                    this.player.el.parentNode.removeChild(this.player.el);
                }
                this.player = new TcPlayer('tcPlayer', Object.assign(options, val));
            }
        }
    }
</script>