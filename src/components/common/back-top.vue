<template>
    <v-touch class="home-scrollTop"  @tap="backtoTop" v-show="isShow">
        <i class="home-arr"></i>
        <p class="scroll-txt">回到顶部</p>
    </v-touch>
</template>
<style lang="scss" scoped>
    @import '~Styles/community/common/scroll_top.scss';
</style>
<script>
    export default {
        data () {
            return {
                isShow: false
            }
        },
        methods:{
            backtoTop(e) {
                $('body').animate({
                    scrollTop : '0px'
                }, 600);
            }
        },
        mounted () {
            let that = this;
            let timer;
            $(document).scroll(function(){
                if (timer) {
                    clearTimeout(timer);
                }
                that.isShow = false;
                timer = setTimeout(() => {
                    if (document.body.scrollTop > window.innerHeight - 200){
                        that.isShow = true;
                    }
                }, 150);
            });
        }
    }
</script>