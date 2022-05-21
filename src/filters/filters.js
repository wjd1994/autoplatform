/**
 * 省略多余字符，用...显示
 * @param {String} value
 * @param {number} len
 */
 export function ellipsis(value, len) {
    if (!value) return ''
    if (value.length > len) {
      return value.slice(0, len) + '...'
    }
    return value
  }
  