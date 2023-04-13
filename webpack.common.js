const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        background: path.join(__dirname, "src/background.ts"),
        popup: path.join(__dirname, "src/components/Popup/index.tsx"),
        options: path.join(__dirname, "src/components/Options/index.tsx"),
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/js"),
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: "ts-loader",
            },
            {
                test: /\app.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.module.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    "postcss-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@src": path.resolve(__dirname, "src/"),
        },
    },
    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
};
