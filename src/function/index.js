/**
 * 函数工具类
 * @author ghypnus
 */
import moment from 'moment';
import NumberUtil from '../number/index';
import DataUtil from '../data/index';
import { message,Modal } from 'antd';

const utils = {
    moment,
    message,
    Modal,
    NumberUtil,
    DataUtil
}

export default {
    /**
     * 执行new Function
     * @param {Object} data 数据 
     * @param {String} value 函数内容
     */
    newFunction(data, value) {
        return new Function('data', 'utils', value)(data, utils);
    }
}