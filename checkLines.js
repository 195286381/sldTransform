/**
 * 执行数据检测, 并将检测结果填入checkInfo对象
 */
let checkInfo = {};

function addErrorLine(rowNum, errorInfo) {
  let template = `行号: ${rowNum} , 错误信息:　${errorInfo} \n`
  checkInfo.Info = checkInfo.Info + template
}

function checkLines(lines) {
  checkInfo = { // 初始化检验信息
    isCorrect: true,
    Info: ''
  }

  lines.forEach(line => checkLine(line))
  if (checkInfo.Info.trim() !== '') {
    checkInfo.isCorrect = false;
  }
  return checkInfo;

}

// todo 列数检测
function checkLine(line) {
  let [rowNum, type, ...colsAry] = line;
  // 首先检查列数
  if (type === '1' || type === '2' || type === '3') {
    checkTypeOne(rowNum, type, colsAry);
  } else if (type === '4' || type === '5') {
    checkTypeTwo(rowNum, type, colsAry);
  } else {
    addErrorLine(rowNum, '错误的SLD Type值, 请查看配置');
    return;
  }

  // 提取一行中各列的值
  const [fileName, ] = colsAry;

  // 开始检查每一列
  // 1.SLD文件名

}

function checkTypeOne(rowNum, type, colsAry) {

  const [] = colsAry;
  // 长度检测
  if (colsAry.length !== 7) {
    addErrorLine(rowNum, '列数错误');
    return;
  }

  const [filename, sldTitle, propertyName, divisionNum, divisionString, colorString, divisionDescriptionString] = colsAry
  // 1. 文件名检测
  if (filename.length === 0) { // todo
    addErrorLine(rowNum, '文件名不能为空');
    return;
  }

  if (!checkFileName(rowNum, type, filename)) {
    return;
  }
  // 2. SLD描述 // todo
  if (false) {
    // addErrorLine(rowNum, '错误');
  }
  // 3. 渲染属性值 // todo
  if (false) {
    // addErrorLine(rowNum, '错误');
  }
  // 4. 渲染段数
  if (!(/^\d+$/.test(divisionNum.trim()) && parseInt(divisionNum, 10) > 0)) {
    addErrorLine(rowNum, '错误的分段');
    return;
  }
  // 5. 渲染区间
  /**
   *  const leftReg = /^x(<|<=|=)(\d+)/;
   *  const rightReg = /^x(>|>=|=)(\d+)/;
   *  const doubleReg = /(\d+)(<|<=|=)x(<|<=|=)(\d+)/
   */
  if (!checkRenderDivision(rowNum, divisionString, divisionNum)) {
    return;
  }
  // 6. 渲染颜色
  if (!checkRenderColor(rowNum, colorString, divisionNum)) {
    return;
  }
  // 7. 渲染区间描述
  if (!checkRenderDivisionDescription(rowNum, divisionDescriptionString, divisionNum)) {
    return;
  }
}

function checkTypeTwo(rowNum, type, colsAry) {
  console.log(`checkTypeTwo length: ${colsAry.length}`)
  if (colsAry.length !== 7) {
    addErrorLine(rowNum, '列数错误');
    return;
  }

  const [filename, sldTitle, propertyName, divisionNum, divisionString, colorString, divisionDescriptionString] = colsAry;
  // 1. 文件名检测
  if (filename.length === 0) { // todo
    addErrorLine(rowNum, '文件名不能为空');
    return;
  }

  if (!checkFileName(rowNum, type, filename)) {
    return;
  }

  // 2. SLD描述 // todo
  if (false) {
    // addErrorLine(rowNum, '错误');
  }
  // 3. 渲染属性值 // todo
  if (propertyName.length !== 0) {
    addErrorLine(rowNum, '无需设置渲染属性值');
    return;
  }
  // 4. 渲染段数
  // if (!(/^\d+$/.test(divisionNum.trim()) && parseInt(divisionNum, 10) === 1)) {
  //     addErrorLine(rowNum, '区间段数只能设置值为1');
  //     return;
  // }
  // 5. 渲染区间
  /**
   *  const leftReg = /^x(<|<=|=)(\d+)/;
   *  const rightReg = /^x(>|>=|=)(\d+)/;
   *  const doubleReg = /(\d+)(<|<=|=)x(<|<=|=)(\d+)/
   */
  if (divisionString.length !== 0) {
    addErrorLine(rowNum, '渲染区间无法设置');
    return;
  }
  // 6. 渲染颜色
  if (!checkRenderColor(rowNum, colorString, 1)) {
    return;
  }
  // 7. 渲染区间描述
  if (divisionDescriptionString.length !== 0) {
    addErrorLine(rowNum, '渲染区间描述无法设置');
    return;
  }
}

/**
 * 检测分段区间,如满足条件返回true.
 * 如不满足检测条件, 添加错误信息到checkInfo对象. 返回false.
 * 
 * @param {string} rowNum 
 * @param {string} divisions 
 * @param {string} divisionNum 
 * @returns {boolean}
 */
function checkRenderDivision(rowNum, divisions, divisionNum) {
  let flag = true;
  const num = parseInt(divisionNum, 10); // 分段数
  // 如果区间数不等与分段数.返回false
  if (divisions.split('|').length !== num) {
    flag = false;
    addErrorLine(rowNum, '分段区间段数不匹配区间数');
    return flag;
  }

  const leftReg = /^x(<|<=|=)(\d+)/;
  const rightReg = /^x(>|>=|=)(\d+)/;
  const doubleReg = /(\d+)(<|<=|=)x(<|<=|=)(\d+)/
  const isRightDivision = divisions.split('|').every(divisionStr => {
    return leftReg.test(divisionStr) || rightReg.test(divisionStr) || doubleReg.test(divisionStr)
  })

  if (!isRightDivision) {
    flag = false;
    addErrorLine(rowNum, '分段区间设置有误');
    return flag;
  }
  return flag;
}

function checkRenderColor(rowNum, colorString, divisionNum) {
  let flag = true;
  const num = parseInt(divisionNum, 10); // 分段数
  // 如果区间数不等与分段数.返回false
  if (colorString.split('|').length !== num) {
    flag = false;
    addErrorLine(rowNum, '颜色区间段数不匹配区间数');
    return flag;
  }

  const colorReg = /^#[0-9abcdefABCDEF]{6}$/
  const isRightColor = colorString.split('|').every(String => {
    return colorReg.test(String);
  })

  if (!isRightColor) {
    flag = false;
    addErrorLine(rowNum, '颜色设置有误');
  }
  return flag;
}

function checkRenderDivisionDescription(rowNum, divisionDescriptionString, divisionNum) {
  let flag = true;
  const num = parseInt(divisionNum, 10); // 分段数
  // 如果区间数不等与分段数.返回false
  if (divisionDescriptionString.split('|').length !== num) {
    flag = false;
    addErrorLine(rowNum, '区段描述的段数不匹配区间数');
  }
  return flag;
}

function checkFileName(rowNum, type, fileName) {
  let flag = true;
  switch (type) {
    case '1':
      {
        const gridHeatrenderFileNameRegExp = /\w+_\w+_heat\.sld/
        const isRight = gridHeatrenderFileNameRegExp.test(fileName)
        if (!isRight) {
          flag = false
          addErrorLine(rowNum, '文件名与文件类型1不匹配');
        }
      }
      break;
    case '2':
      {
        const girdRenderFileNameRegExp = /^\w+_\w+_grids\.sld$/
        const isRight = girdRenderFileNameRegExp.test(fileName)
        if (!isRight) {
          flag = false
          addErrorLine(rowNum, '文件名与文件类型2不匹配');
        }
      }
      break;
    case '3':
      {
        const cellRenderFileNameRegExp = /^\w+_value_\w+_line\.sld$/;
        const isRight = cellRenderFileNameRegExp.test(fileName)
        if (!isRight) {
          flag = false
          addErrorLine(rowNum, '文件名与文件类型3不匹配');
        }
      }
      break;
    case '4':
      {
        const cellFileNameRegExp = /^\w+_cell_line\.sld$/
        const isRight = cellFileNameRegExp.test(fileName)
        if (!isRight) {
          flag = false
          addErrorLine(rowNum, '文件名与文件类型4不匹配');
        }
      }
      break;
    case '5':
      {
        const girdPARenderFileNameRegExp = /^\w+_\w+_grids_pa\.sld$/
        const isRight = girdPARenderFileNameRegExp.test(fileName)
        if (!isRight) {
          flag = false
          addErrorLine(rowNum, '文件名与文件类型5不匹配');
        }
      }
      break;
    default:
      {
        flag = false
        addErrorLine(rowNum, '未知的文件名设置');
      }
      break;
  }
  return flag;
}

module.exports = checkLines;