/**
 * 插件说明：用于在 Webpack 构建过程中移除代码里的 console 语句和 debugger 语句。
 */
class RemoveConsoleDebuggerPlugin {
  apply(compiler) {
    // 在编译完成生成资源之前触发
    compiler.hooks.emit.tap("RemoveConsoleDebuggerPlugin", (compilation) => {
      // 遍历所有生成的资源
      for (const filename in compilation.assets) {
        if (compilation.assets.hasOwnProperty(filename)) {
          const asset = compilation.assets[filename];
          // 获取资源的源内容
          let source = asset.source();
          // 移除 console 语句
          source = source.replace(
            /console\.(log|warn|error|info|debug)\([^)]*\);?/g,
            ""
          );
          // 移除 debugger 语句
          source = source.replace(/debugger;?/g, "");

          // 更新资源内容
          compilation.assets[filename] = {
            source: () => source,
            size: () => source.length,
          };
        }
      }
    });
  }
}

module.exports = RemoveConsoleDebuggerPlugin;
