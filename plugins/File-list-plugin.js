/**
 * 插件说明: 打包完成后，会在dist文件夹内生成一个fileList.md文件，文件内会列出所有的待生成的文件
 * 代码分析：
 * 通过compiler.hooks.emit.tapAsync()来触发生成资源到output目录之前的钩子，且回调函数会有两个参数，一个是compilation，一个是cb回调函数
 * 要生成的markdown文件的名称
 * 通过compilation.assets获取到所有待生成的文件，这里是获取它的长度
 * 定义markdown文件的内容，也就是先定义一个一级标题，\n表示的是换行符
 * 将每一项文件的名称写入markdown文件内
 * 给我们即将生成的dist文件夹里添加一个新的资源，资源的名称就是fileListName变量
 * 写入资源的内容
 * 指定新资源的大小，用于webpack展示
 * 由于我们使用的是tapAsync异步调用，所以必须执行一个回调函数cb，否则打包后就只会创建一个空的dist文件夹
 */

class FileListPlugin {
  constructor(options) {
    this.options = options || {};
    this.filename = this.options.filename || "fileList.md";
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, cb) => {
      const fileListName = this.filename;
      let len = Object.keys(compilation.assets).length;
      let content = `# 一共有${len}个文件\n\n`;
      for (let filename in compilation.assets) {
        content += `- ${filename}\n`;
      }
      compilation.assets[fileListName] = {
        source: function () {
          return content;
        },
        size: function () {
          return content.length;
        },
      };
      cb();
    });
  }
}
module.exports = FileListPlugin;
