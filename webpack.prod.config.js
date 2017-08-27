const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')

let production = { // See https://github.com/gajus/react-css-modules
  entry: './src/app/App.js',
  output: {
    path: './public',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/, // See https://github.com/gajus/react-css-modules
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.bundle.css', {
      allowChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}

module.exports = production
