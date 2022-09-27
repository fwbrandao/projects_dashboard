const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }
      },
      {
        test: /\.m?wav$|gif$/,
        use: {
          loader: 'file-loader'
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './src/images/favicon.gif',
    }),
  ],
}