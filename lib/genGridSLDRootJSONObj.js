const genSLDNamedLayerJSONObj = require('./genSLDNamedLayerJSONObj');

/**
 * 
 * 
 * @param {any} propertyName 
 * @param {any} divisionNum 
 * @param {any} divisionAry 
 * @param {any} colorAry 
 * @param {any} sldNameAry 
 * @param {any} sldAbstractAry 
 * @param {any} sldTitle 
 * @param {number} [opacity] 
 * @returns 
 */
function genGridSLDRootJSONObj(propertyName, divisionNum, divisionAry, colorAry, sldNameAry, sldAbstractAry, sldTitle, opacity) {
  var params = {
    sldTitle: 'this is a sldTitle',
    sldAbstract: 'this is a sldAbstract'
  }
  return {
    'sld:StyledLayerDescriptor': [{
        '_attr': {
          'xmlns': 'http://www.opengis.net/sld',
          'xmlns:sld': 'http://www.opengis.net/sld',
          'xmlns:ogc': 'http://www.opengis.net/ogc',
          'xmlns:gml': 'http://www.opengis.net/gml',
          'version': '1.0.0'
        }
      },
      genSLDNamedLayerJSONObj({
        propertyName,
        divisionNum,
        divisionAry,
        colorAry,
        sldNameAry,
        sldAbstractAry,
        sldTitle,
        opacity
      })
    ]
  };
}

module.exports = genGridSLDRootJSONObj;
