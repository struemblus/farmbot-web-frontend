var webpack = require("webpack");
var generateConfig = require("./webpack.config.base");
var exec = require("child_process").execSync;
var fs = require("fs");
var path = require("path");
var configPath = path.resolve(__dirname, "../src/config.json");
var FarmBotRenderer = require("./farmBotRenderer");
global.WEBPACK_ENV = "development";

c = function () {
    var conf = generateConfig();

    conf.entry = {
        "bundle": path.resolve(__dirname, "../src/entry.tsx"),
        "front_page": "./src/front_page/index.tsx",
        "verify": "./src/static/verify.ts",
        "password_reset": "./src/password_reset/index.tsx"
    };

    conf.output = {
        path: path.resolve(__dirname, "../public"),
        filename: "dist/[name].[chunkhash].js",
        libraryTarget: "umd",
        publicPath: "/"
    };

    conf
        .module
        .rules
        .push({
            test: [/\.scss$/, /\.css$/],
            use: ["style-loader", "css-loader", "sass-loader"]
        });

    conf.devtool = "source-map";

    conf
        .plugins
        .push(new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
            "process.env.REVISION": JSON.stringify(
                exec('git log --pretty=format:"%h%n%ad%n%f" -1').toString())
        }));

    if (fs.existsSync(configPath)) {
        var config = require(configPath);
        conf.plugins.push(new webpack.DefinePlugin({
            "process.env.CONFIG": JSON.stringify(config)
        }));
    }

    conf
        .plugins
        .push(new FarmBotRenderer({
            path: path.resolve(__dirname, "../src/static/app_index.hbs"),
            filename: "index.html",
            outputPath: path.resolve(__dirname, "../public/app/")
        }));

    conf
        .plugins
        .push(new FarmBotRenderer({
            path: path.resolve(__dirname, "../src/static/front_page.hbs"),
            filename: "index.html",
            outputPath: path.resolve(__dirname, "../public/"),
            include: "front_page"
        }));

    return conf;
};

module.exports = c();