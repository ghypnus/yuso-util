/**
 * 日期处理工具
 */
'use strict';

export default {
  /**
   * 格式化日期
   * @param date 日期
   * @param format 格式 yyyy-MM-dd HH:mm:ss
   */
  format(date, format) {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "H+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },

  /**
   * 日期解析
   * @param  {String} dateString  日期字符串
   * @return {Date}               日期
   */
  parse(dateString) {
    if (dateString === '' || dateString === undefined || dateString === null) return;
    try {
      dateString = dateString.replace(/\-/g, '/');
      let timestamp = Date.parse(dateString);
      return new Date(timestamp);
    } catch ( e ) {
      return ""
    }
  },

  /**
   * 计算周岁
   * @param {String} date 日期
   */
  getAge(date){
    let d = this.parse(date);
    if(d){
      let year = d.getFullYear(),
          month = d.getMonth() + 1,
          day = d.getDate();
      let nowDate = new Date();
      let yearDiff = nowDate.getFullYear() - year;
      if(yearDiff > 0){
        let monthDiff = nowDate.getMonth + 1 - month;
        if(monthDiff === 0){
          let dayDiff = nowDate.getDate() - day;
          if(dayDiff < 0){
            return yearDiff - 1;
          }else{
            return yearDiff;
          }
        }else {
          return monthDiff < 0 ? yearDiff - 1 : yearDiff;
        }
      }else {
        return 0
      }
    }
  }
}