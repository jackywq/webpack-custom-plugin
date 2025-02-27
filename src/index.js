function createElement() {
  const element = document.createElement("div");
  element.innerHTML = "孔子曰：中午不睡，下午崩溃!孟子曰：孔子说的对!";

  // 测试用例：给Remove-console-plugin移除console.log、debugger
  debugger;
  console.log("hello world");

  // 测试用例：给naming-check-loader检查变量命名是否符合驼峰命名规则
  let myVariableName999 = "helloWorld";

  return element;
}

document.body.appendChild(createElement());
