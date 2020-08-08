
/**
 * 校验
 * @author john.gao
 */
'use strict'

export default {
  
  isMobile(value) {
    var reg = /^1\d{10}$/;
    return new RegExp(reg).test(value);
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