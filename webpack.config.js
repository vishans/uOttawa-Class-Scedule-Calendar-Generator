const path = require('path');

module.exports = {
  mode: 'production', // or 'development' if you're debugging
  entry: {
    popup: './popup.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: false, // Disable eval-based source maps to satisfy CSP
  target: 'web'
};