/**
 * 缓存工具类
 * @author john.gao
 */
"use strict";

import NumberUtil from '../number/index';
import {Native} from 'yuso-mobile-native';

export default {

  /**
   * 存储
   * @param key
   * @param val
   */
  set(key, val) {
    var self = this;
    if (key) {
      Native.setCache(key, self.stringify(val));
      // window.localStorage.setItem(key,  self.stringify(val));
    }
  },

  /**
   * 获取
   * @param key
   * @returns {*}
   */
  get(key) {
    var self = this;
    if (key) {
      //TODO 异步处理
      var result = Native.getCache(key);
      return self.deserialize(result);
      // return self.deserialize(window.localStorage.getItem(key));
    } else {
      return '';
    }
  },

  /**
   * 获取接口
   * @param json
   */
  getRequestCache(json) {
    var self = this;
    return self.cache_interface.getInterface(json);
  },

  /**
   * 设置接口
   * @param json
   * @param data
   */
  setRequestCache(json, data) {
    var self = this;
    self.cache_interface.setInterface(json, data);

  },

  /**
   * 清除缓存
   * @param prefix
   */
  clear(excList) {
    excList = excList || []
    for (var i = window.localStorage.length - 1; i >= 0; i--) {
      var k = window.localStorage.key(i);
      if (excList.indexOf(k) == -1) this.remove(k);
    }
  },

  /**
   * 删除
   * @param key
   * @returns {*}
   */
  remove(key) {
    Native.removeCache(key);
    // window.localStorage.removeItem(key);
  },

  /**
   * 是否存在
   * @param key
   * @returns {*}
   */
  has(key) {
    return window.localStorage.getItem(key) !== undefined;
  },

  /**
   * 键值列表
   * @returns {Array}
   */
  keys() {
    var self = this;
    var arr = [];
    self.forEach(function(k, list) {
      arr.push(k);
    });
    return arr;
  },

  /**
   * 缓存键值总数
   * @returns {Number}
   */
  size() {
    var self = this;
    return self.keys().length;
  },

  /**
   * 遍历
   * @param callback
   */
  forEach(callback) {
    var self = this;
    for (var i = 0; i < window.localStorage.length; i++) {
      var key = window.localStorage.key(i);
      if (callback(key, self.get(key)) === false) break;
    }
  },

  /**
   * 搜索键值
   * @param key
   * @returns {{}}
   */
  search(key) {
    var self = this;
    var arr = self.keys(),
      obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(key) > -1)
        obj[arr[i]] = self.get(arr[i]);
    }
    return obj;
  },

  /**
   * 是否是json
   * @param obj
   * @returns {boolean}
   */
  isJSON(obj) {
    return typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
  },

  /**
   * json转字符串
   * @param val
   * @returns {string}
   */
  stringify(val) {
    return val === undefined || val === null || typeof val === "function" ? val + "" : JSON.stringify(val);
  },


  /**
   * 字符串转json
   * @param val
   * @returns {*}
   */
  deserialize(val) {
    if (typeof val !== "string") {
      return undefined;
    }
    try {
      return JSON.parse(val);
    } catch ( e ) {
      return val || undefined;
    }
  },

  /**
   * 是否是函数
   * @param val
   * @returns {boolean}
   */
  isFunction(val) {
    return {}.toString.call(val) === "[object Function]";
  },

  /**
   * 已缓存大小
   */
  getSize() {
    var self = this,
      size = 0;
    self.forEach(function(k, list) {
      size += self.stringify(list).length;
    });
    return self.formatSize(size);
  },

  /**
   * 格式化文件大小
   * @param value
   * @return {*}
   */
  formatSize(value) {
    if (null == value || value == '') {
      return "0 Bytes";
    }
    var unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var index = 0;
    var quotient = parseFloat(value);
    while (quotient > 1024) {
      index += 1;
      quotient = quotient / 1024;
    }
    return NumberUtil.roundFun(quotient, 2) + "" + unitArr[index];
  }
}