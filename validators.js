/**
 * 定义校验器实例
 *
 *
 *
 *
 * @author zte10191772
 */

const Validator = require('./Validator') // 获取构造器
const {
  checkFileName,
  checkRenderDivisionDescription,
  checkRenderColor,
  checkRenderDivision,
  checkParamsLength,
  checkDivisionNum,
  checkSLDType
} = require('./validatorMiddlewares') // 获取中间件


const validatorOne = new Validator();
validatorOneMiddlewares = [checkParamsLength, ]
validatorTypeOne.addCheckMiddleware()


























const validators = {

}

export default validators;
