
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
  }
}