/**
 * 是否对象
 * @param {any} data 
 * @returns 
 */
export const isObject = (data) => typeof data === 'object' && data !== null

export const def = (data, key, value) =>{
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: false,
    value
  })
}
