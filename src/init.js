import { initState } from './state'
import { compileToFunction } from './compiler/index.js'

export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function(options) {
    console.log(options)

    // 数据劫持 vue 中使用 vm.$options 就是用户传入的属性
    const vm = this;
    vm.$options = options;

    // 初始化状态
    initState(vm); // 分割代码

    // 如果用户传入了 el 属性， 需要将页面渲染出来
    // 如果用户传入了 el 就需要挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    if (!options.render) {
      // 判断是否有 template 属性值
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
      }
      console.log(template)
      const render = compileToFunction(template)
      options.render = render
      // 我们需要将 template 转化为 render 方法
    }
    // 先找 render 方法
    // compileToFunction()
  }
}
