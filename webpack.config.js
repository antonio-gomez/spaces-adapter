var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        adapter: "./src/main.js"
    },
    output: {
        libraryTarget: "umd",
        library: "spaces-adapter",
        path: path.join(__dirname, "build"),
        filename: "spaces-adapter.js",
        umdNamedDefine: true
    },
    resolve: {
        root: path.resolve("./src"),
        extensions: ["", ".js"]
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader"
            }
        ],
        loaders: [
            {
                // Es6 transpiling
                test: path.join(__dirname, "src"),
                exclude: /(node_modules)/,
                loader: "babel",
                query: {
                    presets: ["es2015"],
                    plugins: ["babel-plugin-add-module-exports"]
                }
            }
        ]
    },
    plugins: [
        // Does not allow a bundle when there are errors present
        new webpack.NoErrorsPlugin()
    ]
};
