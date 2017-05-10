const iteratorCSVLine = require('./iteratorCSVLine');
const path = require('path');

/**
 * 主入口
 * 转换CSV到SLD对象
 */
function translateCSVToSLD(filepath, outputDir) {
  console.log('开始执行文件转换');
  iteratorCSVLine(filepath, outputDir); // 执行文件转换
}

module.exports = translateCSVToSLD;