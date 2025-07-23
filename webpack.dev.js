const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",

  // Add source map (to more easily troubleshoot source code)
  devtool: "eval-source-map",

  // Include html file in files watched by webpack server
  devServer: {
    watchFiles: ["./src/template.html"],
  },

});