const path = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  tsImportPluginFactory = require('ts-import-plugin');

const production = process.env.NODE_ENV === "production";

const PATH = {
  src: path.join(__dirname, "client"),
  dist: path.join(__dirname, "dist", "client")
}

module.exports = {
  entry: {
    app: [PATH.src],
    vendor: ["react", "react-dom"]
  },
  output: {
    path: PATH.dist,
    filename: "js/[name].bundle.js"
  },
  mode: production ? "production" : "development",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".mjs"]
  },
  module: {
    rules: [
      { 
        enforce: "pre", 
        test: /\.js$/, 
        loader: "source-map-loader" ,
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory( /** options */) ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(PATH.src, "assets", "index.html"),
      chunks: ["app"]
    }),
    new MiniCssExtractPlugin({
      filename: production ? "[name].[hash].css" : "[name].css",
      chunkFilename: production ? "[id].[hash].css" : "[id].css"
    }),
  ]
};