var path = require("path");
var webpack = require("webpack");

module.exports = {
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".json"]
    },
    entry: {
        main: path.resolve(__dirname, "../src/entry.tsx"),
        vendor: "moment"
    },
    output: {
        path: "/app/app-resources",
        filename: "[chunkhash].[name].js",
        // publicPath: "/assets/",
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
    devServer: {
        historyApiFallback: {
            index: "/index.html",
            rewrites: [
                { from: /\/app\//, to: "/app/index.html" },
                { from: /password_reset/, to: "password_reset.html" }
            ]
        },
    }
}