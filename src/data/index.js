/**
 * 数据处理工具
 */
'use strict';

export default {
  /**
   * list转map
   * @param {array} list 数组
   * @param {String} keyK key对应list中的key值
   * @param {String} keyV value对应list中的key值
   */
  convertListToMap(list, keyK, keyV) {
    if (!list || list.length == 0) return {};
    var map = {};
    for (var i = 0; i < list.length; i++) {
      var key = list[i][keyK],
        value = list[i][keyV];
      map[key] = value;
    }
  },

  /**
   * head、data转list
   * @param  {[type]} headList feild列表
   * @param  {[type]} dataList value列表
   */
  convertHeadDataToList(headList, dataList) {
    var self = this;
    if (!dataList || !dataList.length) return [];
    var resultList = [];
    dataList.map(function(dataItem) {
      var mList = [];
      var keyList = Object.keys(dataItem);
      keyList = keyList.map(function(item) {
        return {
          index: headList.findIndex(function(headItem) {
            return headItem.field === item
          }),
          key: item
        }
      })
      keyList.sort(function(oldV, newV) {
        return oldV.index - newV.index
      })
      keyList.map(function(item) {
        var key = item.key;
        var headItem = self.getItemByKey(headList, key);
        var resultItem = headItem != null ? Object.assign(headItem, {
          label: headItem.text,
          extra: dataItem[key],
          extraV: dataItem[key + '-v'] || ''
        }) : {
          extra: dataItem[key]
        };
        mList.push(resultItem)
      })
      resultList.push(mList);
    })
    return resultList;
  },

  /**
   * 数据转化
   * @param  {Array} dataList 数据源
   * @param  {String} keyF    label 的 key
   * @param  {[type]} valueF  value 的 key
   */
  convertDataToList(dataList, keyF, valueF) {
    if (!dataList || !dataList.length) return [];
    return dataList.map(function(dataItem) {
      return {
        label: dataItem[keyF],
        value: dataItem[valueF]
      }
    })
  },

  /**
   * 根据key从数组中获取对象
   * @param {Array} list 列表
   * @param {String} key
   * @return {Object} 对象
   */
  getItemByKey(list, key) {
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
  getItemByKeyValue(list, key, value) {
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
  recurrence(data = [], opts = {}) {
    var idKey = opts.idKey || 'id';
    var nameKey = opts.nameKey || 'region_name';
    var parentKey = opts.parentKey || 'parentId';
    var childrenKey = opts.childrenKey || 'children';
    var valueKey = opts.valueKey || 'value';
    var labelKey = opts.labelKey || 'label';
    var dataList = data.map(function(item) {
      return {
        [valueKey]: item[idKey],
        [labelKey]: item[nameKey],
        [parentKey]: item[parentKey]
      }
    })
    var __recurrenceList = function(list) {
      return list.map(function(item) {
        var childList = dataList.filter(function(child) {
          return child[parentKey] === item[valueKey];
        });
        var array = __recurrenceList(childList);
        return array.length > 0 ? Object.assign({}, item, { path: [], [childrenKey]: array }) : item;
      })
    }
    var result = dataList.filter(function(item) {
      return item[parentKey] === '';
    }).map(function(item) {
      return Object.assign({}, item, { path: [item[valueKey]] })
    })
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
  recurrenceValue(data = [], value, opts = {}) {
    var idKey = opts.idKey || 'id';
    var parentKey = opts.parentKey || 'parentId';
    var result = [];
    var __recurrenceList = function(list, val) {
      var item = list.find(function(obj) {
        return obj[idKey] === val
      })
      result.unshift(item[idKey]);
      if (item[parentKey] !== '') {
        __recurrenceList(data, item[parentKey]);
      }
      return result;
    }
    return __recurrenceList(data, value);
  },

  /**
   * 递归查找 
   * @param {Array} list 数据源
   * @param {Function} func 函数
   * @param {Object} opts 自定义参数
   */
  deepFind(list, func, opts = {}) {
    var childrenKey = opts.childrenKey || 'children';
    let result = null;
    var __deepFind = (list) => {
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
    }
    return __deepFind(list);
  },

  /**
   * 递归查找父节点
   * @param {Array} list 数据源
   * @param {String} key 键值
   * @param {Any} val 值
   * @param {Object} opts 自定义参数
   */
  deepFindParent(list, key, val, opts = {}){
    var childrenKey = opts.childrenKey || 'children';
    let result = null;
    var __deepFindParent = array => {
      let childList = Array.isArray(array) ? array : array.children;
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
    }
    return __deepFindParent(list);
  },

  /**
   * 递归交换位置 
   * @param {Array} list 数据源
   * @param {Object} a
   * @param {Object} b
   * @param {Object} opts 自定义参数
   */
  deepSwap(list, from, target, opts= {}) {
    let fromParent = this.deepFindParent(list, '__objectId__', from, opts);
    let targetParent = this.deepFindParent(list, '__objectId__', target, opts);
    fromParent = Array.isArray(fromParent) ? fromParent : fromParent.children;
    targetParent = Array.isArray(targetParent) ? targetParent : targetParent.children;
    let fromIdx = fromParent.findIndex(o=> o.__objectId__ === from);
    let targetIdx = targetParent.findIndex(o => o.__objectId__ === target);
    let array = fromParent.splice(fromIdx, 1);
    targetParent.splice(targetIdx, 0, array[0]);
  },

  /**
   * 递归包含
   * @param {Array} list 数据源
   * @param {Object} from
   * @param {Object} target
   * @param {Object} opts 自定义参数
   */
  deepContains(list, from, target, opts={}){
    let item = this.deepFind(list, item => item.__objectId__ === from, opts);
    let array = Array.isArray(item) ? item : item.children ? item.children : [];
    return array.map(o=>o.__objectId__).indexOf(target) !== -1
  },

  /**
   * 递归删除
   * @param {Array} list 数组
   * @param {String} key 
   * @param {String} val
   */
  deepDelete(list, key, val, opts = {}) {
    let childrenKey = opts.childrenKey || 'children';
    let __deepDelete = (array)=> {
      for (var idx = 0; idx < array.length; idx++) {
        var item = array[idx];
        if (item[key] && item[key] === val) {
          array.splice(idx, 1);
          break;
        } else if (item[childrenKey] && item[childrenKey].length > 0) {
          __deepDelete(item[childrenKey]);
        }
      }
    }
    return __deepDelete(list);
  },

  /**
   * 深拷贝 
   * @param {Any} data 
   */
  deepClone(data){
    let result = Array.isArray(data) ? [] : {};
    for(let key in data){
      if(data.hasOwnProperty(key)){
        if(typeof data[key] === 'object'){
          result[key] = this.deepClone(data[key]);
        }else {
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
  deepFilter(list, func, opts = {}) {
    var childrenKey = opts.childrenKey || 'children';
    var __deepFilter = function(array, func) {
      return array.filter((item, idx) => {
        if (item[childrenKey] && item[childrenKey].length > 0) {
          item[childrenKey] = __deepFilter(item[childrenKey], func)
        }
        return func(item, idx)
      })
    }
    return __deepFilter(this.deepClone(list), func);
  },

  /**
   * 递归筛选 - 结果是一纬数组
   * @param {Array} list 数组
   * @param {Function} func 函数
   * @param {*} opts 其他参数
   */
  deepFilterToArray(list, func, opts = {}) {
    var childrenKey = opts.childrenKey || 'children';
    var result = [];
    var __deepFilter = function(list, func) {
      for (var idx = 0; idx < list.length; idx++) {
        let item = list[idx];
        if (func(item, idx)) {
          result.push(item)
        } else if (item[childrenKey] && item[childrenKey].length > 0) {
          __deepFilter(item[childrenKey], func);
        }
      }
      return result;
    }
    return __deepFilter(list, func);
  },

  /**
   * 递归删除键值
   * @param {Array} list 数组
   * @param {String} key 键值
   * @param {Object} opts 参数
   */
  deepDeleteKey(list, key, opts = {}) {
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
  unique(list) {
    const res = new Map();
    return list.filter(v => !res.has(v) && res.set(v, 1))
  },

  /**
   * 数组去重带函数
   * @param {Array} list 数组
   * @param {Function} func 函数
   */
  uniqueBy(list, func) {
    const res = new Map();
    return list.filter((item, idx) => {
      let v = func(item, idx);
      return !res.has(v) && res.set(v, 1)
    })
  },

  /**
   * 多条件排序
   * @param {Array} list 数据
   * @param {Array} keyList 排序字段
   * @param {Array} typeList 升级/降序
   */
  sortBy(list, keyList, typeList = []) {
    let __getSort = fn => {
      return (a, b) => {
        let ret = 0;
        if (fn.call(this, a, b)) {
          ret = -1;
        } else if (fn.call(this, b, a)) {
          ret = 1;
        }
        return ret;
      }
    }
    let __getMultiSort = (arr) => {
      return (a, b) => {
        let temp, i = 0;
        do {
          temp = arr[i++](a, b);
        } while (temp == 0 && i < arr.length)
        return temp
      }
    }

    let sortList = keyList.map((key, idx) => {
      let type = typeList[idx] || 'asc';
      return __getSort((a, b) => {
        if (type === 'asc') {
          return a[key] < b[key]
        } else {
          return a[key] > b[key]
        }
      })
    })
    return list.sort(__getMultiSort(sortList))
  },
  cutStringByLength(str, len, dotStr) {
    var strlen = 0;  
    var s = "";  
    dotStr = dotStr || ''
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
}