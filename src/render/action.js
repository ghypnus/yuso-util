/**
 * 动作
 * @author john.gao
 * @date 2020/09/22
 */
import { getDeptVal, getRootComponent, getComponent, isEvent } from './util';
import React from 'react';
import { v4 } from 'uuid';
import { message, Modal } from 'antd';
import FunctionUtil from '../function/index';

/**
 * 处理类型为`属性`的动作
 * @param {Object} comp 组件
 * @param {Object} action 动作
 */
const dealProps = (comp, action, val, extraData) => {
    const rc = getRootComponent(comp);
    action.value.map(({ condition, method, key, type, value, actions }) => {
        if (condition && !condition(val)) {
            return;
        }
        if (type === 'function') {
            FunctionUtil.newFunction(Array.isArray(val) ? val : typeof val == 'object' ? { ...val, ...extraData } : val, value);
            return;
        }
        const tc = getComponent(comp, key, type);
        if (!tc) return;
        if (!tc.props) tc.props = {};
        if (typeof method === 'function') {
            method(tc, Array.isArray(val) ? val : typeof val == 'object' ? { ...val, ...extraData } : val);
        } else {
            const k = method.slice(-1)[0];
            let p = getDeptVal(tc, method.slice(0, method.length - 1));
            if (value !== undefined) {
                if (typeof value === 'object') {
                    if (value.type === 'function') {
                        let t = Array.isArray(val) ? val : { ...val, ...extraData };
                        new Function(k, 'data', value.value)(p[k], t);
                    } else {
                        p[k] = { ...p[k], ...value }
                    }
                } else if (typeof value === 'function') {
                    const r = value(Array.isArray(val) ? val : { ...val, ...extraData });
                    if (typeof r === 'object') {
                        p[k] = { ...p[k], ...r }
                    } else {
                        p[k] = r;
                    }
                } else {
                    p[k] = value;
                }
            } else {
                if (typeof val === 'object') {
                    if (Array.isArray(val)) {
                        p[k] = val;
                    } else {
                        p[k] = { ...p[k], ...val, data: extraData };
                    }
                } else if (typeof val === 'function') {
                    val();
                } else {
                    p[k] = val;
                }
            }
        }
    })
    rc.reload(rc);
}

/**
 * 处理类型为`接口`的动作
 * @param {Object} comp 组件
 * @param {Object} action 动作
 */
const dealInterface = (comp, action = {}, val, extraData) => {
    const { condition, value, actions, loading } = action;
    if (condition && !condition(val)) {
        return;
    }
    const { url, method, type = 'post', params = {} } = value;
    let newParams = { ...params };
    if (loading) {
        comp.props.loading = true;
        const rc = getRootComponent(comp);
        rc.reload(rc);
    }
    if (method) {
        if (typeof method === 'function') {
            newParams = {
                ...newParams, ...method({ ...val, ...extraData }, comp, {
                    getComponent
                })
            };
        }
    }
    axios[type](url, {
        ...newParams
    }).then(res => {
        if (actions) {
            actions.map(ac => {
                switch (ac.type) {
                    case 'props':
                        dealProps(comp, ac, val, extraData);
                        break;
                    case 'function':
                        new Function('message', 'Modal', 'res', ac.value)(message, Modal, res);
                        break;
                    default:
                        break;
                }
            })
        }
    })
}

/**
 * 处理动作
 * @param {Object} target 当前实例
 * @param {Object} components 组件库
 * @param {Object} comp 组件
 * @param {Object} extraData 额外的参数
 */
export const dealActions = (target, components, comp, extraData) => {
    const { showLabel, actions, type, ...restProps } = comp;
    const { childList = [], ellipsis } = comp;
    if (!comp.props) comp.props = {};

    actions.map(action => {
        const { actionType, type, value = {} } = action;
        if (type === 'render') {
            comp[actionType] = (text, record, index) => {
                let newText = text;
                if (value.type === 'function') {
                    newText = FunctionUtil.newFunction(record, value.value);
                }
                if (showLabel) {
                    if (typeof showLabel === 'function') {
                        if (childList[0]) {
                            childList[0].childList = [showLabel(newText)];
                        }
                    } else {
                        if (childList[0]) {
                            childList[0].childList = [newText];
                        }
                    }
                }
                const children = target.recurrenceRender(components, {
                    ...restProps, type: 'Layout'
                }, record).props.children;
                const newChildren = Array.isArray(children) ? children : [children]
                return ellipsis ? [...newChildren, <components.Tooltip
                    key={v4()}
                    title={newText}
                    placement="topLeft">
                    {newText}
                </components.Tooltip>] : newChildren.length > 0 ? newChildren : newText;
            }
        } else {
            if (actionType) {
                const actionFn = function () {
                    let args = [].slice.call(arguments).reduce((r, c) => {
                        let v = isEvent(c) ? null : c;
                        if (Array.isArray(c)) {
                            return [...r ? r : [], ...v]
                        } else if (typeof c === 'object') {
                            return { ...r, ...v }
                        } else {
                            return c;
                        }
                    }, undefined)
                    switch (type) {
                        case 'props':
                            dealProps(comp, action, args, extraData);
                            break;
                        case 'function':
                            new Function(action.value);
                            break;
                        case 'interface':
                            dealInterface(comp, action, args, extraData);
                            break;
                        default:
                            break;
                    }
                }
                comp.props[actionType] = actionFn
            } else {
                switch (type) {
                    case 'function':
                        action.method();
                        break;
                }
            }

        }

    })
}