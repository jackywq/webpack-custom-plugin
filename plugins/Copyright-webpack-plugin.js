/**
 * 插件说明: 打包完成后，为每个文件添加版权信息
 * 代码分析：
 * compiler：一个扩展至Tapable的对象
 * compiler.hooks：compiler对象上的一个属性，允许我们使用不同的钩子函数
 * compilation：hooks中常用的一种钩子，表示在一次编译过程中执行，它有一个回调参数compilation(暂时没用上)
 * optimizeAssets：表示可以注册同步的钩子和异步的钩子，而在此处因为optimizeAssets属于异步AsyncSeriesHook类型的钩子，所以这里表示的是注册optimizeAssets异步钩子。
 * compilation.assets：compilation对象上的一个属性，允许我们使用不同的资源，它有一个回调参数assets(暂时没用上)
 * assets[assetName].source()：获取资源的内容
 * assets[assetName]：给我们即将生成的dist文件夹里添加一个新的资源，资源的名称就是assetName变量
 * assets[assetName].source()：写入资源的内容
 * assets[assetName].size()：指定新资源的大小，用于webpack展示
 * 由于我们使用的是tapAsync异步调用，所以必须执行一个回调函数cb，否则打包后就只会创建一个空的dist文件夹
 */
class AddCopyrightPlugin {
  constructor(options) {
    this.options = options || {};
    this.copyright =
      this.options.copyright ||
      "Copyright © Your Company. All rights reserved.";
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("AddCopyrightPlugin", (compilation) => {
      compilation.hooks.optimizeAssets.tap("AddCopyrightPlugin", (assets) => {
        for (const assetName in assets) {
          if (assets.hasOwnProperty(assetName)) {
            const source = assets[assetName].source();
            const newSource = `/* ${this.copyright} */\n${source}`;
            assets[assetName] = {
              source: () => newSource,
              size: () => newSource.length,
            };
          }
        }
      });
    });
  }
}

module.exports = AddCopyrightPlugin;
