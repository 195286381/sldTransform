const xml = require('xml');
const d3 = require('d3');
const fs = require('fs');
const path = require('path');

const genGridSLDRootJSONObj = require('./genGridSLDRootJSONObj');
/*
csv文件的列按如下顺序排列:
1.SLD文件名: 文件名
2.SLD描述: 具体描述
3.渲染属性值: 具体要渲染的属性值
csv文件的列按如下顺序排列:
4.渲染段数(必须设置): 大于零的整数
5.渲染区间(必须设置): 格式如:
    1.双侧区间 100<x<199 区间值左侧一定要小于或者等于右侧.
    2.单侧区间,确保x位于左侧 x>19 或者 x<10, 每段以"|"区分,段数要跟渲染段数一致.
    示例如下: x<100|120<=x<400|x>=400
6.渲染颜色(必须设置):
    格式如:#123456|#123743|#243434, 每段以"|"区分,段数要跟渲染段数一致.
7.渲染区间描述(必须设置):
    格式如 xxxxx|xxxx|xxxxx| (已经支持逗号)
*/

/**
 * 根据每行数据和输出路径生成文件
 * @func
 * @param {string} str
 * @param {string} outputDir
 * @returns
 */
function genSLDFile(str, outputDir) {
  const ary = d3.csvParseRows(str)[0]; // 加载d3库,转换csv文件的列
  // console.log(ary.length);
  if ((ary.length ===7 && ary[4] === '')) {
    ary.push('');
  }

  if ((ary.length != 8)) {
    console.log('去掉问题列: ' + ary[0]);
    return;
  }

  /**
   * 提取列字段
   * 文件名,渲染字段值,区间段数,颜色,区间 CSV文件列说明
   * SLD标题 标题描述
   * filename 文件名
   * propertyName 渲染的属性值
   * divisionNum 渲染区间段数
   * divisionString 渲染区间字符串
   * colorString 渲染区间字符串
   * divisionDescriptionString 渲染区间描述字符串
   */
  const [type, filename, sldTitle, propertyName, divisionNum, divisionString, colorString, divisionDescriptionString] = ary; // 数组解构
  // console.log('正在生成文件: ' + filename); // 控制台打印生成的文件
  document.getElementById('outputConsole').value += `\n生成文件:  ${filename}`
  const colorAry = colorString.trim().split('|');
  const divisionAry = divisionString.trim().split('|');
  const divisionDescriptionAry = divisionDescriptionString.trim().split('|');
  let rootObj;
  if (type === '4') {
    rootObj = genGridSLDRootJSONObj(propertyName, '1', divisionAry, colorAry, divisionDescriptionAry, [], sldTitle);
  } else if (type === '5') {
    rootObj = genGridSLDRootJSONObj(propertyName, '1', divisionAry, colorAry, divisionDescriptionAry, [], sldTitle, 0.5);
  } else {
    rootObj = genGridSLDRootJSONObj(propertyName, divisionNum, divisionAry, colorAry, divisionDescriptionAry, [], sldTitle);
  }

  // 执行文件IO写入
  fs.writeFile(path.join(outputDir, filename), xml(rootObj, {
    declaration: true,
    indent: true
  }), function (err) {
    if (err) throw (err);
  });
}

module.exports = genSLDFile;
