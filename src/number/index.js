
/**
 * 基础工具类
 * @author john.gao
 */
"use strict";

export default {
  /**
   * 处理数值小数点位数
   * @param numberRound
   * @param roundDigit
   * @return {number}
   */
  roundFun(numberRound, roundDigit) {
    if (numberRound >= 0) {
      var tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
      return tempNumber;
    } else {
      var numberRound1 = -numberRound;
      var tempNumber = parseInt((numberRound1 * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
      return -tempNumber;
    }
  },
  /**
   * 千分位
   * @param {Number} value 数值 
   */
  thousands(value) {
    if (Number.isInteger(value)) {
      return String(value).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    } else {
      return Number(value).toLocaleString();
    }
  },
  /**
   * 数值相加（处理溢出）
   * @param {Number} one 数值一
   * @param {Number} two 数值二 
   */
  numberAdd(one, two) {
    var oneArr = String(one).split(".");
    var twoArr = String(two).split(".");
    var opn = oneArr.length > 1 ? oneArr[1].length : 0;
    var tpn = twoArr.length > 1 ? twoArr[1].length : 0;
    var m = opn > tpn ? opn : tpn;
    var oneBig = Number((one + "").replace(".", "")) * Math.pow(10, m - opn);
    var twoBig = Number((two + "").replace(".", "")) * Math.pow(10, m - tpn);
    return (oneBig + twoBig) / Math.pow(10, m);
  }
}