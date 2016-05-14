var webpack = require('webpack')

module.exports = [{
    entry: ["./_host.js", "babel-polyfill"],
    output: {
        path: "./",
        filename: "_host.out.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ["es2015", "react"]
            }
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: [
            "", ".js", ".jsx"
        ],
        modulesDirectories: [
            "node_modules",
            __dirname,
        ]
    }
}, {
    entry: ["./_participant.js", "babel-polyfill"],
    output: {
        path: "./",
        filename: "_participant.out.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ["es2015", "react"]
            }
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: [
            "", ".js", ".jsx"
        ],
        modulesDirectories: [
            "node_modules",
            __dirname,
        ]
    }
}];
