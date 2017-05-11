const xml = require('xml');


/**
 * 生成SLDJSON对象的PolygonSymbolizer部分
 * @color [string] 该区间段的渲染颜色.
 * @return [object] 返回生成的对象.
 */
function genSLDPolygonSymbolizerJSONObj(color) {
  return {
    'sld:PolygonSymbolizer': [{
        'sld:Fill': [{
          'sld:CssParameter': [{
              '_attr': {
                'name': 'fill'
              }
            },
            color
          ]
        }]
      },
      {
        'sld:Stroke': [{
          'sld:CssParameter': [{
              '_attr': {
                'name': 'stroke'
              }
            },
            color
          ]
        }]
      },
    ]
  }
}


module.exports = genSLDPolygonSymbolizerJSONObj;

// console.log(xml(genSLDPolygonSymbolizerJSONObj('#00FF00')));
// 输入结果如下
// <sld:PolygonSymbolizer>
//     <sld:Fill>
//         <sld:CssParameter name="fill">#00FF00</sld:CssParameter>
//     </sld:Fill>
//     <sld:Stroke>
//         <sld:CssParameter name="stroke">#00FF00</sld:CssParameter>
//     </sld:Stroke>
// </sld:PolygonSymbolizer>