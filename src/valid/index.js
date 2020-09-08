
/**
 * 校验
 * @author john.gao
 */
'use strict'

export default {

  /**
   * 是否手机号
   * @param {手机号}} value 
   */
  isMobile(value) {
    var reg = /^1\d{10}$/;
    return new RegExp(reg).test(value);
  },

  /**
   * 是否身份证
   * @param {身份证号} value 
   */
  isIdCard(value) {
    var cityCodes = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91];
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
    let r = new RegExp(reg).test(value);
    if (!r) {
      return false;
    } else if (cityCodes.indexOf(parseInt(value.substr(0, 2))) == -1) {
      return false;
    } else if (value.length == 18) {
      // 18位身份证需要验证最后一位校验位
      // 加权因子,∑(ai×Wi)(mod 11)
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; //校验位
      var sum = factor.reduce((total, curr, idx) => {
        return total + curr * value.charAt(idx)
      }, 0);
      return parity[sum % 11] == value.charAt(17);
    }
    return true;
  },

  /**
   * 校验原密码和确认密码
   * @param {String} password 密码
   * @param {String} confirmPassword 确认密码
   * @return {} [description]
   */
  validDoublePassword(opts) {
    if (password.length < 6 || password.length > 20) {
      Toast.show('请输入6-20位新密码');
    } else if (confirmPassword.length < 6 || confirmPassword.length > 20) {
      Toast.show('请输入6-20位确认密码');
    } else if (password !== confirmPassword) {
      Toast.show('两次密码不一致，请检查');
    }
    //长度 6-20
    //两次密码不一致
  }
}