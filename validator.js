/**
 * @author zte10191772
 * @decription a validator tools.
 */
class Validator {

  constructor() {
    this.checkInfo = { // initi checkInfo
      isCorrect: true,
      Info: ''
    }
    this.middleWares = [] // init middlewarex
  }

  /**
   * add error Into checkInfo
   * @param {number} rowNum    - error line
   * @param {string} errorInfo - error message
   * @api private
   */
  _addErrorLine(rowNum, errorInfo) {
    if (this.checkInfo.isCorrect) {
      this.checkInfo.isCorrect = false;
    }
    let template = `Error line: ${rowNum} , Error Message:　${errorInfo} \n`
    this.checkInfo.Info = this.checkInfo.Info + template
  }

  /**
   * add checkMiddleware function
   * @param {function|array} funcs - return function
   * @api public
   */
  addCheckMiddleware(middlewarePara) {
    if (Array.isArray(middlewarePara)) {
      middlewarePara.forEach(x => this.middleWares.push(x))
    } else if (typeof middlewarePara === 'function') {
      this.middleWares.push(middlewarePara)
    } else {
      this.middleWares.push(middlewarePara)
      // throw new TypeError("para type don't match, need a function or array")
    }
  }

  /**
   * exec validate and output checkInfo
   * @param  {object} params - params
   * @return {object} - checkinfo
   * @api public
   */
  execValidate(params) {
    this.checkInfo = { // reIniti checkInfo
      isCorrect: true,
      Info: ''
    }

    const addErrorLine = this._addErrorLine.bind(this)
    this.middleWares.forEach(fn => {fn(params, addErrorLine)})
    return this.checkInfo
  }
}

module.exports = Validator
