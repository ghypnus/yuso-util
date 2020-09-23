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
      const isRenderChildList = this.isRenderChildList(comp.actions);
      if (comp.childList && isRenderChildList) {
        children = comp.childList.map(childComp => {
          return this.recurrenceRender(components, childComp, extraData);
        })
      }
      if (comp.actions) dealActions(this, components, comp, extraData);
      let Comp = null;
      if (typeof comp.type === 'object') {
        Comp = getDeptVal(components, comp.type);
      } else {
        Comp = components[comp.type];
      }

      const compData = { ...comp };
      const {
        prefixCls,
        loading,
        reload,
        parent,
        childList,
        actions,
        ...restProps } = compData;
      return <Comp
        {...restProps}
        {...comp.props}>
        {children}
      </Comp>
    }
    return comp;
  }
}
