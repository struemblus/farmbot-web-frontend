var webpack = require('webpack');
var generateConfig = require("./webpack.config.base");
var exec = require("child_process").execSync;

c = function () {
  var conf = generateConfig();
  conf.devtool = 'source-map';
  conf
    .plugins
    .push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.REVISION': JSON.stringify(
        exec('git log --pretty=format:"%h%n%ad%n%f" -1').toString()),

    }));
  return conf;
};

module.exports = c();
