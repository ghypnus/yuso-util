import DataUtil from '../data/index';

/**
 * 是否事件传参
 * @param {Object} e 
 */
export const isEvent = (e) => {
    return e && e.preventDefault;
}

/**
 * 递归获取值
 * @param {Object} data 数据
 * @param {*} keys 键的数组
 */
export const getDeptVal = (data, keys = []) => {
    if (!keys.length) return data;
    return getDeptVal(data[keys.slice(0, 1)], keys.slice(1));
}

/**
 * 获取根组件
 * @param {Object} data 组件
 */
export const getRootComponent = (data) => {
    if (data.parent) {
        return getRootComponent(data.parent);
    }
    return data;
}

/**
 * 获取组件
 * @param {Object} data 组件  
 * @param {*} key 唯一标识
 */
export const getComponent = (data, key, childrenKey = 'childList') => {
    let c = getRootComponent(data);
    if (c.key === key) return c;
    return DataUtil.deepFind(c[childrenKey], item => item.key === key, { childrenKey: childrenKey });
}