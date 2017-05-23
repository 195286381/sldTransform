const xml = require('xml');


/**
 * 生成SLDJSON对象的PolygonSymbolizer部分
 * 
 * @color {string} 该区间段的渲染颜色.
 * @opacity {number} 该区域的透明度
 * @return {object} 返回生成的对象.
 */
function genSLDPolygonSymbolizerJSONObj(color, opacity = 1) {
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
          },
          {
            'sld:CssParameter': [{
                '_attr': {
                  'name': 'fill-opacity'
                }
              },
              1
            ]
          }
        ]
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
        },
        {
          'sld:CssParameter': [{
              '_attr': {
                'name': 'stroke-width'
              }
            },
            opacity
          ]
        }]
      },
    ]
  }
}


module.exports = genSLDPolygonSymbolizerJSONObj;
