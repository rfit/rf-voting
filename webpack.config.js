let development = {
  entry: './src/app/App.js',
  output: {
    path: './public',
    filename: 'app.bundle.js',
  },
  debug: true,
  module: {
    loaders: [
      {
        test: /\.css$/, // See https://github.com/gajus/react-css-modules
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

// TODO figure out frontend config for deployment; or get app id from backend?
// rf voting app id: 1746188185654658
// localtest fb app id: 690824064405896
module.exports = development // TODO make a webpack.config.production.js ??
