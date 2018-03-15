'use strict';
const shell = require('shelljs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const defaultSettings = require('./default');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
//编译之前删除build文件夹
shell.rm('-rf' , defaultSettings.buildPath);

let config = {
    // devtool: 'sourcemap',
    plugins: [
        //如果你使用了一些有着很酷的依赖树的库，那么它可能存在一些文件是重复的。webpack可以找到这些文件并去重。
        // new webpack.optimize.DedupePlugin(),
        // 暴露到全局，js文件可直接使用
        new webpack.ProvidePlugin({
            Vue: 'vue',
            VueRouter: 'vue-router',
            $: "jquery",
            jQuery: "jquery"
        }),
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            chunks: ['main','vendor']
        }),
        // 缩小lodash的大小
        new LodashModuleReplacementPlugin({
            shorthands : true
        }),
        //打包html 添加入口script到index.html中
        new HtmlWebpackPlugin({
            filename:  path.join(defaultSettings.buildPath,'index.html'),
            template: 'index.html',
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true
            //         // more options:
            //         // https://github.com/kangax/html-minifier#options-quick-reference
            // },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            manifestPath : defaultSettings.publicPath
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),

        //合并策略插件
        // new webpack.optimize.AggressiveMergingPlugin(),
        // skip the emitting phase whenever there are errors while compiling. This ensures that no assets are emitted that include errors
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: defaultSettings.getDefaultModules()
};
// appcache 配置
config.plugins.push(new AppCachePlugin({
    network: [
        '*'
    ],
    settings: ['prefer-online'],
    output: 'gad_mobile_manifest.appcache',
    exclude: [
        /.*\.map$/,
        /index\.html$/
    ]
}));
module.exports = function (env) {
    // 判断是否是在测试环境中
    config = Object.assign({}, baseConfig, config);
    if(!env || (env && !env.SERVERSIDE)) {
        //打包文件大小分析插件 本地开启,服务端关闭
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 2333,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        }));

    } else if (env.SERVERSIDE == 'dev') {
        // 测试环境
        config.entry.debug = defaultSettings.debugJs;
    } else if (env.SERVERSIDE == 'master') {
        // 线上环境
        config.entry.online = defaultSettings.onlineJs;
        config.plugins.push(new UglifyJsPlugin({
            uglifyOptions: {
                output :{
                    comments : false
                },
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        }));

    }
    return config;
};

