const path = require("path");
const { DefinePlugin } = require("webpack");
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

const tsconfig = require("./tsconfig.json");

const alias = Object.keys(tsconfig.compilerOptions.paths).reduce(
    (result, aliasPath) => {
        const resolvePath = tsconfig.compilerOptions.paths[aliasPath][0].replace(
            "*",
            ""
        );
        result[aliasPath.replace("/*", "")] = path.resolve(
            path.join(__dirname, "src"),
            resolvePath
        );
        return result;
    },
    {}
);

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimizations = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };
    if (isDev) {
        config.minimize = true;
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin({
                parallel: true,
            }),
        ]
    };
    return config;
};

const styles = () => {
    return isDev
        ? "style-loader"
        : {
            loader: MiniCssExtractPlugin.loader,
        }
};

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: isDev ? "[name].bundle.js" : "[name].[hash].bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        clean: true,
    },
    context: path.resolve(__dirname, "src"),
    mode: isDev ? "development" : "production",
    devtool: isDev && "eval-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [styles(), "css-loader"],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module\.s(a|c)ss$/,
                use: [styles(), "css-loader", "sass-loader"],
            },
            {
                test: /\.(eot|ttf|otf|woff(2)?)$/,
                type: "asset/resource",
                generator: {
                    filename: isDev ? "fonts/[name].[ext]" : "fonts/[hash][ext][query]",
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp|avif)$/,
                type: "asset/resource",
                generator: {
                    filename: isDev ? "assets/[name].[ext]" : "assets/[hash][ext][query]",
                },
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public/favicon.ico"),
                    to: path.resolve(__dirname, "build"),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new DefinePlugin(envKeys),
    ],
    devServer: {
        port: process.env.PORT,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "./")
        },
    },
    optimization: optimizations(),
};