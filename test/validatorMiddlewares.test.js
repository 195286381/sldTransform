const Validator = require('../Validator')
const middlewares = require('../validatorMiddlewares')
const expect = require('chai').expect

/**
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

describe('validatorMiddlewares 校验', () => {

  //////////////
  // 中间件校验 //
  //////////////

  describe('校验参数长度中间件 checkParamsLength', () => {
    it('校验参数长度 checkParamsLength', () => {
      const newValidator = new Validator()
      newValidator.addCheckMiddleware(middlewares.checkParamsLength)
      const params = {
        rowNum: 1
      }
      const checkInfo = newValidator.execValidate(params)
      expect(checkInfo).to.deep.equal(
        {
          isCorrect: false,
          Info: 'Error line: 1 , Error Message:　列数错误 \n'
        }
      )
    });
  })

  describe('校验渲染区间中间件 checkRenderDivision', () => {
    const newValidator = new Validator()
    newValidator.addCheckMiddleware(middlewares.checkRenderDivision)
    let params, checkInfo

    it('测试用例1, 执行校验', () => {
      params = {
        rowNum: 1,
        divisionNum: 2,
        divisionsString: 'x<1|x>2',
      }
      checkInfo = newValidator.execValidate(params)
      expect(checkInfo).to.deep.equal({ isCorrect: true, Info: '' })
    });

    it('测试用例2, 执行校验', () => {
      params = {
        rowNum: 1,
        divisionNum: 2,
        divisionsString: 'y<2|x>2',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(false)
    })

    it('测试用例3, 执行校验', () => {
      params = {
        rowNum: 1,
        divisionNum: 1,
        divisionsString: 'y<2|x>2',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(false)
    })
  });

  describe('校验渲染区间颜色中间件 checkRenderColor', () => {
    const newValidator = new Validator()
    newValidator.addCheckMiddleware(middlewares.checkRenderColor)
    let params, checkInfo

    it('测试用例1, 执行校验', () => {
      params = {
        rowNum: 1,
        divisionNum: '2',
        colorString: '#222222|#333333',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    })

    it('测试用例2, 执行校验', () => {
      params = {
        rowNum: 1,
        divisionNum: '2',
        colorString: '#222222|#ffffff',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    })

    it('测试用例3, 执行校验', () => {
      params = {
        rowNum: 1,
        divisionNum: '2',
        colorString: '#2222222|#ffffff',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(false)
    })

    it('测试用例4, 执行校验', () => {
      params = {
        rowNum: 1,
        divisionNum: '1',
        colorString: '#2222222|#ffffff',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(false)
    })
  });

  describe('文件名检测中间件 checkFileName', () => {
    const newValidator = new Validator()
    newValidator.addCheckMiddleware(middlewares.checkFileName)
    let params, checkInfo

    it('测试用例1 类型1-热力图类型, 执行校验', () => {
      params = {
        rowNum: 1,
        type: '1',
        filename: 'lte_xxxx_heat.sld',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    })

    it('测试用例2 类型2-栅格渲染类型, 执行校验', () => {
      params = {
        rowNum: 1,
        type: '2',
        filename: 'let_voltexxxl_grids.sld',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    })

    it('测试用例3 类型3-小区渲染类型, 执行校验', () => {
      params = {
        rowNum: 1,
        type: '3',
        filename: 'lte_value_setup_line.sld',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    })

    it('测试用例4 类型4-小区染类型, 执行校验', () => {
      params = {
        rowNum: 1,
        type: '4',
        filename: 'lte_cell_line.sld',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    expect(checkInfo.Info).to.be.a('string')
    })

    it('测试用例5 类型5-栅格渲染类型, 执行校验', () => {
      params = {
        rowNum: 1,
        type: '5',
        filename: 'let_setup_grids_pa.sld',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    expect(checkInfo.Info).to.be.a('string')
    })

  })

  describe('检查渲染区间描述中间件 checkRenderDivisionDescription', () => {
    const newValidator = new Validator()
    newValidator.addCheckMiddleware(middlewares.checkRenderDivisionDescription)
    let params, checkInfo

    it('测试用例1', () => {
      params = {
        rowNum: 1,
        divisionNum: '1',
        divisionDescriptionString: 'lte_xxxx_heat.sld',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    })
  });

  describe('检查渲染区间分段中间件 checkDivisionNum', () => {
    const newValidator = new Validator()
    newValidator.addCheckMiddleware(middlewares.checkDivisionNum)
    let params, checkInfo

    it('测试用例1', () => {
      params = {
        rowNum: 1,
        divisionNum: '1',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(true)
    })

    it('测试用例2', () => {
      params = {
        rowNum: 1,
        divisionNum: 'a1',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(false)
    })

    it('测试用例3', () => {
      params = {
        rowNum: 1,
        divisionNum: '01',
      }
    checkInfo = newValidator.execValidate(params)
    expect(checkInfo.isCorrect).to.be.equal(false)
    })
  });

  describe('检查SLD类型中间件 checkSLDType', () => {
    const newValidator = new Validator()
    newValidator.addCheckMiddleware(middlewares.checkSLDType)
    let params, checkInfo

    it('测试用例1', () => {
      params = {
        rowNum: 1,
        type: 1,
      }
      checkInfo = newValidator.execValidate(params)
      expect(checkInfo.isCorrect).to.be.equal(true)
    })

     it('测试用例2', () => {
      params = {
        rowNum: 1,
        type: '1',
      }
      checkInfo = newValidator.execValidate(params)
      expect(checkInfo.isCorrect).to.be.equal(false)
    })
  });

});
