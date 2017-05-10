const xml = require('xml');
const d3 = require('d3');
const fs = require('fs');

const genGridSLDRootJSONObj = require('./genGridSLDRootJSONObj');
// 文件名,渲染字段值,区间段数,颜色,区间

function genSLDFile(str) {
    const ary = d3.csvParseRows(str)[0]; // 转换csv文件的列
    /**
     * 文件名,渲染字段值,区间段数,颜色,区间 CSV文件列说明
     * filename 文件名
     * propertyName 渲染的属性值
     * divisionNum 渲染区间段数
     * colorString 渲染区间字符串
     * divisionString 渲染区间字符串
     */
    const [filename, propertyName, divisionNum, colorString, divisionString] = ary;
    console.log('filename:' + filename);
    const colorAry = colorString.trim().split('|');
    const divisionAry = divisionString.trim().split('|');
    
    const rootObj = genGridSLDRootJSONObj(propertyName, divisionNum, divisionAry, colorAry);
    // 生成对应XML.
    fs.writeFile(filename, xml(rootObj, true), function(err) {
        if (err) throw(err);
    });
}

module.exports = genSLDFile;


// 测试Demo
genSLDFile('lte_cm_dasds_grids.sld,value,2,#234224|#232333,2<x<32|33<x<45');