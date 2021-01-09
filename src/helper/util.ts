const toString = Object.prototype.toString
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object'
}
export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object Object]'
}
export function isFormData(val:any):val is FormData {
  return val instanceof FormData;
}
export function deepMerge(...objs:any[]):any {
  let result = Object.create(null);
  objs.forEach(obj=>{
    if(obj) {
      Object.keys(obj).forEach(key=>{
          let val = obj[key];
          if(isPlainObject(val)) {
            if(result[key]) {
              result[key] = deepMerge(val,result[key]);
            } else {
              result[key] = deepMerge(val);
            }
          } else {
            result[key] = val;
          }
      });
    }
  });
  return result;
}