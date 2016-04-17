module.exports = [{
    entry: "./_host.js",
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
        }, {
            test: /\.css$/,
        }]
    },
    plugins: [
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
    entry: "./_participant.js",
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
        }, {
            test: /\.css$/,
        }]
    },
    plugins: [
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
