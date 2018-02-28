<template>
    <h1>This is homepage, now you can start your coding</h1>
</template>
<style lang="scss" scoped="">
</style>
<script>
    import {mapState,mapMutations} from 'vuex';
    import {getSomeThings} from 'Services/getData';

    export default {
        data () {
            return {
                something : []
            }
        },
        computed:{
            ...mapState({
                isLogin : state => state.status.login
            })
        },
        beforeMount(){
            // 获取跳转之前的操作
            // const action = ls.getOnce('action');
            //  hasTomyAction  = action&& action.name === ACTION_TOMY;
        },
        activated() {
            // 这个hook在router.js中路由的keepalive:true才需要使用
            this.$share({
                title : '适用于keepalive路由的title',
                desc : '适用于keepalive路由的desc'
            });
        },
        methods:{
            async getSomethings() {
                let res = await getSomeThings();
            }
        }
    }
</script>