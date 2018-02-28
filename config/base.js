'use strict';
let path = require('path');
let defaultSettings = require('./default');


module.exports = {
    entry: {
         vendor:['vue','vue-router','jquery']
        ,main:path.resolve(defaultSettings.srcPath , 'main.js')
    }
    ,output: {
        // path: __dirname + '/build'
        path: path.resolve(defaultSettings.buildPath , 'static')
        ,publicPath: defaultSettings.publicPath
        ,filename: '[name].[hash:8].js'
        ,chunkFilename: "[name].[hash:8].js"
    },
    resolve: {
        extensions: ['.js', '.jsx' ,'vue'],
        alias: {
            'vue': path.resolve(defaultSettings.rootPath,'node_modules/vue/dist/vue.min.js')
            ,'vue-router': path.resolve(defaultSettings.rootPath,'node_modules/vue-router/dist/vue-router.min.js')
            ,'jquery': path.resolve(defaultSettings.rootPath,'node_modules/jquery/dist/jquery.min.js')
            ,'Components': path.resolve(defaultSettings.srcPath, 'components/')
            ,'Filters': path.resolve(defaultSettings.srcPath, 'filters/')
            ,'Pages': path.resolve(defaultSettings.srcPath, 'pages/')
            ,'Plugins': path.resolve(defaultSettings.srcPath, 'plugins/')
            ,'Services': path.resolve(defaultSettings.srcPath, 'services/')
            ,'Sources': path.resolve(defaultSettings.srcPath, 'sources/')
            ,'Styles': path.resolve(defaultSettings.srcPath, 'styles/')
            ,'Utils': path.resolve(defaultSettings.srcPath, 'utils/')
            ,'Stores': path.resolve(defaultSettings.srcPath, 'stores/')
            ,'Directives': path.resolve(defaultSettings.srcPath, 'directives/')
            ,'Root': defaultSettings.srcPath
        }
    },
    module: {}
};
