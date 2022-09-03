const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx", ".ts"]
                },
                use: {
                    loader: "babel-loader"
                }
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.wav$/,
                loader: 'file-loader'
            },
            // {test: /\.(png|svg|jpg)$/, loader: 'url-loader?limit=100000'},
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: "./public/favicon.ico"
        }),
        // new webpack.EnvironmentPlugin({
        //     'NODE_ENV': 'production'
        // })
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}