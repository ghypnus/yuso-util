/**
 * yuso-util
 * author : john
 * homepage :
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var yusoMobileNative = require('yuso-mobile-native');

/**
 * 基础工具类
 * @author john.gao
 */
"use strict";

var index = {
  /**
   * 地址栏参数
   * @param {string} name 参数名称
   */
  getQueryString: function getQueryString(name) {
    var result = null;
    var url = location.hash ? location.hash.indexOf('?') !== -1 ? '?' + location.hash.split('?')[1] : location.hash : location.search;
    url = decodeURIComponent(url);
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
  capitalizeUpper: function capitalizeUpper(word) {
    if (!word) return;
    return word.length > 1 ? word.substring(0, 1).toUpperCase() + word.substr(1) : word.substring(0, 1).toUpperCase();
  },


  /**
   * 首字母小写
   * @param  {String} word 文字
   * @return {String}      首字母小写后的文字
   */
  capitalizeLower: function capitalizeLower(word) {
    if (!word) return;
    return word.length > 1 ? word.substring(0, 1).toLowerCase() + word.substr(1) : word.substring(0, 1).toLowerCase();
  },


  /**
   * 去除前后空格
   * @param  {String} str 字符串
   */
  trim: function trim(str) {
    if (str === null || str === undefined || str === "") return "";
    var value = str.replace(/(^\s*)|(\s*$)/g, "");
    return value;
  },


  /**
   * 判断是否为空对象
   * @param  {Object}  obj 对象
   * @return {Boolean}     true or false
   */
  isEmptyObject: function isEmptyObject(obj) {
    return obj === undefined || obj === null || Object.keys(obj).length === 0 ? true : false;
  },


  /**
   * 判断是否是子元素
   * @param  {Node}  parent 父元素
   * @param  {Node}  child  子元素
   * @return {Boolean}        true or false
   */
  isDescendant: function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();













var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/**
 * 数据处理工具
 */
'use strict';

var index$1 = {
  /**
   * list转map
   * @param {array} list 数组
   * @param {String} keyK key对应list中的key值
   * @param {String} keyV value对应list中的key值
   */
  convertListToMap: function convertListToMap(list, keyK, keyV) {
    if (!list || list.length == 0) return {};
    
  },


  /**
   * head、data转list
   * @param  {[type]} headList feild列表
   * @param  {[type]} dataList value列表
   */
  convertHeadDataToList: function convertHeadDataToList(headList, dataList) {
    var self = this;
    if (!dataList || !dataList.length) return [];
    var resultList = [];
    dataList.map(function (dataItem) {
      var mList = [];
      var keyList = Object.keys(dataItem);
      keyList = keyList.map(function (item) {
        return {
          index: headList.findIndex(function (headItem) {
            return headItem.field === item;
          }),
          key: item
        };
      });
      keyList.sort(function (oldV, newV) {
        return oldV.index - newV.index;
      });
      keyList.map(function (item) {
        var key = item.key;
        var headItem = self.getItemByKey(headList, key);
        var resultItem = headItem != null ? Object.assign(headItem, {
          label: headItem.text,
          extra: dataItem[key],
          extraV: dataItem[key + '-v'] || ''
        }) : {
          extra: dataItem[key]
        };
        mList.push(resultItem);
      });
      resultList.push(mList);
    });
    return resultList;
  },


  /**
   * 数据转化
   * @param  {Array} dataList 数据源
   * @param  {String} keyF    label 的 key
   * @param  {[type]} valueF  value 的 key
   */
  convertDataToList: function convertDataToList(dataList, keyF, valueF) {
    if (!dataList || !dataList.length) return [];
    return dataList.map(function (dataItem) {
      return {
        label: dataItem[keyF],
        value: dataItem[valueF]
      };
    });
  },


  /**
   * 根据key从数组中获取对象
   * @param {Array} list 列表
   * @param {String} key
   * @return {Object} 对象
   */
  getItemByKey: function getItemByKey(list, key) {
    if (!list) return null;
    var resultItem = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].field == key) {
        resultItem = Object.assign({
          __index: i
        }, list[i]);
        break;
      }
    }
    return resultItem;
  },


  /**
   * 根据key&&value从数组中获取对象
   * @param {Array} list 列表
   * @param {String} key key
   * @param {String} value value
   * @return {Object} 对象
   */
  getItemByKeyValue: function getItemByKeyValue(list, key, value) {
    if (!list) return null;
    var resultItem = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i][key] === value) {
        resultItem = list[i];
        break;
      }
    }
    return resultItem;
  },

  /**
   * 递归
   * @param {Array} data 数组
   * @param {Function} filterFn 函数
   * @param {Object} opts 参数 对象中包括(childrenKeyName、idKeyName、parentKeyName)
   * @param {String} childrenKeyName 子集的key名
   * @param {String} idKeyName 唯一编号ID
   * @param {String} parentKeyName 父级ID
   * @param {String} valueKeyName 显示ID
   * @param {String} labelKeyName 显示Label
   */
  recurrence: function recurrence() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var idKey = opts.idKey || 'id';
    var nameKey = opts.nameKey || 'region_name';
    var parentKey = opts.parentKey || 'parentId';
    var childrenKey = opts.childrenKey || 'children';
    var valueKey = opts.valueKey || 'value';
    var labelKey = opts.labelKey || 'label';
    var dataList = data.map(function (item) {
      var _ref;

      return _ref = {}, defineProperty(_ref, valueKey, item[idKey]), defineProperty(_ref, labelKey, item[nameKey]), defineProperty(_ref, parentKey, item[parentKey]), _ref;
    });
    var __recurrenceList = function __recurrenceList(list) {
      return list.map(function (item) {
        var childList = dataList.filter(function (child) {
          return child[parentKey] === item[valueKey];
        });
        var array = __recurrenceList(childList);
        return array.length > 0 ? Object.assign({}, item, defineProperty({ path: [] }, childrenKey, array)) : item;
      });
    };
    var result = dataList.filter(function (item) {
      return item[parentKey] === '';
    }).map(function (item) {
      return Object.assign({}, item, { path: [item[valueKey]] });
    });
    return __recurrenceList(result);
  },


  /**
   * 根据最后层级的值，递归获取所有层级的值
   * @param {Array} data 数组
   * @param {Any} value 值
   * @param {Object} opts 参数 对象中包括 (childrenKeyName、idKeyName、parentKeyName)
   * @param {String} idKeyName 唯一编号ID
   * @param {String} parentKeyName 父级ID
   */
  recurrenceValue: function recurrenceValue() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var value = arguments[1];
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var idKey = opts.idKey || 'id';
    var parentKey = opts.parentKey || 'parentId';
    var result = [];
    var __recurrenceList = function __recurrenceList(list, val) {
      var item = list.find(function (obj) {
        return obj[idKey] === val;
      });
      result.unshift(item[idKey]);
      if (item[parentKey] !== '') {
        __recurrenceList(data, item[parentKey]);
      }
      return result;
    };
    return __recurrenceList(data, value);
  },


  /**
   * 递归查找 
   * @param {Array} list 数据源
   * @param {Function} func 函数
   * @param {Object} opts 自定义参数
   */
  deepFind: function deepFind(list, func) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var childrenKey = opts.childrenKey || 'children';
    var result = null;
    var __deepFind = function __deepFind(list) {
      for (var idx = 0; idx < list.length; idx++) {
        var item = list[idx];
        if (func(item, idx)) {
          result = item;
          break;
        } else if (item[childrenKey] && item[childrenKey].length > 0) {
          __deepFind(item[childrenKey]);
        }
      }
      return result;
    };
    return __deepFind(list);
  },


  /**
   * 递归查找父节点
   * @param {Array} list 数据源
   * @param {String} key 键值
   * @param {Any} val 值
   * @param {Object} opts 自定义参数
   */
  deepFindParent: function deepFindParent(list, key, val) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var childrenKey = opts.childrenKey || 'children';
    var result = null;
    var __deepFindParent = function __deepFindParent(array) {
      var childList = Array.isArray(array) ? array : array.children;
      for (var idx = 0; idx < childList.length; idx++) {
        var item = childList[idx];
        if (item[key] && item[key] === val) {
          result = array;
          break;
        } else if (item[childrenKey] && item[childrenKey].length > 0) {
          __deepFindParent(item);
        }
      }
      return result;
    };
    return __deepFindParent(list);
  },


  /**
   * 递归交换位置 
   * @param {Array} list 数据源
   * @param {Object} a
   * @param {Object} b
   * @param {Object} opts 自定义参数
   */
  deepSwap: function deepSwap(list, from, target) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var fromParent = this.deepFindParent(list, '__objectId__', from, opts);
    var targetParent = this.deepFindParent(list, '__objectId__', target, opts);
    fromParent = Array.isArray(fromParent) ? fromParent : fromParent.children;
    targetParent = Array.isArray(targetParent) ? targetParent : targetParent.children;
    var fromIdx = fromParent.findIndex(function (o) {
      return o.__objectId__ === from;
    });
    var targetIdx = targetParent.findIndex(function (o) {
      return o.__objectId__ === target;
    });
    var array = fromParent.splice(fromIdx, 1);
    targetParent.splice(targetIdx, 0, array[0]);
  },


  /**
   * 递归包含
   * @param {Array} list 数据源
   * @param {Object} from
   * @param {Object} target
   * @param {Object} opts 自定义参数
   */
  deepContains: function deepContains(list, from, target) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var item = this.deepFind(list, function (item) {
      return item.__objectId__ === from;
    }, opts);
    var array = Array.isArray(item) ? item : item.children ? item.children : [];
    return array.map(function (o) {
      return o.__objectId__;
    }).indexOf(target) !== -1;
  },


  /**
   * 递归删除
   * @param {Array} list 数组
   * @param {String} key 
   * @param {String} val
   */
  deepDelete: function deepDelete(list, key, val) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var childrenKey = opts.childrenKey || 'children';
    var __deepDelete = function __deepDelete(array) {
      for (var idx = 0; idx < array.length; idx++) {
        var item = array[idx];
        if (item[key] && item[key] === val) {
          array.splice(idx, 1);
          break;
        } else if (item[childrenKey] && item[childrenKey].length > 0) {
          __deepDelete(item[childrenKey]);
        }
      }
    };
    return __deepDelete(list);
  },


  /**
   * 深拷贝 
   * @param {Any} data 
   */
  deepClone: function deepClone(data) {
    var result = Array.isArray(data) ? [] : {};
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (_typeof(data[key]) === 'object') {
          result[key] = this.deepClone(data[key]);
        } else {
          result[key] = data[key];
        }
      }
    }
    return result;
  },


  /**
   * 递归筛选 - 保留原始结构
   * @param {Array} list 数组
   * @param {Function} func 函数
   * @param {*} opts 其他参数
   */
  deepFilter: function deepFilter(list, func) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var childrenKey = opts.childrenKey || 'children';
    var __deepFilter = function __deepFilter(array, func) {
      return array.filter(function (item, idx) {
        if (item[childrenKey] && item[childrenKey].length > 0) {
          item[childrenKey] = __deepFilter(item[childrenKey], func);
        }
        return func(item, idx);
      });
    };
    return __deepFilter(this.deepClone(list), func);
  },


  /**
   * 递归筛选 - 结果是一纬数组
   * @param {Array} list 数组
   * @param {Function} func 函数
   * @param {*} opts 其他参数
   */
  deepFilterToArray: function deepFilterToArray(list, func) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var childrenKey = opts.childrenKey || 'children';
    var result = [];
    var __deepFilter = function __deepFilter(list, func) {
      for (var idx = 0; idx < list.length; idx++) {
        var item = list[idx];
        if (func(item, idx)) {
          result.push(item);
        } else if (item[childrenKey] && item[childrenKey].length > 0) {
          __deepFilter(item[childrenKey], func);
        }
      }
      return result;
    };
    return __deepFilter(list, func);
  },


  /**
   * 递归删除键值
   * @param {Array} list 数组
   * @param {String} key 键值
   * @param {Object} opts 参数
   */
  deepDeleteKey: function deepDeleteKey(list, key) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var childrenKey = opts.childrenKey || 'children';
    for (var idx = 0; idx < list.length; idx++) {
      var item = list[idx];
      if (item[key]) delete item[key];
      if (!!item[childrenKey]) {
        this.deepDeleteKey(item[childrenKey], key, opts);
      }
    }
    return list;
  },


  /**
   * 数组去重
   * @param {Array} list 数组
   */
  unique: function unique(list) {
    var res = new Map();
    return list.filter(function (v) {
      return !res.has(v) && res.set(v, 1);
    });
  },


  /**
   * 数组去重带函数
   * @param {Array} list 数组
   * @param {Function} func 函数
   */
  uniqueBy: function uniqueBy(list, func) {
    var res = new Map();
    return list.filter(function (item, idx) {
      var v = func(item, idx);
      return !res.has(v) && res.set(v, 1);
    });
  },


  /**
   * 多条件排序
   * @param {Array} list 数据
   * @param {Array} keyList 排序字段
   * @param {Array} typeList 升级/降序
   */
  sortBy: function sortBy(list, keyList) {
    var _this = this;

    var typeList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var __getSort = function __getSort(fn) {
      return function (a, b) {
        var ret = 0;
        if (fn.call(_this, a, b)) {
          ret = -1;
        } else if (fn.call(_this, b, a)) {
          ret = 1;
        }
        return ret;
      };
    };
    var __getMultiSort = function __getMultiSort(arr) {
      return function (a, b) {
        var temp = void 0,
            i = 0;
        do {
          temp = arr[i++](a, b);
        } while (temp == 0 && i < arr.length);
        return temp;
      };
    };

    var sortList = keyList.map(function (key, idx) {
      var type = typeList[idx] || 'asc';
      return __getSort(function (a, b) {
        if (type === 'asc') {
          return a[key] < b[key];
        } else {
          return a[key] > b[key];
        }
      });
    });
    return list.sort(__getMultiSort(sortList));
  },
  cutStringByLength: function cutStringByLength(str, len, dotStr) {
    var strlen = 0;
    var s = "";
    dotStr = dotStr || '';
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 128) {
        strlen += 2;
      } else {
        strlen++;
      }
      s += str.charAt(i);
      if (strlen >= len) {
        return s + dotStr;
      }
    }
    return s;
  }
};

/**
 * 日期处理工具
 */
'use strict';

var index$2 = {
  /**
   * 格式化日期
   * @param date 日期
   * @param format 格式 yyyy-MM-dd HH:mm:ss
   */
  format: function format(date, _format) {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "H+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(_format)) {
      _format = _format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(_format)) {
        _format = _format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return _format;
  },


  /**
   * 日期解析
   * @param  {String} dateString  日期字符串
   * @return {Date}               日期
   */
  parse: function parse(dateString) {
    if (dateString === '' || dateString === undefined || dateString === null) return;
    try {
      dateString = dateString.replace(/\-/g, '/');
      var timestamp = Date.parse(dateString);
      return new Date(timestamp);
    } catch (e) {
      return "";
    }
  },


  /**
   * 计算周岁
   * @param {String} date 日期
   */
  getAge: function getAge(date) {
    var d = this.parse(date);
    if (d) {
      var year = d.getFullYear(),
          month = d.getMonth() + 1,
          day = d.getDate();
      var nowDate = new Date();
      var yearDiff = nowDate.getFullYear() - year;
      if (yearDiff > 0) {
        var monthDiff = nowDate.getMonth + 1 - month;
        if (monthDiff === 0) {
          var dayDiff = nowDate.getDate() - day;
          if (dayDiff < 0) {
            return yearDiff - 1;
          } else {
            return yearDiff;
          }
        } else {
          return monthDiff < 0 ? yearDiff - 1 : yearDiff;
        }
      } else {
        return 0;
      }
    }
  }
};

/**
 * 文件工具
 * @author john.gao
 */
'use strict';

var index$3 = {
  /**
   * convert base64 to file
   * @param  {String} base64      base64
   * @param  {String} contentType file type
   * @return {Blob}
   */
  convertBase64ToFile: function convertBase64ToFile(base64, contentType) {
    var byteCharacters = atob(base64);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {
      type: contentType
    });
    return blob;
  },


  /**
   * upload file
   * @param  {Array} list An Array of base64 string
   */
  upload: function upload(params) {
    var self = this;
    var url = params.url,
        token = params.token,
        deviceid = params.deviceid,
        list = params.list,
        paramsJson = params.paramsJson,
        contentType = params.contentType;
    var formData = new FormData();
    if (token) formData.append('token', token);
    if (deviceid) formData.append('deviceid', deviceid);
    if (paramsJson) {
      Object.keys(paramsJson).map(function (key) {
        if (paramsJson[key]) formData.append(key, paramsJson[key]);
      });
    }
    var fileList = list.map(function (item, index) {
      var realBase64 = item.split(',')[1];
      var name = 'file-' + index;
      var value = self.convertBase64ToFile(realBase64, contentType);
      if (value) formData.append(name, value, name + '.png');
    });
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function success(res) {
          resolve(typeof res === 'string' ? JSON.parse(res) : res);
        },
        error: function error(err) {
          reject(err);
        }
      });
    });
  }
};

/**
 * 基础工具类
 * @author john.gao
 */
"use strict";

var NumberUtil = {
  /**
   * 处理数值小数点位数
   * @param numberRound
   * @param roundDigit
   * @return {number}
   */
  roundFun: function roundFun(numberRound, roundDigit) {
    if (numberRound >= 0) {
      var tempNumber = parseInt(numberRound * Math.pow(10, roundDigit) + 0.5) / Math.pow(10, roundDigit);
      return tempNumber;
    } else {
      var numberRound1 = -numberRound;
      var tempNumber = parseInt(numberRound1 * Math.pow(10, roundDigit) + 0.5) / Math.pow(10, roundDigit);
      return -tempNumber;
    }
  }
};

/**
 * 缓存工具类
 * @author john.gao
 */
"use strict";

var index$4 = {

  /**
   * 存储
   * @param key
   * @param val
   */
  set: function set$$1(key, val) {
    var self = this;
    if (key) {
      yusoMobileNative.Native.setCache(key, self.stringify(val));
      // window.localStorage.setItem(key,  self.stringify(val));
    }
  },


  /**
   * 获取
   * @param key
   * @returns {*}
   */
  get: function get$$1(key) {
    var self = this;
    if (key) {
      //TODO 异步处理
      var result = yusoMobileNative.Native.getCache(key);
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
  getRequestCache: function getRequestCache(json) {
    var self = this;
    return self.cache_interface.getInterface(json);
  },


  /**
   * 设置接口
   * @param json
   * @param data
   */
  setRequestCache: function setRequestCache(json, data) {
    var self = this;
    self.cache_interface.setInterface(json, data);
  },


  /**
   * 清除缓存
   * @param prefix
   */
  clear: function clear(excList) {
    excList = excList || [];
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
  remove: function remove(key) {
    yusoMobileNative.Native.removeCache(key);
    // window.localStorage.removeItem(key);
  },


  /**
   * 是否存在
   * @param key
   * @returns {*}
   */
  has: function has(key) {
    return window.localStorage.getItem(key) !== undefined;
  },


  /**
   * 键值列表
   * @returns {Array}
   */
  keys: function keys() {
    var self = this;
    var arr = [];
    self.forEach(function (k, list) {
      arr.push(k);
    });
    return arr;
  },


  /**
   * 缓存键值总数
   * @returns {Number}
   */
  size: function size() {
    var self = this;
    return self.keys().length;
  },


  /**
   * 遍历
   * @param callback
   */
  forEach: function forEach(callback) {
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
  search: function search(key) {
    var self = this;
    var arr = self.keys(),
        obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(key) > -1) obj[arr[i]] = self.get(arr[i]);
    }
    return obj;
  },


  /**
   * 是否是json
   * @param obj
   * @returns {boolean}
   */
  isJSON: function isJSON(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
  },


  /**
   * json转字符串
   * @param val
   * @returns {string}
   */
  stringify: function stringify(val) {
    return val === undefined || val === null || typeof val === "function" ? val + "" : JSON.stringify(val);
  },


  /**
   * 字符串转json
   * @param val
   * @returns {*}
   */
  deserialize: function deserialize(val) {
    if (typeof val !== "string") {
      return undefined;
    }
    try {
      return JSON.parse(val);
    } catch (e) {
      return val || undefined;
    }
  },


  /**
   * 是否是函数
   * @param val
   * @returns {boolean}
   */
  isFunction: function isFunction(val) {
    return {}.toString.call(val) === "[object Function]";
  },


  /**
   * 已缓存大小
   */
  getSize: function getSize() {
    var self = this,
        size = 0;
    self.forEach(function (k, list) {
      size += self.stringify(list).length;
    });
    return self.formatSize(size);
  },


  /**
   * 格式化文件大小
   * @param value
   * @return {*}
   */
  formatSize: function formatSize(value) {
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
};

/**
 * 校验
 * @author john.gao
 */
'use strict';

var index$5 = {
  isMobile: function isMobile(value) {
    var reg = /^1\d{10}$/;
    return new RegExp(reg).test(value);
  },


  /**
   * 校验原密码和确认密码
   * @param {String} password 密码
   * @param {String} confirmPassword 确认密码
   * @return {} [description]
   */
  validDoublePassword: function validDoublePassword(opts) {
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
};

/**
 * 日志处理工具
 */
'use strict';

var index$6 = {

  /**
   * 打印错误日志
   * @param {String} message 日志内容
   */
  error: function error(message) {
    if (process.env.NODE_ENV !== 'production') {
      var content = '' + message;
      console.error(content);
    }
  },
  info: function info(message) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (process.env.NODE_ENV !== 'production') {
      var content = '' + message;
      console.log(content, data);
    }
  }
};

exports.BaseUtil = index;
exports.DataUtil = index$1;
exports.DateUtil = index$2;
exports.FileUtil = index$3;
exports.NumberUtil = NumberUtil;
exports.StoreUtil = index$4;
exports.ValidUtil = index$5;
exports.LogUtil = index$6;
