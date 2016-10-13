var base = require("./webpack.config.js");
var webpack = require("webpack");

module.exports = Object.assign({}, base, {
    plugins: [
        // Does not allow a bundle when there are errors present
        new webpack.NoErrorsPlugin()
    ]
});
