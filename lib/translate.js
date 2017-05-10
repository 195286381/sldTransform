const iteratorCSVLine = require('./iteratorCSVLine');
const path = require('path');

/**
 * 主入口
 * 转换CSV到SLD对象
 */
function translateCSVToSLD(filepath, outputDir) {

  console.log('开始执行文件转换');

  /// todo Test 

  const fileString = './sld.csv';
  // 执行文件转换

  iteratorCSVLine(filepath, outputDir);
  /// todo Test
}

module.exports = translateCSVToSLD;