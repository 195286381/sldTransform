const d3 = require('d3');
const fs = require('fs');
const checkLines = require('./checkLines');

/**
 * 检验代码主入口.往每列数据加入行号,并执行检验,输入检验结果.
 * 
 * @param {string} filePath 
 * @returns {string} 
 */
function checkFiles(filePath) {
  /** 使用同步读取文件. -.- 应该性能影响不大,就酱 */
  const fileInfo = fs.readFileSync(filePath);
  const parsedAryData = d3.csvParseRows(fileInfo.toString());

  // 过滤空白行和首行, 并往每行前添加行号信息.
  const filtedAry = parsedAryData.filter((line, index) => {
    line.unshift(index);
    return !((line.length === 2 && line[1].trim() === '') || index === 0)
  })

  // 生成检测信息. checkLines是真正执行校验的代码.
  const checkInfo = checkLines(filtedAry);
  console.log(checkInfo);
  return checkInfo;
}

module.exports = checkFiles;