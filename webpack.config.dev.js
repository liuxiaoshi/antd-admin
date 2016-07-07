var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var NODE_MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');

module.exports = {
  devtool: 'inline-source-map',
  debug: true,
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/app/index.js'
  ],
  output: {
    path: BUILD_PATH,
    publicPath: "http://localhost:3000/",
    filename: 'assets/js/main.[hash].js',
    chunkFilename: 'assets/js/[id].main.[hash].js',
    vendors: ['antd', 'echarts', 'react', 'react-dom', 'react-router', 'react-router-redux', 'redux', 'react-redux', 'redux-thunk', 'history', 'immutable', 'jquery']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("assets/css/styles.[hash].css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'index.html', //生成的html存放路径，相对于 path
      template: 'src/www/views/index.html' //html模板路径
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    // 第三方库存放的地方
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.[hash].js',
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.less', '.css'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [{
      test: /\.js|.jsx$/,
      loaders: ['react-hot', 'babel'],
      include: SRC_PATH,
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.scss$/,
      loader: "style!css!sass"
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=assets/fonts/[name].[ext]'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader?name=assets/fonts/[name].[ext]"
    }, {
      test: /\.(jpg|png)$/,
      loader: "url?limit=8192&name=assets/images/[name].[ext]"
    }]
  },
  devServer: {
    contentBase: './dist/',
    devtool: 'eval',
    hot: true, //Live-reload
    inline: true,
    port: 3000, //Port Number
    host: 'localhost', //Change to '0.0.0.0' for external facing server
  }
};