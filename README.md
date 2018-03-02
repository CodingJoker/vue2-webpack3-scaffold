# GAD MOBILE


## HOW TO USE

拉取代码

    git clone https://github.com/CodingJoker/vue2-webpack3-scaffold.git

安装相应的工具
> [yarn](https://yarnpkg.com/zh-Hans/) 安装 , 不安装也可以进行下一步

安装项目依赖

    npm install webpack webpack-dev-server -g 或者 yarn global add webpack webpack-dev-server

    npm install 或者 yarn install

如果遇到node-gyp相关问题：

    添加python环境变量 - https://www.python.org/downloads/release/python-363/
    
运行任务

    开发环境: npm run dev
    本地构建: npm run build
    测试环境构建: npm run devbuild
    线上环境构建: npm run masterbuild

## 项目规范说明
- 代码规范请见 .eslintrc中的`rules`；
- [VueJs开发规范](doc/vuejs.md)
- 后台接口统一写在`serveices`文件下，不能写在组件或js中，使用时请引用services中的接口;
- 异步组件在router中请使用webpack3 ` 魔法注释 `
   ```
    component: () => import(/* webpackChunkName: "pages/index" */'Pages/index.vue')
   ```
- 编写公共函数需放在`utils`
    ```
    export function yourFunction(){}
    ```
- 三方插件请放在`plugins`中
    ```
    //如何引用及打包待补充
    ```


## 项目目录说明

```
.
├── build/                                        // 上线项目文件，放在服务器即可正常访问
│── config/                                       // 基本配置
│   ├── default.js                                // 默认配置
│   ├── base.js                                   // webpack基础配置
│   ├── dev.js                                    // webpack开发环境配置
│   └── dist.js                                   // webpack构建任务配置
├── app/                                          // 源码目录
│   ├── components/                               // 组件
│   │     ├── common/
│   │     ├── footer/
│   │     └── header/
│   ├── page/                                     // 页面
│   ├── plugins/                                  // 引用的插件
│   ├── utils/                                    // 编写的公共库
│   ├── sources/                                  // 资源文件 ,image,font,video,audio
│   ├── service/                                  // 数据交互统一调配
│   ├── stores/                                   // vuex的状态管理
│   ├── style/                                    // 样式目录
│   ├── App.vue                                   // 页面入口文件
│   └── main.js                                   // 程序入口文件，加载各种公共组件
├── favicon.ico                                   // 图标
├── index.html                                    // 入口html文件
├── router.js                                     // 路由
.

```

## 项目插件说明

        "vue": "^2.4.2",
        "vue-router": "^2.7.0"
        "axios": "^0.16.2"

> [axios](https://github.com/mzabriskie/axios) 介绍

扩展到Vue

```js
import axios from 'axios';
Vue.prototype.$http = axios;
````
## 测试环境登录
1. 从state获取登录状态
    ```
    computed : {
        ...mapState({
            isLogin : state => state.status.login
        })
    }
    ```
1. 未登录跳转到login路由
    ```
    // 需自己实现
    <!-- if (!this.isLogin) { -->
        <!-- this.$router.push('/login'); -->
    <!-- } -->
    ```
1. 用户信息存储在` state.userInfo `中
1. `复现登录之前的操作` （需自己实现）
    ```
     // 判断是否登录,并设置需要登录后进行操作的动作名，方便之后获取判断
         if (!this.isLogin) {
             this.$router.push({
                 path : '/login',
                 query : { name : 'doSomethingName'}
             });
         }
      // 可以在 `beforeMount` 或者 `monted` 钩子函数中判断路由中是否有actionName
           import ls from 'Utils/localstorage-store.js';
           const action = ls.getOnce('action');
           const hasTomyAction  = action && action.name === ACTION_TOMY;
           if (hasTomyAction) {
               // action中的存的对象为之前this.$router.push中的query值，可自定义
           }
    ```
    
## 设置文章标题
```
    // 可以通过router中配置meta信息来配置静态的title
    // in router.js
    meta : {
        title : '这里是GAD移动社区title'
    }

    //使用原型扩展方法$setTitle设置动态title
    Vue.prototype.$setTitle('这里是Gad移动社区title');
    // or 实例中
    this.$setTitle('这里是Gad移动社区title')；
```
## 微信分享
 ```
    // 已扩展到Vue.prototype上，可在实例中直接调用，eg:this.$share(config);
    // 是keep-alive路由的组件使用activated钩子函数
    activated() {
        this.$share({
            'title' : '分享title'
        })
    },
    // 不是keep-alive路由的组件使用mounted钩子函数
    // share函数参数,可以只传需要改变的键值对，默认值如下：
    {
        'img_url' : 'http://gad.qpic.cn/assets/m/img/global/ico_share_gad_b.png',
        'img_width' : '120',
        'img_height' : '120',
        'link' : window.location.href,
        // desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
        'desc' : '腾讯GAD游戏开发者平台，最专业的游戏人一站式服务平台',
        'title' : 'GAD社区',
        'cb' : function () {}
    };
 ```

## 公共组件说明
### 腾讯地图组件 (目前仅支持定位)
```
    import map from 'Components/common/map.vue';
    @params location
    @type array [3212.2 , 231.22323]
    <map :location="location"></map>
```

### 腾讯云web播放器 （直播录播和支持file.gad.qq.com中的MP4）
```
    import tcPlayer  =from 'Components/common/tcPlayer.vue';
    // config配置参见 https://cloud.tencent.com/document/product/454/7479
    <tc-player :config="config"></tc-player>
```

## 公共指令说明
### click-outside 指令 （点击绑定元素外触发回调）
```
    import clickOutside from 'Directives/common/clicl-outside';
    export default {
        ...,
        directives : {
            clickOutside
        }
    },
    methods : {
        yourCallBackFunc(){}
    },
    <div v-click-outside="yourCallBackFunc"></div>
```

### container-scroll 指令 （绑定容器可滚动，并且滚动到指定位置触发回调）
```
    // <div v-container-scroll="yourCallBackFunc" data-direction="top" data-distance="200">
    // data-direction  value: default bottom | top ，距离底部触发还是距离顶部触发
    // data-distance value : default 100  | int , 距离多少px触发
    import containerScroll from 'Directives/common/container-scroll';
    export default {
        ...,
        directives : {
            containerScroll
        }
    },
    methods : {
        yourCallBackFunc(){}
    },
    <div v-container-scroll="yourCallBackFunc"></div>
```

## Utils库说明
### localstorage-stroe.js 基于localstorage封装后的本地存储库
- 基于 [store.js](https://github.com/marcuswestin/store.js) 封装的本地存储库，可通过store.js提供的插件对其进行扩展，现阶段至扩展了过期（expire）插件。

```
// API
// Store current user
store.set('user', { name:'Marcus' })

// Get current user
store.get('user')

// Remove current user
store.remove('user')

// Clear all keys
store.clearAll()

// Loop over all stored values
store.each(function(value, key) {
	console.log(key, '==', value)
})
// 个人对其添加getOnce接口
store.getOnce('actionName');
```

### share.js
- 不经过微信鉴权的hack分享,已封装到Vue.prototype.$share上，可以直接使用

### login.js
-  用户登录操作的简单封装，具体看上面提到的 [测试环境登录](#测试环境登录)

## src 根目录js文件功能说明
### main.js
- 入口文件，不用赘述，其中有环境变量的设置

### router.js
- 路由文件, 若后续维护单个router文件过于复杂可以在page（页面目录）下创建关于该页面的路由，然后将其在router.js引入即可

### debug.js
- 用于移动端调试的console，只有在测试环境需要，任务已在config/dist.js中配置，其中有环境变量的设置

### online.js
- 只需要在生产环境使用的js文件，eg: 数据统计的MTA，其中有环境变量的设置

### _env.js
- 存放环境变量和环境变量有关的函数，环境变量挂在在window对象上

## Appcache 使用说明
- 使用 [app-cache-webpack-plugin](https://www.npmjs.com/package/appcache-webpack-plugin) 生成 `缓存清单文件`
- 暂无 offline.html , 所以没有配置离线状态
- 因为appcache是自动生成，所以要使用appcache缓存图片等资源，必须将图片放置在项目内进行打包构建。
- 帮助文档 ： [应用缓存初级使用指南](https://www.html5rocks.com/zh/tutorials/appcache/beginner/)  | [Automate AppCache offline support in your Webpack build](http://dev.topheman.com/automate-appcache-offline-support-in-your-webpack-build/)
- chrome debug : chrome://appcache-internals/

## 环境配置 使用说明
```
// 获取代码所处环境
import { GLOBAL_ENV_KEY } from 'Root/_env';
const env = window.GLOBAL_ENV_KEY
...
import { getEnvHostName } from 'Root/_env';
const host = getEnvHostName();
```
## 异步组件加载 使用说明
在开发中，请多使用异步组件构建，因为很多时候首屏是不需要加载那么多组件的，比如说点击按钮生成图片，只有当用户点击了才进行组件的加载。
```
// 贴一段代码
async saveImage() {
    const module = await import(/* webpackChunkName: "Utils/html2Img" */'Utils/html2Img');
    const html2Img = module.default;
    const base64ImgUrl = await html2Img('js-sharepage',{
        backgroundColor : '#fdb52b'
    });
    this.base64Img = base64ImgUrl;
}
```
通过魔法注释 `/* webpackChunkName: "xxx" */` 和 `async/await` 来进行异步组件的构建和加载。


