<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
        </keep-alive>
        <!-- 这里不会被keepalive -->
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </div>
</template>
<style lang="scss">
</style>
