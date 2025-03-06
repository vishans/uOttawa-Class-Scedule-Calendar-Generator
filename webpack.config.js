const path = require('path');

module.exports = {
  mode: 'development', 
  entry: {
    popup: './popup.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: false
};