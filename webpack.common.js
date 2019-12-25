const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    entry: {
        "app/assets/js/main": "./web-src/assets/js/main.js",
        "app/assets/css/main": "./web-src/assets/scss/main.scss"
    },
    output: {
        filename: isProduction ? "[name].[contenthash].js" : "[name].js",
        path: path.resolve(__dirname, "./web"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            context: "",
                            name: isProduction ? "[path][name].[contenthash].[ext]" : "[path][name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    performance: {
        hints: false
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new CleanWebpackPlugin("web/app"),
        new ManifestPlugin({
            basePath: "/",

            // Temporary config to support CopyPlugin file hashes (removes hash in manifest key)
            // @see {@link https://github.com/webpack-contrib/copy-webpack-plugin/issues/104#issuecomment-370390225}
            map: file => {
                if (isProduction) {
                    file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, "$2");
                }

                return file;
            }
        }),
        new CopyPlugin(
            [
                {
                    from: "./web-src/assets/img",
                    to: isProduction ? "app/assets/img/[path][name].[hash].[ext]" : "app/assets/img"
                }
            ],
            {
                // Fixes file copy after eslint error (and gets picked up by manifest plugin)
                // @see {@link https://github.com/webpack-contrib/copy-webpack-plugin/issues/356#issuecomment-472782654}
                copyUnmodified: true
            }
        ),
        new MiniCssExtractPlugin({
            filename: isProduction ? "[name].[contenthash].css" : "[name].css"
        }),
        new StyleLintPlugin({
            files: './**/*.s?(a|c)ss'
        }),
        new SVGSpritemapPlugin("./web-src/symbols/**/*.svg", {
            output: {
                filename: isProduction ? "app/assets/img/symbols.[hash].svg" : "app/assets/img/symbols.svg",

                // Fix to point manifest key to the right folder (adds img/ in manifest key)
                chunk: {
                    name: "app/assets/img/symbols"
                }
            },
            sprite: {
                prefix: false
            }
        })
    ]
};
