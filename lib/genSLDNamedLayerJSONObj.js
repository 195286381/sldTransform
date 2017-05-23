const genSLDRuleJSONObj = require('./genSLDRuleJSONObj');
/**
 * 生成SLD的nameLayer部件
 * @param  {string} propertyName - 渲染的属性值
 * @param  {number} divisionNum - 渲染段数
 * @param  {array} divisionAry - 间断区间数组
 * @param  {array} colorAry - 渲染颜色数组
 * @param  {array} sldNameAry - 区间段名称数组(可选),不设置等同于divisionAry
 * @param  {array} sldAbstractAry - 可选,不设置为空
 * @return {object} 返回生成的部件对象
 * @api public
 */
function genSLDNamedLayerJSONObj({
  propertyName,
  divisionNum,
  divisionAry,
  colorAry,
  sldNameAry,
  sldAbstractAry,
  sldTitle,
  opacity
}) {
  return {
  
    'sld:NamedLayer': [{
        'sld:Name': 'Default Styler'
      },
      {
        'sld:UserStyle': [{
            'sld:Name': 'Default Styler'
          },
          {
            'sld:Title': sldTitle
          },
          {
            'sld:Abstract': ''
          },
          genSLDFeatureTypeStyleJSONObj(propertyName, divisionNum, divisionAry, colorAry, sldNameAry, sldAbstractAry, opacity)
        ]
      }
    ]
  }
}


/**
 * sldNameAry,sldAbsreactAryd可选
 * 
 * @api private
 */
function genSLDFeatureTypeStyleJSONObj(propertyName, divisionNum, divisionAry, colorAry, sldNameAry, sldAbstractAry, opacity) {
  let PropertyAry = [{
      'sld:Name': 'simple'
    },
    {
      'sld:FeatureTypeName': 'Feature'
    },
    {
      'sld:SemanticTypeIdentifier': 'generic:geometry'
    },
    {
      'sld:SemanticTypeIdentifier': 'simple'
    }
  ];
  /**
   * 往PropertyAry里面增加Rule
   */
  for (let i = 0; i < divisionNum; i++) {
    let sldName, sldAbstract, divideString, color;
    sldName = sldNameAry[i];
    sldAbstract = '';
    divideString = divisionAry[i];
    color = colorAry[i];
    PropertyAry.push(genSLDRuleJSONObj(sldName, sldAbstract, propertyName, divideString, color, opacity));
  }

  return {
    'sld:FeatureTypeStyle': PropertyAry
  };
}

module.exports = genSLDNamedLayerJSONObj;
