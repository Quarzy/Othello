const glob = require("glob");
const path = require("path");
const changeCase = require("change-case");

module.exports = dirName => {
  const mainDir = path.join(dirName, "main");
  const tsDir = path.join(mainDir, "ts");
  const jsDir = path.join(mainDir, "dist/js");
  const entries = {};
  glob.sync(`${tsDir}/*.ts*`).forEach(file => {
    entries[changeCase.paramCase(file.split("/").pop().replace(/\.tsx?$/, ""))] = file;
  });
  return {
    entry: entries,
    output: {
      path: jsDir,
      filename: "[name].js"
    },
    devtool: "inline-source-map",
    resolve: {
      extensions: [".js", ".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /target/,
          loader: "awesome-typescript-loader",
          options: {
            configFileName: path.join(dirName, "tsconfig.json")
          }
        },
      ]
    }
  };
};
