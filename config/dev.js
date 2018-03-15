'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./default');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
let config = Object.assign({}, baseConfig, {
    devtool: 'eval-source-map',
    output: {
        // path: __dirname + '/build'
            publicPath: '/'
            ,filename: '[name].js'
            ,chunkFilename: "[name].js"
    },
    plugins: [
        // 暴露到全局，js文件可直接使用
        new webpack.ProvidePlugin({
            Vue: 'vue',
            VueRouter: 'vue-router',
            $: "jquery",
            jQuery: "jquery"
        }),
        new LodashModuleReplacementPlugin({
            shorthands : true
        }),
        new HtmlWebpackPlugin({
            filename:  'index.html',
            template: 'index.html',
            env: 'local',
            inject: true
        })
    ],
    module: defaultSettings.getDefaultModules(),
});

module.exports = config;
