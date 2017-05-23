const genOrcFilterJSONObj = require('./genOrcFilterJSONObj'); // 生成OrcFilter部件
const genSLDPolygonSymbolizerJSONObj = require('./genSLDPolygonSymbolizerJSONObj'); // 生成PolygonSymbolizer部件

/**
 * 生成SLDRule对象
 * 
 * @param sldName  {string} 界面显示的sld显示值 如果没设置取默认值default;
 * @param sldAbstract {string} sldRule描述
 * @param propertyName {string} 渲染的value
 * @param divideString {string} 区间段
 * @param color {string} 颜色
 * @param opacity {number} 透明度
 * @return {object}
 */
function genSLDRuleJSONObj(sldName = 'default', sldAbstract, propertyName, divideString, color, opacity) {
  if (divideString.trim().length === 0 || propertyName.trim().length === 0) { // 设置小区基本设置
    return {
      'sld:Rule': [{
          'sld:Name': sldName
        },
        {
          'sld:Abstract': sldAbstract
        },
        genSLDPolygonSymbolizerJSONObj(color, opacity)
      ]
    };
  }

  return {
    'sld:Rule': [{
        'sld:Name': sldName
      },
      {
        'sld:Abstract': sldAbstract
      },
      genOrcFilterJSONObj(propertyName, divideString),
      genSLDPolygonSymbolizerJSONObj(color, opacity)
    ]
  };
}

module.exports = genSLDRuleJSONObj;
