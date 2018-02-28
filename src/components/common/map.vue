<template>
    <div id="qqmap"></div>
</template>
<script>
     let map = {};
     let marker = {};
     function init(data = [39,116]) {
        const myLatlng = new qq.maps.LatLng(...data);
        const myOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: qq.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                // 设置控件的地图类型ID，ROADMAP显示普通街道地图，SATELLITE显示卫星图像，HYBRID显示卫星图像上的主要街道透明层
                mapTypeIds: [
                    qq.maps.MapTypeId.ROADMAP,
                ],
            },
            noClear : true
        };
        map = new qq.maps.Map(document.getElementById('qqmap'), myOptions);
        marker = new qq.maps.Marker({
            // 设置Marker的位置坐标
            position: new qq.maps.LatLng(...data),
            // 设置显示Marker的地图
            map: map
         });
    };
    window.initVideo = init;
    export default {
        props : {
            location : {
                type : Array,
                require : true
            }
        },
        watch : {
            location (val) {
                const point = new qq.maps.LatLng(...val);
                map.panTo(point);
                marker.setPosition(point);
            }
        },
        beforeMount() {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `http://map.qq.com/api/js?v=2.exp&callback=initVideo`;
            document.body.appendChild(script);
        }
    }
</script>