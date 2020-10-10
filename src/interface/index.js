/**
 * 接口工具/数据中心
 * @author john.gao
 */
"use strict";

export default {
    async post({ url, params = {}, path }) {
        return axios.post(url, params).then(res => {
            return res
        })
    }
}