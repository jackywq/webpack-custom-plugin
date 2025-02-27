/**
 * 说明：检查源码中的变量是否符合驼峰命名规则
 */
module.exports = function (source) {
  const regex = /let (\w+)/g;
  let match;
  while ((match = regex.exec(source))) {
    const varName = match[1];
    if (!/^[a-z][A-Za-z]*$/.test(varName)) {
      throw new Error(`变量 ${varName} 不符合驼峰命名规则！`);
    }
  }
  return source;
};
