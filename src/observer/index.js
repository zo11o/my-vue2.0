// 把 data 中的数据读使用 Object.defineProperty 重新定义
import { isObject, def } from '../utils/index'
import { arrayMethods } from './array.js'
class Observer {
  constructor(value) {
    if (Array.isArray(value)) {
      // 如果是数组并不会对索引进行观测，因为会导致性能问题
      // 如果数组里放得是对象才去监控
      // 重写数组方法 push shift unshift
      // Object.setPrototypeOf()
      // Object.defineProperty(value, '__ob__', {
      //   configurable: false,
      //   enumerable: false,
      //   value
      // })
      def(value, '__ob__', this)
      value.__proto__ = arrayMethods
      this.observerArray(value)
    } else {
      // vue 如果数据层次过多 需要地柜的去解析对象的属性，依次增加set 和 get 方法
      this.walk(value)
    }
  }

  observerArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i])
    }
  }

  walk(data) {
    console.log(data)
    let keys = Object.keys(data)
    //   defineReactive(data,key, value)
    // }
    keys.forEach(key => {
      console.log(key)
      // 响应式原理 监听 get set 方法
      defineReactive(data, key, data[key])
    })
  }
}

/**
 * 设置响应式
 * @param {*} data 
 * @param {*} key 
 * @param {*} value 
 */
function defineReactive(data, key, value) {
  // 如果值为对象 要用递归去监听响应
  observe(value)
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: false,
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return
      // 做一些操作
      console.log('更新数据 ')
      // 如果修改值 修改的值也要响应式
      observe(newValue) // 继续劫持用户设置的值
      value = newValue
    }
  })
}

export function observe(data) {
  let isObj = isObject(data)

  if (!isObj) {
    return
  }

  return new Observer(data)
}
