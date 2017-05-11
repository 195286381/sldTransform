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
  sldTitle
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
            'sld:Abstract': 'params.sldAbstract'
          },
          genSLDFeatureTypeStyleJSONObj(propertyName, divisionNum, divisionAry, colorAry, sldNameAry, sldAbstractAry)
        ]
      }
    ]
  }
}

/**
 * sldNameAry,sldAbsreactAryd可选
 * @api private
 */
function genSLDFeatureTypeStyleJSONObj(propertyName, divisionNum, divisionAry, colorAry, sldNameAry, sldAbstractAry) {
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
  * 区间段设置为1, propertyName,divideString,sldAbstract 有一个为空, 则只生成小区特定图层配置.
  */
  if ((divisionNum === 1) && ((propertyName[0] === '')||(divideString[0] === '')||(sldName[0] === ''))) {
    PropertyAry.push(genSLDRuleJSONObj('default', sldAbstract, propertyName, divideString, color));
    return {
      'sld:FeatureTypeStyle': PropertyAry
    };
  }

  /**
   * 往PropertyAry里面增加Rule
   */
  for (let i = 0; i < divisionNum; i++) {
    let sldName, sldAbstract, divideString, color;
    // if (typeof sldNameAry === undefined) {
    sldName = sldNameAry[i];
    // }
    // if (typeof sldAbstractAry === undefined) {
    sldAbstract = '';
    // }
    divideString = divisionAry[i];
    color = colorAry[i];

    PropertyAry.push(genSLDRuleJSONObj(sldName, sldAbstract, propertyName, divideString, color));
  }

  return {
    'sld:FeatureTypeStyle': PropertyAry
  };
}

module.exports = genSLDNamedLayerJSONObj;


// 测试代码
// sample 1
// const demo = genSLDNamedLayerJSONObj('111', 2, ['2<x<3', '3<x<5'], ['#111111', '#222222']);
// const xml =  require('xml');
// console.log(xml(demo, true));
// console.log(JSON.stringify(demo));
// sample 2
// const fs = require('fs');
// fs.writeFile('sample.xml', xml(demo, {standalone: 'no',}}), function(err) {
//     if (!err) {
//         console.log('success');
//     }
// });