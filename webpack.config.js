const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src'
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
}