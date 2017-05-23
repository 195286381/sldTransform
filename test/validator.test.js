/**
 *@author zte10191772
 */
const { expect } = require('chai')
const Validator = require('../Validator')

describe('校验validator', () => {

  it('添加空的校验器,检测返回结果', () => {
    const newValidator = new Validator();
    expect(newValidator).to.be.a('object')
    expect(newValidator.execValidate()).to.deep.equal({isCorrect: true, Info: ''}) // 字符串校验
  })

  it('往校验器中,添加单个中间件函数,检测返回结果', () => { //
    const newValidator = new Validator();
    const checkInfo = newValidator.addCheckMiddleware((params, addErrorLine) => {
      addErrorLine(1, 'errorMessage')
    })
    expect(newValidator.execValidate()).to.deep.equal({
      isCorrect: false,
      Info: `Error line: 1 , Error Message:　errorMessage \n`
    })
  })

  it('往校验器中, 添加多个中间件,检测返回结果.', () => {
    const newValidator = new Validator();
    const middlewarefunOne = (params, addErrorLine) => {
      addErrorLine(1, 'errorMessage_1')
    }
    const middlewarefunTwo = (params, addErrorLine) => {
      addErrorLine(2, 'errorMessage_2')
    }
    newValidator.addCheckMiddleware([middlewarefunOne, middlewarefunTwo]);
    const checkResult = newValidator.execValidate();
    expect(checkResult).to.deep.equal({
      isCorrect: false,
      Info: `Error line: 1 , Error Message:　errorMessage_1 \nError line: 2 , Error Message:　errorMessage_2 \n`
    })
  })
})

