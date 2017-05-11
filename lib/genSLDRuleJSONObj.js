const genOrcFilterJSONObj = require('./genOrcFilterJSONObj'); // 生成OrcFilter部件
const genSLDPolygonSymbolizerJSONObj = require('./genSLDPolygonSymbolizerJSONObj'); // 生成PolygonSymbolizer部件

/**
 * @param sldName  [string] 界面显示的sld显示值;
 * @param sldAbstract [string] sldRule描述
 * @param propertyName [string] 渲染的value
 * @param divideString [string] 区间段
 * @param color [string] 颜色
 * @return [object]
 */
function genSLDRuleJSONObj(sldName, sldAbstract, propertyName, divideString, color) {
  return {
    'sld:Rule': [{
        'sld:Name': sldName
      },
      {
        'sld:Abstract': sldAbstract
      },
      genOrcFilterJSONObj(propertyName, divideString),
      genSLDPolygonSymbolizerJSONObj(color)
    ]
  };
}

module.exports = genSLDRuleJSONObj;

// test
// const xml = require('xml');
// console.log(xml(genSLDRuleJSONObj('sldName', 'sldAbstract', 'propertyName', '2<x<23', '#232222')));