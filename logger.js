const DEFAULT_COLORS = {
    logColor: '#562BD2',
    debugColor: '#30BB41',
    infoColor: '#ABB242',
    successColor: '#2FB637',
    warnColor: '#CE33DB',
    errorColor: '#FF0000'
  }
class Logger {
    constructor(options) {
        const {
            logColor, debugColor, infoColor, successColor, warnColor, errorColor
        } = options
        this._logColor = logColor
        this._debugColor = debugColor
        this._infoColor = infoColor
        this._successColor = successColor
        this._warnColor = warnColor
        this._errorColor = errorColor
    }
  
    _logger(field, color = this._logColor, ...args) {
      console.log(`%c${field}`, `color:${color};`, ...args)
    }
  
    log(field, ...args) {
        this._logger(field, this._logColor, ...args)
    }
  
    info(field, ...args) {
        this._logger(field, this._infoColor, ...args)
    }
  
    warn(field, ...args) {
        this._logger(field, this._warnColor, ...args)
    }
  
    success(field, ...args) {
        this._logger(field, this._successColor, ...args)
    }
  
    error(field, ...args) {
        this._logger(field, this._errorColor, ...args)
    }
  
    debug(field, ...args) {
        this._logger(field, this._debugColor, ...args)
    }
}
  
function loggerGenerator(options = {}) {
    const mergeOptions = Object.assign({}, DEFAULT_COLORS, options)
    return new Logger(mergeOptions)
}

module.exports = loggerGenerator
  