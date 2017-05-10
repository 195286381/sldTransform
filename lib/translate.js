const iteratorCSVLine = require('./iteratorCSVLine');
const path = require('path');


/**
 * 主入口
 * 转换CSV到SLD对象
 */
function translateCSVToSLD(filepath) {
  // 判断是否属于CSV文件
  if (!isCSV(filepath)) {
    console.log(`错误: 请输入CSV文件`);
    return;
  }
  console.log('开始执行文件转换');

  /// todo Test 
  const fileString = './sld.csv';
  // 执行文件转换
  iteratorCSVLine(path.join(__dirname, fileString));
  /// todo Test
}

/*
 * 判断文件是否是csv文件
 * @param  {string}  path 文件路径
 * @return {boolean}      判断文件是否是csv
 * @api private
 */ 

function isCSV(path) {
  const csvReg = /.*\.csv$/;
  const result = csvReg.test(path);
  return result;
}

module.exports = translateCSVToSLD;