/**
 * 基础工具类
 * @author john.gao
 */
"use strict";

export default {
  /**
   * 地址栏参数
   * @param {string} name 参数名称
   */
  getQueryString(name) {
    var result = null;
    var url = location.hash ? location.hash.indexOf('?') !== -1 ?
      '?' + location.hash.split('?')[1] : location.hash : location.search;
    url = decodeURIComponent(url)
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strArr = str.split("&");
      for (var i = 0; i < strArr.length; i++) {
        if (strArr[i].split("=")[0] == name) {
          result = unescape(strArr[i].split("=")[1]);
          break;
        }
      }
    }
    return result;
  },

  /**
   * 首字母大写
   * @param  {String} word 文字
   * @return {String}      首字母大写后的文字
   */
  capitalizeUpper(word) {
    if (!word) return;
    return word.length > 1 ? word.substring(0, 1).toUpperCase() + word.substr(1) : word.substring(0, 1).toUpperCase()
  },

  /**
   * 首字母小写
   * @param  {String} word 文字
   * @return {String}      首字母小写后的文字
   */
  capitalizeLower(word) {
    if (!word) return;
    return word.length > 1 ? word.substring(0, 1).toLowerCase() + word.substr(1) : word.substring(0, 1).toLowerCase()
  },

  /**
   * 去除前后空格
   * @param  {String} str 字符串
   */
  trim(str){
    if(str === null || str === undefined || str === "") return "";
    let value = str.replace(/(^\s*)|(\s*$)/g, "");
    return value;
  },

  /**
   * 判断是否为空对象
   * @param  {Object}  obj 对象
   * @return {Boolean}     true or false
   */
  isEmptyObject(obj) {
    return obj === undefined || obj === null || Object.keys(obj).length === 0 ? true : false;
  },

  /**
   * 判断是否是子元素
   * @param  {Node}  parent 父元素
   * @param  {Node}  child  子元素
   * @return {Boolean}        true or false
   */
  isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
}