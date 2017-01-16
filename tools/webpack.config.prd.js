var webpack = require("webpack");
var generateConfig = require("./webpack.config.base");
var exec = require("child_process").execSync;
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var FarmBotRenderer = require("./farmBotRenderer");
global.WEBPACK_ENV = "production";

exec("touch public/app/index.html");
exec("echo -n > public/app/index.html");
exec("rm -rf public/app-resources/chunks/*");
exec("rm -rf public/app-resources/*.*");

c = function() {
    var conf = generateConfig();

    conf
        .module
        .rules
        .push({
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("css-loader!sass-loader")
        });

    conf.entry = {
        "bundle": path.resolve(__dirname, "../src/entry.tsx"),
        "front_page": "./src/front_page/index.tsx",
        "verify": "./src/static/verify.ts"
    };

    conf.output = {
        path: path.resolve(__dirname, "../public/"),
        filename: "dist/[name].[chunkhash].js",
        libraryTarget: "umd",
        publicPath: "/"
    };

    conf.devtool = "source-map";
    // TODO: Webpack 2 doesn't allow?? This helped with RollBar issues
    // conf.devtoolLineToLine = true;

    conf
        .plugins
        .push(new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
            "process.env.REVISION": JSON.stringify(
                exec('git log --pretty=format:"%h%n%ad%n%f" -1').toString()),
        }));

    conf
        .plugins
        .push(new ExtractTextPlugin({
            filename: "dist/styles.css",
            disable: false,
            allChunks: true
        }));

    conf
        .plugins
        .push(new FarmBotRenderer({
            path: path.resolve(__dirname, "../src/static/app_index.hbs"),
            filename: "index.html",
            outputPath: path.resolve(__dirname, "../public/app/"),
            isProd: true
        }));

    conf
        .plugins
        .push(new FarmBotRenderer({
            path: path.resolve(__dirname, "../src/static/front_page.hbs"),
            filename: "index.html",
            outputPath: path.resolve(__dirname, "../public/"),
            include: "front_page",
            isProd: true
        }));

    return conf;
}

module.exports = c();