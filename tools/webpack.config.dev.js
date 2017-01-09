var path = require("path");
var webpack = require("webpack");

module.exports = {
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".json"]
    },
    devtool: 'cheap-module-source-map',
    entry: {
        "bundle": path.resolve(__dirname, "../src/entry.tsx"),
        // "password_reset": "./src/password_reset/index.tsx",
        // "app-index": "./src/static/app_index.ts",
        // "front_page": "./src/front_page/index.tsx",
        // "password-reset": "./src/static/password_reset.ts",
        // "verify": "./src/static/verify.ts",
        // "password_reset": "./src/password_reset/index.tsx",
        vendor: ["moment", "react", "react-router"]
    },
    output: {
        path: "./blah",
        filename: "[chunkhash].[name].js",
        publicPath: "/public/",
        sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "manifest"]
        })
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
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
    // devServer: {
    //     historyApiFallback: {
    //         index: "/index.html",
    //         rewrites: [
    //             { from: /\/app\//, to: "/app/index.html" },
    //             { from: /password_reset/, to: "password_reset.html" }
    //         ]
    //     },
    // }
}