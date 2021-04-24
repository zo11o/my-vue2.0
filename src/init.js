import { initState } from './state'

export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function(options) {
    console.log(options)

    // 数据劫持 vue 中使用 vm.$options 就是用户传入的属性
    const vm = this;
    vm.$options = options;

    // 初始化状态
    initState(vm); // 分割代码
  }
}
