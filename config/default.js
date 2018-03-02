const path = require('path');
const rootPath = path.join(__dirname, '../');
const srcPath = path.join(__dirname, '../src');
const buildPath = path.join(__dirname, '../build');
function getDefaultModules() {
    return {
        rules: [
            {
                test: /\.(js|vue)$/
                ,include: [srcPath]
                ,exclude: [
                    path.resolve(rootPath,'node_modules/'),
                    path.resolve(srcPath,'plugins/')
                ]
                ,use:[{
                    loader: 'babel-loader'
                    },{
                    loader:'eslint-loader'
                    }]
            },
            {
                test: /\.vue$/
                ,use: ["vue-loader"]
            },
            {
                test: /\.css$/
                ,exclude: /node_modules/
                ,use: ["vue-style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss/
                ,exclude: /node_modules/
                ,use: [{
                loader: "vue-style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            },{
                loader : "postcss-loader"
            },{
                loader: "sass-loader" // compiles Sass to CSS
            }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
                ,use: [{
                loader: "url-loader"
                ,options: {
                    limit: 6000
                    ,name: 'images/[name].[hash:7].[ext]'    // 将图片都放入images文件夹下，[hash:7]防缓存
                }
            }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
                ,use: [{
                loader: "url-loader",
                options: {
                    limit: 6000
                    ,name: 'fonts/[name].[hash:7].[ext]'    // 将字体放入fonts文件夹下
                }
            }]
            }

        ]
    };
}

module.exports = {
    rootPath:rootPath,
    srcPath: srcPath,
    buildPath:buildPath,
    debugJs: path.resolve(srcPath , 'debug.js'),
    onlineJs: path.resolve(srcPath , 'online.js'),
    publicPath: '//localhost/',
    getDefaultModules: getDefaultModules
};