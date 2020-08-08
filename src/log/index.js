/**
 * 日志处理工具
 */
'use strict';

export default {
  
  /**
   * 打印错误日志
   * @param {String} message 日志内容
   */
  error(message) {
    if(process.env.NODE_ENV !== 'production'){
      let content = `${message}`;
      console.error(content);
    }
  },
  info(message, data= ''){
    if(process.env.NODE_ENV !== 'production'){
      let content = `${message}`;
      console.log(content, data);
    }
  }
}