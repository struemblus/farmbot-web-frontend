var path = require('path')
  , exec = require('child_process').exec
  , execSync = require('child_process').execSync
  , webpack = require('webpack');

exec("rm app-resources/*bundle.js* app-resources/*styles.css*"); // Clean previous stuff.

var revisionPlugin = new webpack.DefinePlugin({
  'process.env.REVISION': JSON.stringify(execSync('git log --pretty=format:"%h%n%ad%n%f" -1').toString()),
});

module.exports = function () {
  return {
    module: {
      loaders: [{
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: 'ts'
      }],
    },
    entry: {
      app: './src/entry.tsx'
    },
    output: {
      path: path.resolve(__dirname, "..", "app-resources"),
      publicPath: "/app-resources/",
      filename: "bundle.js"
    },
    ts: {
      configFileName: "tsconfig.json"
    },
    plugins: [revisionPlugin],
    resolve: {
      extensions: ['', '.js', '.ts', '.tsx'],
    },
    devServer: {
      historyApiFallback: {
        index: '/app/index.html'
      }
    }
  };
};
