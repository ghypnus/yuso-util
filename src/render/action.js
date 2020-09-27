/**
 * 动作
 * @author john.gao
 * @date 2020/09/22
 */
import { getDeptVal, getRootComponent, getComponent, isEvent } from './util';
/**
 * 处理类型为`属性`的动作
 * @param {Object} comp 组件
 * @param {Object} action 动作
 */
const dealProps = (comp, action, val, extraData) => {
    const rc = getRootComponent(comp);
    action.value.map(({ method, key, type, value }) => {
        const tc = getComponent(comp, key, type);
        if (!tc) return;
        if (!tc.props) tc.props = {};
        if (typeof method === 'function') {
            method(tc, val);
        } else {
            const k = method.slice(-1)[0];
            let p = getDeptVal(tc, method.slice(0, method.length - 1));
            if (value !== undefined) {
                if (typeof value === 'object') {
                    p[k] = { ...p[k], ...value }
                } else if (typeof value === 'function') {
                    const r = value(val);
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
    const { value, actions } = action;
    const { url, method, type = 'post', params = {} } = value;
    let newParams = { ...params };
    if (method) {
        if (typeof method === 'function') {
            newParams = { ...newParams, ...method({ ...val, ...extraData }) };
        }
    }
    axios[type](url, {
        ...newParams
    }).then(() => {
        if (actions) {
            actions.map(ac => {
                switch (ac.type) {
                    case 'props':
                        dealProps(comp, ac, val, extraData);
                        break;
                    case 'function':
                        ac.method();
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
    const { actions, type, ...restProps } = comp;
    if(!comp.props) comp.props = {};

    actions.map(action => {
        const { actionType, type } = action;
        if (type === 'render') {
            comp[actionType] = (text, record, index) => {
                //TODO 暂时通过判断有值则显示子组件
                const { childList = [] } = restProps;
                childList.map(child => {
                    if (child.props && child.props.visible !== undefined) {
                        child.props.visible = !!text
                    }
                });
                const children = target.recurrenceRender(components, {
                    ...restProps, type: 'Layout'
                }, record).props.children;
                return [...Array.isArray(children) ? children : [children], text];
            }
        } else {
            if (actionType) {
                const actionFn = function (val) {
                    let args = [].slice.call(arguments).reduce((r = [], c) => {
                        let v = isEvent(c) ? null : c;
                        if (Array.isArray(c)) {
                            return [...r, ...v]
                        } else {
                            return { ...r, ...v }
                        }
                    }, undefined)
                    switch (type) {
                        case 'props':
                            dealProps(comp, action, args, extraData);
                            break;
                        case 'function':
                            action.method();
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