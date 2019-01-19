//const webpack = require("webpack");
module.exports = {
  chainWebpack: config => {
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: "[name].css",
            chunkFilename: "[name].css"
          }
        ]);
    }
  },
  configureWebpack: {
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js"
    }
  }
  // configureWebpack: {
  //   plugins: [
  //     new webpack.optimize.LimitChunkCountPlugin({
  //       maxChunks: 1
  //     })
  //   ]
  // }
  // splitChunks: {
  //   minSize: 10000,
  //   maxSize: 250000,
  // }
  // chainWebpack: config => {
  //   //config.optimization.delete("splitChunks");
  //   config.optimization.splitChunks(false);
  // }
};
