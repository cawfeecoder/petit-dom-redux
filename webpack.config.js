
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  context: __dirname + '/src',
    entry: {
      app: [
        './index.jsx'
      ]
    },
    output: {
        publicPath: '/',
        path: __dirname,
        filename: './dist/assets/js/[name].bundle.min.js'
    },
    resolve : {
        modules: [
          path.resolve(__dirname + '/src'),
          path.resolve(__dirname + '/node_modules')
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.styl', '.rt'],
    },
 module: {
        rules: [
            { test: /\.(ts|tsx)$/,
              exclude: '/node_modules|vue\/src/',
              use: ['babel-loader', 'awesome-typescript-loader'],
            },
            { test: /\.(js|jsx)$/,
              use: ['babel-loader'],
              exclude: '/node_modules/'
            },
            { test: /\.(css)$/,
              use: ['style-loader', 'css-loader?module'],
              exclude: '/node_modules/'
            },
            {
              test: /\.styl$/,
              use: ['style-loader', 'css-loader?module&camelCase=dashes', 'stylus-loader'],
              exclude: /node_modules/
            },
            {
              test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
              use: 'file-loader?public/fonts/[name].[ext]'
            },
            {
              test: /\.svg$/,
              use: ['svg-inline-loader'],
              exclude: '/node_modules/'
            }
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'node-static',
        filename: './dist/assets/js/node-static.min.js',
        minChunks(module, count) {
          var context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      //new UglifyJSPlugin(),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        minChunks: Infinity,
        threshold: 2560,
        minRatio: 0.8
      }),
      //new BundleAnalyzerPlugin({
        //analyzerMode: 'static'
      //})
    ],
    devtool: 'source-map'
}