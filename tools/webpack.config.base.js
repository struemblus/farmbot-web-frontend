var path = require("path");
var webpack = require("webpack");
var exec = require("child_process").exec;
var execSync = require("child_process").execSync;
var webpack = require("webpack");
var fs = require("fs");

// Bootstrapping
exec("touch public/app/index.html");
exec("echo -n > public/app/index.html");
exec("rm -rf public/app-resources/chunks/*");
exec("rm -rf public/app-resources/*.*");

/** For reference in the console. */
var revisionPlugin = new webpack.DefinePlugin({
    "process.env.REVISION": JSON.stringify(execSync(
        'git log --pretty=format:"%h%n%ad%n%f" -1').toString())
});

var shortRevisionPlugin = new webpack.DefinePlugin({
    "process.env.SHORT_REVISION": JSON.stringify(execSync(
        'git log --pretty=format:"%h" -1').toString())
});

/** FarmBot Inc related. */
var npmAddons = new webpack.DefinePlugin({
    "process.env.NPM_ADDON": JSON.stringify(
        process.env.NPM_ADDON || false).toString()
});

/** WEBPACK BASE CONFIG */
module.exports = function() {
    return {
        /** Allows imports without file extensions. */
        resolve: {
            extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".json", ".hbs"]
        },

        /** Shared loaders for prod and dev. */
        module: {
            rules: [
                { test: /\.tsx?$/, use: "ts-loader" },
                {
                    test: [/\.woff$/, /\.woff2$/, /\.ttf$/],
                    use: "url-loader"
                },
                {
                    test: [/\.eot$/, /\.svg(\?v=\d+\.\d+\.\d+)?$/],
                    use: "file-loader"
                }
            ]
        },

        /** Shared plugins for prod and dev. */
        plugins: [
            revisionPlugin,
            shortRevisionPlugin,
            npmAddons
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: "vendor"
            // })
        ],

        /** Webpack Dev Server. */
        devServer: {
            historyApiFallback: {
                rewrites: [
                    { from: /\/app\//, to: "/app/index.html" },
                    { from: /password_reset/, to: "password_reset.html" },
                ]
            }
        }
    }
}