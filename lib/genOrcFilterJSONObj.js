const xml = require('xml');
// Symbol值转换成字符串.
function SymbolToString(symbolValue) {
    switch(symbolValue) {
        case '<': {
            return 'ogc:PropertyIsLessThan'
        }
        break;
        case '<=': {
            return 'ogc:PropertyIsLessThanOrEqualTo'
        }
        break;
        case '=': {
            return 'ogc:PropertyIsEqualTo'
        }
        break;
        case '>': {
            return 'ogc:PropertyIsGreaterThan'
        }
        break;
        case '>=': {
            return 'ogc:PropertyIsGreaterThanOrEqualTo'
        }
        break;
        default: {
            throw new Error('unknow symbolValue');
        }
        break;
    }
}

// 正则表达式左右值.
const leftReg = /^x(<|<=|=)(\d+)/;
const rightReg = /^x(>|>=|=)(\d+)/;
const doubleReg = /(\d+)(<|<=|=)x(<|<=|=)(\d+)/

// 判断是否是单侧区间
function isSingle(regionValue) {
    return !doubleReg.test(regionValue);
}

function genDivisionObj(value) {
    if (isSingle(value)) { // 如果是单侧值
        if (leftReg.test(value)) { // 左值
            const leftAry = leftReg.exec(value);
            if (leftAry && leftAry.length && leftAry.length === 3){
                const [, singleLeftSymbol, singleLeftValue] = leftAry;
                return {
                    symbolString: SymbolToString(singleLeftSymbol),
                    symbolValue: singleLeftValue
                }
                // console.log(singleLeftSymbol, singleLeftValue);
            } else {
                throw new Error('错误的左值, 确保x在最左侧');
            }
        } else { // 右值
            const rightAry = rightReg.exec(value);
            if (rightAry && rightAry.length && rightAry.length === 3){
                const [, singleRightSymbol, singleRightValue] = rightAry;
                return {
                    symbolString: SymbolToString(singleRightSymbol),
                    symbolValue: singleRightValue
                }
                // console.log(singleRightSymbol, singleRightValue);
            } else {
                throw new Error('错误的右值, 确保x在最左侧');
            }
        }
    } else { // 双侧值
        const matchAry = doubleReg.exec(value);
        if (matchAry.length !== 5) {
            throw new Error('错误的两侧区间设置');
        } else {
            const [, leftValue, leftSymbol, rightSymbol, rightValue] = matchAry; // 取到左右箭头
            let leftString;
            let rightString = SymbolToString(rightSymbol);
            switch (leftSymbol) {
                case '<':
                    leftString = SymbolToString('>');
                break;
                case '<=':
                    leftString = SymbolToString('>=');
                break;
                case '=':
                    leftString = SymbolToString('=');
            }
            return [
                {
                    symbolString: leftString,
                    symbolValue: leftValue
                },
                {
                    symbolString: rightString,
                    symbolValue: rightValue
                }
            ]
        }
    }
}


// console.log(genDivisionObj('0<x<1010'));


/**
 * 根据PropertyName和divisionString生成OrcFilter
 * @param PropertyName [string]
 * @param divisionString [string]
 * @return [object]
 * @api public
 */
function genOrcFilterJSONObj(propertyName, divisionString) {
    const divisionResult = genDivisionObj(divisionString);
    // console.log(divisionResult);
    if (Array.isArray(divisionResult)) { // 双侧区间
        const [leftValue, rightValue] = divisionResult;
        return {
            'ogc:Filter': [{
                'ogc:And': [
                    {
                        [leftValue.symbolString]: [
                            {
                                'ogc:PropertyName': propertyName
                            },
                            {
                                'ogc:Literal': leftValue.symbolValue
                            }
                        ]
                    },
                    {
                        [rightValue.symbolString]: [
                            {
                                'ogc:PropertyName': propertyName
                            },
                            {
                                'ogc:Literal': rightValue.symbolValue
                            }
                        ]
                    }
                ]
            }]
        }

    } else { // 单侧区间
        return {
            'ogc:Filter': [
                {
                    [divisionResult.symbolString]: [
                        {'ogc:PropertyName': propertyName},
                        {'ogc:Literal': divisionResult.symbolValue}
                    ]
                }
            ]
        };
    }
}

// console.log(xml(genOrcFilterJSONObj('value', '20<=x<=50')));
module.exports = genOrcFilterJSONObj;



// test
// console.log(xml(genOrcFilterJSONObj('value', '20<=x<=50')));
// 最终输入结果如下:
//   <ogc:Filter>
//     <ogc:And>
//     <ogc:PropertyIsGreaterThanOrEqualTo>
//     <ogc:PropertyName>value</ogc:PropertyName>
//     <ogc:Literal>20</ogc:Literal>
//     </ogc:PropertyIsGreaterThanOrEqualTo>
//     <ogc:PropertyIsLessThan>
//     <ogc:PropertyName>value</ogc:PropertyName>
//     <ogc:Literal>50</ogc:Literal>
//     </ogc:PropertyIsLessThan>
//     </ogc:And>
//   </ogc:Filter>

// console.log(xml(genOrcFilterJSONObj('value', 'x<=50')));