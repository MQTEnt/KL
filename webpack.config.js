var path = require('path');
// var webpack = require('webpack');
module.exports = {
  entry: './resources/assets/js/app/staff/index.js',

  output: {
    filename: 'bundle.js',
    path: path.join('public/js/app/staff/')
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      }
    ]
  },
  watch: true
};