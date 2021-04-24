import { observe } from './observer/index'

export function initState(vm) {
  const opts = vm.$options
  console.log(opts)
  // vue 的数据来源：属性 方法 数据 计算属性 watch
  if (opts.props) {
    initProps(vm)
  }
  if (opts.method) {
    initMethod(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps(vm) {

}


function initMethod(vm) {

}


/**
 * 初始化 data
 */
function initData(vm) {
  // console.log(vm.$options.data)
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  console.log(data)
  
  // 对象劫持 用户改变了数据，我希望可得到通知 => 刷新页面
  // Object.defineProperty() 给属性添加get方法和set 方法
  observe(data); // 响应式原理
}

function initComputed(vm) {

}

function initWatch(vm) {

}
