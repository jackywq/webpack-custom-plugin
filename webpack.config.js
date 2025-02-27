const path = require("path");

// 导入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OutputConsolePlugin = require("./plugins/Output-console-plugin");
const FileListPlugin = require("./plugins/File-list-plugin");
const RemoveConsolePlugin = require("./plugins/Remove-console-plugin.js");
const CopyrightWebpackPlugin = require("./plugins/Copyright-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 使用自定义 Loader
        use: [
          {
            loader: path.resolve(__dirname, "loaders/naming-check-loader.js"),
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "custom-plugin",
    }),
    new CleanWebpackPlugin(),
    new OutputConsolePlugin({ msg: "good boy!" }),
    new FileListPlugin(),
    new RemoveConsolePlugin(),
    new CopyrightWebpackPlugin({
      // 自定义版权信息
      copyright: "Copyright © 2024 Your Company. All rights reserved.",
    }),
  ],
};
