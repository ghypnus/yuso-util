/**
 * 动作
 * @author john.gao
 * @date 2020/09/22
 */
import { getDeptVal, getRootComponent, getComponent } from './util';
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
                    p[k] = value(val)
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
            newParams = { ...newParams, ...method({ ...val, ...extraData })};
        }
    }
    axios[type](url, {
        ...newParams
    }).then(() => {
        if (actions) {
            actions.map(ac => {
                switch (ac.type) {
                    case 'props':
                        dealProps(comp, ac);
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
    const { actions, props, type, ...restProps } = comp;
    actions.map(action => {
        const { actionType, type } = action;
        if (type === 'render') {
            comp[actionType] = (text, record, index) => {
                return target.recurrenceRender(components, {
                    ...restProps, type: 'Layout'
                }, record).props.children;
            }
        } else {
            props[actionType] = (val) => {
                switch (type) {
                    case 'props':
                        dealProps(comp, action, val, extraData);
                        break;
                    case 'function':
                        action.method();
                        break;
                    case 'interface':
                        dealInterface(comp, action, val, extraData);
                        break;
                    default:
                        break;
                }
            }
        }

    })
}