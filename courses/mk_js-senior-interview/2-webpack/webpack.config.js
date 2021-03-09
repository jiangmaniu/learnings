module.exports = {
  entry: './src/index.js',
  // 出口
  output: {
    // 当前目录
    path: __dirname,
    filename: './build/bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  }
}