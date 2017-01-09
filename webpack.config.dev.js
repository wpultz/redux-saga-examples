/**
 * Autogenerated Webpack development config, courtesty of wpultz/react-yo-generator
 */
var path = require('path');
var webpack = require('webpack');

// address the project's web server will be accessible at, typically http://localhost:8000 for django
var devServer = 'http://localhost:8000';
// address webpack-dev-server will be accessible at, typically http://localhost:8080 for local dev
var webpackServer = 'http://localhost:8080';
// address/path that js bundles will be accessible at
var publicPath = webpackServer + '/bundled/';
// directory that the bundles will be written to
var bundlePath = path.join(__dirname, 'dist', 'js');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            'webpack-dev-server/client?' + webpackServer,
            'webpack/hot/only-dev-server',
            './redux-saga-examples/app.js'
        ]
    },
    output: {
        path: bundlePath,
        filename: '[name].bundle.js',
        publicPath: publicPath
    },
    module: {
        loaders: [{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] }]
    },
    resolve: {
        alias: {
            react: 'react'
        },
        // so we can import things other than .js files with the extension
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: [
            'node_modules'
        ]
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': devServer,
            'Access-Control-Allow-Credentials': true
        }
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        new webpack.HotModuleReplacementPlugin()
    ]
};