const path = require("path");

module.exports = {
    entry: {
        backgroundPage: path.join(__dirname, "src/backgroundPage.ts"),
        popup: path.join(__dirname, "src/components/Popup/index.tsx"),
        options: path.join(__dirname, "src/components/Options/index.tsx"),
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
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
};
