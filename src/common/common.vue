<template>

</template>

<script type="text/javascript">
// 定义一些公共的属性和方法
// const httpUrl = 'http://39.105.17.99:8080/'

const storageUrl = 'https://coding-education.xyz/'
// const storageUrl = 'http://ra2q5rhzl.hd-bkt.clouddn.com/'

const commonLocalhost = ""

// const commonLocalServer = "http://192.168.50.149:8083"
const commonLocalServer = "http://touchdawn.asuscomm.com:8083"

function commonFun() {
  console.log("公共方法")
}

function isEmpty (obj) {
  if (!obj && obj !== 0) { return true }
  if (typeof obj === 'string') {
    return obj === ''
  } else if (obj instanceof Array) {
    return obj.length === 0
  }
  return false
}


/**
 * 深拷贝对象或数组
 * @param {*要拷贝的Object或者Array} obj
 */
export function cloneObj(obj) {
  let newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return obj
  } else if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          newobj[key] = cloneObj(obj[key])
        } else {
          // 如果不是，简单复制
          newobj[key] = obj[key]
        }
      }
    }
  }
  return newobj
}

function merge (target, source) {
  for (let key in source) {
    target[key] = source[key]
  }
}

function trim(str) {
  if (typeof str === 'string') {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  return str
}

function data2Number (form, arr) {
  if (Array.isArray(arr)) {
    arr.forEach((item) =>　{
      if (form.hasOwnProperty(item)) {
        let number = + form[item]
        form[item] = number || + form[item]
      }
    })
  }
}


// 暴露出这些属性和方法
export default {
  storageUrl,
  commonLocalServer,
  commonFun,
  isEmpty,
  cloneObj,
  merge,
  trim,
  data2Number
}
</script>

<style scoped>

</style>