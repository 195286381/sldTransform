const genSLDNamedLayerJSONObj = require('./genSLDNamedLayerJSONObj');
function genGridSLDRootJSONObj(propertyName, divisionNum, divisionAry, colorAry, sldNameAry, sldAbstractAry, sldTitle) {
    var params = {
        sldTitle: 'this is a sldTitle',
        sldAbstract: 'this is a sldAbstract'
    }
    return {
        'sld:StyledLayerDescriptor': [
            {
                '_attr': {
                    'xmlns': 'http://www.opengis.net/sld',
                    'xmlns:sld': 'http://www.opengis.net/sld',
                    'xmlns:ogc': 'http://www.opengis.net/ogc',
                    'xmlns:gml': 'http://www.opengis.net/gml',
                    'version': '1.0.0'
                }
            },
            genSLDNamedLayerJSONObj({propertyName, divisionNum, divisionAry, colorAry, sldNameAry, sldAbstractAry, sldTitle})
        ]
    };
}

module.exports = genGridSLDRootJSONObj;

// test
// sample
// const demo = genSLDNamedLayerJSONObj('111', 2, ['2<x<3', '3<x<5'], ['#111111', '#222222']);
// const fs = require('fs');
// const xml = require('xml');
// fs.writeFile('sample.xml', xml(demo, true), function(err) {
//     if (!err) {
//         console.log('success');
//     }
// });