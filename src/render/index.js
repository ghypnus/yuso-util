import React from 'react';
import { dealActions } from './action'
import { getDeptVal } from './util';
/**
 * 渲染工具类
 * @author john.gao
 */
export default {

  /**
   * 递归处理schema
   * @param {Array} schema json数据
   */
  recurrenceSchema(schema) {
    if (!schema) return null;
    if (schema.childList) {
      schema.childList.map(child => {
        if (typeof child === 'object') {
          child.parent = schema;
        }
        this.recurrenceSchema(child);
      })
    }
    return schema;
  },

  /**
   * 是否渲染子组件
   * @param {Array} actions 动作列表
   */
  isRenderChildList(actions) {
    if (!actions) return true;
    return actions.filter(action => action.type === 'render').length === 0
  },



  /**
   * 递归无限渲染组件
   * @param {Object} components 组件库
   * @param {Array} comp 组件
   * @param {Object} extraData 额外的参数
   */
  recurrenceRender(components, comp, extraData) {
    if (!components || !comp) return null;
    if (typeof comp === 'object') {
      let children = null;
      let isVisible = true;
      const isRenderChildList = this.isRenderChildList(comp.actions);
      if (comp.childList && isRenderChildList) {
        if (Array.isArray(comp.childList)) {
          const cr = comp.childList.map(childComp => {
            return this.recurrenceRender(components, childComp, extraData);
          });
          children = cr.length === 1 ? cr[0] : cr;
        } else if (typeof comp.childList === 'function') {

        }
      }
      if (comp.actions) dealActions(this, components, comp, extraData);
      const compData = { ...comp };
      const {
        prefixCls,
        type,
        loading,
        reload,
        parent,
        childList,
        visible = true,
        props = {},
        ref,
        ...restCompProps } = compData;
      if (typeof visible === 'function') {
        isVisible = visible(extraData);
      }
      let newProps = { ...props };
      Object.keys(newProps).map(key => {
        if (newProps[key] && typeof newProps[key] == 'object' && newProps[key].type === 'function') {
          newProps[key] = new Function('data', newProps[key].value)(extraData);
        }
      })
      let Comp = null;
      if (typeof type === 'object') {
        Comp = getDeptVal(components, type);
      } else {
        Comp = components[type];
      }
      if (isVisible) {
        return <Comp
          {...restCompProps}
          {...newProps}>
          {children}
        </Comp>
      } else {
        return null;
      }
    }
    return comp;
  }
}
