/**
 * @author zte10191772
 * @description define config's parameters validate middleware functions
 *
 * 中间件函数遵循如下规范:
 * function middlewareExample(params, addErrorInfo)
 * params - 参数对象.
 * addErrorInof - 错误处理函数,向输入添加错误信息.
 *
 * 传入的params对象的属性
 * - type
 * - rowNum
 * - filename
 * - sldTitle
 * - propertyName
 * - divisionNum
 * - divisionString
 * - colorString
 * - divisionDescriptionString
 *
 * addErrorInfo函数接收两个参数
 * - rowNum 行号
 * - errorMessage 错误信息字符串
 */

/**
 * 检查文件名
 *
 * @param {object} params
 * @param {function} addErrorLine
 * @api public
 */
function checkFileName(params, addErrorLine) {
  const { rowNum, filename, type } = params

  if (filename.length === 0) {
    addErrorLine(rowNum, '文件名不能为空');
    return;
  }
  switch (type) {
    case '1': // 热力图配置
      {
        const gridHeatrenderFileNameRegExp = /^\w+_\w+_heat\.sld$/
        const isRight = gridHeatrenderFileNameRegExp.test(filename)
        if (!isRight) {
          addErrorLine(rowNum, '文件名与文件类型1不匹配')
        }
      }
      break
    case '2': // 栅格渲染文件名
      {
        const girdRenderFileNameRegExp = /^\w+_\w+_grids\.sld$/
        const isRight = girdRenderFileNameRegExp.test(filename)
        if (!isRight) {
          addErrorLine(rowNum, '文件名与文件类型2不匹配')
        }
      }
      break
    case '3': // 小区渲染文件名
      {
        const cellRenderFileNameRegExp = /^\w+_value_\w+_line\.sld$/;
        const isRight = cellRenderFileNameRegExp.test(filename)
        if (!isRight) {
          addErrorLine(rowNum, '文件名与文件类型3不匹配')
        }
      }
      break
    case '4': // 小区文件名
      {
        const cellFileNameRegExp = /^\w+_cell_line\.sld$/
        const isRight = cellFileNameRegExp.test(filename)
        if (!isRight) {
          addErrorLine(rowNum, '文件名与文件类型4不匹配')
        }
      }
      break
    case '5': // 区域渲染热力图
      {
        const girdPARenderFileNameRegExp = /^\w+_\w+_grids_pa\.sld$/
        const isRight = girdPARenderFileNameRegExp.test(filename)
        if (!isRight) {
          addErrorLine(rowNum, '文件名与文件类型5不匹配')
        }
      }
      break
    default:
      {
        addErrorLine(rowNum, '未知的文件名设置')
      }
      break
  }
}

/**
 * 检查渲染区间描述
 *
 * @param {object} params
 * @param {function} addErrorLine
 * @api public
 */
function checkRenderDivisionDescription(params, addErrorLine) {
  const { rowNum, divisionDescriptionString, divisionNum } = params
  const num = parseInt(divisionNum, 10) // 分段数

  if (divisionDescriptionString.split('|').length !== num) {
    addErrorLine(rowNum, '区段描述的段数不匹配区间数')
  }
}

/**
 * 检查渲染颜色
 *
 * @param {object} params
 * @param {function} addErrorLine
 * @api public
 */
function checkRenderColor(params, addErrorLine) {
  const { rowNum, colorString, divisionNum } = params
  const num = parseInt(divisionNum, 10) // 分段数

  if (colorString.split('|').length !== num) {
    addErrorLine(rowNum, '颜色区间段数不匹配区间数')
    return
  }

  const colorReg = /^#[0-9abcdefABCDEF]{6}$/
  const isRightColor = colorString.split('|').every(String => {
    return colorReg.test(String)
  })

  if (!isRightColor) {
    addErrorLine(rowNum, '颜色设置有误')
  }
  return
}

/**
 * 检查渲染区间
 *
 * @param {object} params
 * @param {function} addErrorLine
 * @api public
 */
function checkRenderDivision(params, addErrorLine) {
  const { rowNum, divisionsString, divisionNum } = params
  const num = parseInt(divisionNum, 10); // 分段数

  if (divisionsString.split('|').length !== num) {
    addErrorLine(rowNum, '分段区间段数不匹配区间数')
    return
  }

  const leftReg = /^x(<|<=|=)(\d+)/;
  const rightReg = /^x(>|>=|=)(\d+)/;
  const doubleReg = /(\d+)(<|<=|=)x(<|<=|=)(\d+)/
  const isRightDivision = divisionsString.split('|').every(divisionStr => {
    return leftReg.test(divisionStr) || rightReg.test(divisionStr) || doubleReg.test(divisionStr)
  })

  if (!isRightDivision) {
    addErrorLine(rowNum, '分段区间设置有误')
    return
  }
}

/**
 * 检查参数长度
 *
 * @param {object} params
 * @param {function} addErrorLine
 * @api public
 */
function checkParamsLength (params, addErrorLine) {
  const { rowNum } = params
  if (!params || Object.keys(params).length !== 7) {
    addErrorLine(rowNum, '列数错误')
    return
  }
}

/**
 * 检测渲染区间数
 *
 * @param {object} params
 * @param {function} addErrorLine
 * @api public
 */
function checkDivisionNum(params, addErrorLine) {
  const { rowNum, divisionNum } = params
  var numReg = /^[1-9]\d*$/
  if (!numReg.test(divisionNum)) {
    addErrorLine(rowNum, '错误的分段数设置')
  }
}

function checkSLDType(params, addErrorInfo) {
  const { rowNum, type} = params
  var typeAry = [1, 2, 3, 4, 5]
  if (!typeAry.some(typeValue => {
    return typeValue === type;
  })) {
    addErrorInfo(rowNum, '错误的SLD类型设置');
  }
}


 /////////////////
// 导出检查中间间 //
/////////////////
const checkMiddlewares = {
  checkFileName,
  checkRenderDivisionDescription,
  checkRenderColor,
  checkRenderDivision,
  checkParamsLength,
  checkDivisionNum,
  checkSLDType
}

module.exports = checkMiddlewares
