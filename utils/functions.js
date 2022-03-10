module.exports = class Functions {
  constructor() {
    this.getApi = require("./api")
  }


  delay(ms) {new Promise(res => setTimeout(res, ms))}

  clear(message) { return message.replace(/✫|✪|⚝/g, '?').replace(/§|¡±/g, '�').replace(/�[0-9A-FK-OR]/gi, '') }

  f(number, max=2) {
    if (!Number(number)) return number
    return Number(number).toLocaleString('en', {minimumFractionDigits: 0, maximumFractionDigits: max})
  }

}
