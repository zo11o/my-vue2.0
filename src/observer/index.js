// 把 data 中的数据读使用 Object.defineProperty 重新定义
import { isObject } from '../utils/index'

class Observer {
  constructor(value) {
    // vue 如果数据层次过多 需要地柜的去解析对象的属性，依次增加set 和 get 方法
    this.walk(value)
  }

  walk(data) {
    console.log(data)
    let keys = Object.keys(data)
    //   defineReactive(data,key, value)
    // }
    keys.forEach(key => {
      console.log(key)
      // TODO: 响应式原理 监听 get set 方法
      defineReactive(data, key, data[key])
    })
  }
}

/**
 * 设置响应式
 * @param {*} key 
 * @param {*} value 
 * @param {*} data 
 */
function defineReactive(data, key, value) {
  // 如果值为对象 要用递归去监听响应
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return
      // 做一些操作
      console.log(newValue)
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
