/**
 * 插件说明: 打包完成后，控制台会输出一段文字
 * 代码分析：
 * compiler：一个扩展至Tapable的对象
 * compiler.hooks：compiler对象上的一个属性，允许我们使用不同的钩子函数
 * .done：hooks中常用的一种钩子，表示在一次编译完成后执行，它有一个回调参数stats(暂时没用上)
 * .tap：表示可以注册同步的钩子和异步的钩子，而在此处因为done属于异步AsyncSeriesHook类型的钩子，所以这里表示的是注册done异步钩子。
 */

class OutputConsolePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.done.tap("OutputConsole", () => {
      console.log(this.options.msg);
    });
  }
}

module.exports = OutputConsolePlugin;
