<template>
    <div class="m-dlmore" :class="wrapClass">
        <a class="dlmore-btn" v-if="moreText" @click="getList">{{moreText}}</a>
        <span class="gico-loading loading-20" v-show="loading">加载中</span>
        <span  class="dlmore-nomore" v-show="!hasMore">没有更多消息</span>
    </div>
</template>
<script>
    export default {
        props : {
            loading : {
                type : Boolean,
                default : () => false
            },
            hasMore : {
                type : Boolean,
                default : () => false
            },
            moreText: {
                type: String,
                default : () => ''
            }
        },
        computed: {
            wrapClass () {
                return this.loading ? 'dl-loading' : (this.hasMore ? 'dl-goto' : 'dl-nomore');
            }
        },
        methods: {
            getList () {
                this.$emit('getList');
            }
        }
    }
</script>