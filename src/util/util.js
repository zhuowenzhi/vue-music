export function setCookie (key, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = key + '=' + escape(value) + '; expires=' + date.toGMTString()
}
export function getCookie (key) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(key + '=')
    if (start !== -1) {
      start = start + key.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}
export function delCookie (key) {
  setCookie(key, '', -1)
}
