const path = require('path');
const fs = require('fs');
const readline = require('readline');
const genSLDFile = require('./genSLDFile');

/**
 * 主程序入口
 * @func
 * @param {string} filepath
 * @param {string} outputDir
 */
function translateCSVToSLD(filepath, outputDir) {
  console.log('开始执行文件转换');
  iteratorCSVLine(filepath, outputDir); // 执行文件转换
}

/**
 * 按行执行文件转换
 * @func
 * @param {string} filePath - 文件路径
 * @param {string} outputDir - 输出路径
 */
function iteratorCSVLine(filePath, outputDir) {
  const rl = readline.createInterface({ // 创建流
    input: fs.createReadStream(filePath)
  });
  let titleLine = true;

  rl.on('line', (line) => { // 每一行CSV生成一个SLD文件
    if (titleLine) { // 忽略标题行
      titleLine = false;
      console.log('\n');
      return;
    }
    genSLDFile(line, outputDir); // 把每行数据转成SLD文件
  });

  rl.on('close', () => {
    console.log('执行完毕');
  });
}

module.exports = translateCSVToSLD;