// 需要重写的数组方法 7个：
// push shift unshift pop reverse sort splice
// 会导致数组本身发生变化

let oldArrayMethods = Array.prototype

export const arrayMethods = Object.create(oldArrayMethods)

let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reserve'
]


methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    // AOP
    const result = oldArrayMethods[method].apply(this, args)
    const ob = this.__ob__
    // 添加的元素可能还是对象
    let inserted; // 当前用户插入的元素
    switch(method) {
      case 'push':
        break;
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
    }
    if (inserted) {
      console.log(inserted)
      ob.observerArray(inserted)
    }

    return result
  }
})
