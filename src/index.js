import { initMixin } from './init'
// Vue 的核心代码
function Vue(options) {
  // 进行 vue 的初始化
  this._init(options)
}

// 通过引入文件的方式给Vue原型加上方法
// 给vue 原型上添加一个 _init 方法
initMixin(Vue)

export default Vue
