//inside
var axios = require('axios')

var config = {
  clientId: null,
  mkclLoginServerURL: null,
  mkclLoginClientURL: null,
  mkclSignUpURL: null,
  redirectUrl: null,
  callback: null
}

const LOGIN_API = '/o/login/validateuser'
const LOGOUT_API = '/r/logout'
const VALIDATE_TOKEN_API = '/o/isValidToken'
const GET_CLIENT_CONFIG_API = '/o/getclientconfig'
const VERIFY_OTP = '/o/forgotpassword/verifyotp'
const CHANGEPASSWORD = '/o/forgotpassword/changepassword'
const SEND_OTP = '/o/forgotpassword/sendotp'
const KILL_SESSION_API = '/o/killSession'
const IS_USERNAME_AVAILABLE_API = '/o/isUsernameAvailable'

// var eventBus = document.createElement('P')

function login(username, password) {
  //call to login api
  // alert(config.clientId)
  return new Promise(function(resolve, reject) {
    var loginUrl = config.mkclLoginServerURL + LOGIN_API
    axios
      .post(loginUrl, { username: username, password: password }, { headers: { clientId: config.clientId } })
      .then(function(res) {
        if (res.status === 200) {
          var token = res.headers.authorization
          // on success , set token cookie
          setToken(token)
          // set cookies for client group members
          sendTokenToClientGroupMembers(token)
          // call to callback function
          resolve(token)
          if (config.callback !== null) {
            config.callback(token).then(function() {})
          }
        } else if (res.status === 208) {
          var token = res.headers.authorization
          // on success , set token cookie
          setRestrictToken(token)
          reject(new Error('MAX_SESSION_LIMIT_REACHED'))
        }
      })
      .catch(function(err) {
        reject(err)
      })
  })
}

function sendOTP(username) {
  return new Promise(function(resolve, reject) {
    var loginUrl = config.mkclLoginServerURL + SEND_OTP
    axios
      .post(loginUrl, { username: username, isemail: true }, { headers: { clientId: config.clientId } })
      .then(function(res) {
        resolve('success')
      })
      .catch(function(err) {
        reject(err)
      })
  })
}

function verifyOTP(username, otp) {
  return new Promise(function(resolve, reject) {
    var loginUrl = config.mkclLoginServerURL + VERIFY_OTP
    axios
      .post(loginUrl, { username: username, otp: otp }, { headers: { clientId: config.clientId } })
      .then(function(res) {
        resolve(res.headers.authorization)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}

function ChangePassword(username, newPassword, confirmpassword, token) {
  return new Promise(function(resolve, reject) {
    var loginUrl = config.mkclLoginServerURL + CHANGEPASSWORD
    axios
      .post(loginUrl, { username: username, password: newPassword, confirmpassword: confirmpassword }, { headers: { clientId: config.clientId, authorization: token } })
      .then(function(res) {
        resolve('success')
      })
      .catch(function(err) {
        reject(err)
      })
  })
}

function sendTokenToClientGroupMembers(jwtToken) {
  // alert('sendTokenToClientGroupMembers')
  getClientConfig(config.clientId).then(function(clientConfig) {
    var clientGroupMembers = clientConfig.group.groupmembers
    var iframeDiv
    var bodyElements = document.getElementsByTagName('body')
    iframeDiv = document.getElementById('iframeDiv')
    //deleting existing iframdiv container for iframes
    if (iframeDiv !== null && iframeDiv.hasChildNodes()) {
      // bodyElements.removeChild(iframeDiv)
      //removing existing iframes
      iframeDiv.innerHTML = ''
    }
    //creating iframdiv conatainer for iframes
    iframeDiv = document.createElement('div')
    iframeDiv.id = 'iframeDiv'
    // iframeDiv.style.visibility = 'hidden'

    // console.log(bodyElement)
    bodyElements[0].appendChild(iframeDiv)
    clientGroupMembers.forEach(function(clientMember) {
      getClientConfig(clientMember).then(function(config) {
        var memberReturnUrl = config.purpose.returnurl
        // alert(memberReturnUrl)
        var ifrm = document.createElement('iframe')
        ifrm.setAttribute('src', memberReturnUrl)
        // ifrm.style.visibility = 'hidden'
        // ifrm.style.height = '0px'
        // ifrm.style.width = '0px'
        iframeDiv.appendChild(ifrm)
        ifrm.addEventListener('load', function() {
          // alert('load' + memberReturnUrl)
          var receiverPath = new URL(memberReturnUrl)
          var receiverOrigin = receiverPath.origin
          // alert('sending to' + receiverOrigin)
          ifrm.contentWindow.postMessage({ isLogin: true, token: jwtToken }, receiverOrigin)
        })
      })
    })
  })
}

function getClientConfig(clientId) {
  return new Promise(function(resolve, reject) {
    var clientConfigUrl = config.mkclLoginServerURL + GET_CLIENT_CONFIG_API
    axios
      .post(clientConfigUrl, { clientid: clientId })
      .then(function(res) {
        resolve(res.data)
      })
      .catch(function() {
        reject(new Error('ERR_FEATCHING_CLIENT_CONFIG:' + clientId))
      })
  })
}

function signUp() {
  // window.open('', '', 'height=200')
  var MKCLLoginUrl = config.mkclSignUpURL + '?clientId=' + config.clientId
  window.location.href = MKCLLoginUrl
}

// function loginPopup () {
//   // window.open('http://www.google.com')
//   // var currentUrl = window.location.href
//   var MKCLLoginUrl = config.mkclLoginClientURL + '?clientId=' + config.clientId
//   let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=yes,menubar=yes,
//   width=0,height=0,left=50,top=50`
//   window.open(MKCLLoginUrl, 'test', params)
//   // window.location.href = MKCLLoginUrl
// }

window.onload = function() {
  window.addEventListener('message', receiveMessage, false)
}

function sendTokenAcknoledgement(err) {
  var parentPath = new URL(config.mkclLoginClientURL)
  var parentOrigin = parentPath.origin
  var parent = window.parent
  if (err !== null) {
    // parent.postMessage({ 'isTokenReceived': true, 'isError': true, 'errorMsg': err.message }, parentOrigin)
    return
  }
  // alert('sendTokenAcknoledgement solar')
  // parent.postMessage({ 'isTokenReceived': true, 'isError': false, 'errorMsg': '' }, parentOrigin)
}

function receiveMessage(event) {
  var loginUrl = new URL(config.mkclLoginClientURL)
  var loginOrigin = loginUrl.origin
  // if (event.origin === loginOrigin) {
  if (true) {
    if (event.data.isLogin !== undefined && event.data.isLogin) {
      var token = event.data.token
      if (token !== undefined && token !== null) {
        setToken(token)
        if (config.callback !== null) {
          config
            .callback(token)
            .then(function() {
              sendTokenAcknoledgement(null)
            })
            .catch(function(e) {
              sendTokenAcknoledgement(e)
            })
        }
        // let loggedEvent = new CustomEvent('loggedIn', {detail: token}) // (2)
        // redirectWithTimeout()
        // eventBus.dispatchEvent(loggedEvent)
      }
    }
  }
}

function setToken(token) {
  window.sessionStorage.setItem('token', token)
  // window.localStorage.setItem('token', token)
  // alert('setToken ' + config.clientId)
  // setCookie(config.clientId, token)
}

function setRestrictToken(token) {
  let key = config.clientId + 'Retrict'
  // setCookie(key, token)
  window.sessionStorage.setItem(key, token)
}

function getRestrictToken() {
  let key = config.clientId + 'Retrict'
  return window.sessionStorage.getItem(key)
  // return window.localStorage.getItem('token')
  // return getCookie(key)
}

function removeRestrictToken() {
  let key = config.clientId + 'Retrict'
  // deleteCookie(key)
  window.sessionStorage.removeItem(key)
}

function getToken() {
  return window.sessionStorage.getItem('token')
  // return getCookie(config.clientId)
}

function removeToken() {
  window.sessionStorage.removeItem('token')
  // deleteCookie(config.clientId)
}

// function redirectWithTimeout () {
//   var redirectUrl = config.redirectUrl
//   // alert(redirectUrl)
//   if (redirectUrl !== undefined || redirectUrl !== null) {
//     setTimeout(function () {
//       window.location.href = config.redirectUrl
//     }, 1000)
//   }
// }

function isTokenValid(token) {
  // var token = GetCookie(config.clientId)
  // var token = getToken()
  return new Promise(function(resolve, reject) {
    var validateTokenUrl = config.mkclLoginServerURL + VALIDATE_TOKEN_API
    axios
      .post(validateTokenUrl, { clientId: config.clientId, token: token })
      .then(function(res) {
        resolve(res)
      })
      .catch(function(err) {
        removeToken()
        reject(err)
      })
  })
}

function isLoggedIn() {
  var token = getToken()
  if (token !== undefined && token !== null) {
    return true
  } else {
    return false
  }
}

function logout() {
  return new Promise(function(resolve, reject) {
    var logoutUrl = config.mkclLoginServerURL + LOGOUT_API
    axios
      .get(logoutUrl, { headers: { clientId: config.clientId } })
      .then(function() {
        removeToken()
        resolve()
      })
      .catch(function(e) {
        reject(e)
      })
  })
}

function isUsernameAvailable(username) {
  // var token = getToken()
  return new Promise(function(resolve, reject) {
    var isUsernameAvailabeUrl = config.mkclLoginServerURL + IS_USERNAME_AVAILABLE_API
    axios
      .post(
        isUsernameAvailabeUrl,
        {
          userName: username,
          personalDetails: {
            fullName: 'temp'
          }
        },
        { headers: { clientId: config.clientId } }
      )
      .then(function(res) {
        resolve(res.status)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}
function killSession() {
  return new Promise(function(resolve, reject) {
    let url = config.mkclLoginServerURL + KILL_SESSION_API
    axios
      .get(url, { headers: { clientId: config.clientId, authorization: getRestrictToken() } })
      .then(function() {
        removeRestrictToken()
        resolve()
      })
      .catch(function(e) {
        reject(e)
      })
  })
}

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(';', offset)
  if (endstr === -1) {
    endstr = document.cookie.length
  }
  return unescape(document.cookie.substring(offset, endstr))
}

export function getCookie(name) {
  var arg = name + '='
  var alen = arg.length
  var clen = document.cookie.length
  var i = 0
  while (i < clen) {
    var j = i + alen
    if (document.cookie.substring(i, j) === arg) return getCookieVal(j)
    i = document.cookie.indexOf(' ', i) + 1
    if (i === 0) break
  }
  return null
}

function setCookie(name, value) {
  //   var expirationDate = new Date()
  //   var cookieString = ''
  //   expirationDate.setFullYear(expirationDate.getFullYear() + 1)
  // // Build the set-cookie string:
  //   cookieString = name + '=' + value + ';' + 'expires =' + expirationDate.toUTCString()
  // // Create or update the cookie:
  //   document.cookie = cookieString
  document.cookie = name + '=' + value + '; path= /'
}

function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

var sso = {
  getToken: getToken,
  login: login,
  logout: logout,
  isLoggedIn: isLoggedIn,
  // isSessionPresent: isSessionPresent,
  isTokenValid: isTokenValid,
  removeToken: removeToken,
  signUp: signUp,
  sendOTP: sendOTP,
  verifyOTP: verifyOTP,
  ChangePassword: ChangePassword,
  removeRestrictToken: removeRestrictToken,
  getRestrictToken: getRestrictToken,
  setRestrictToken: setRestrictToken,
  killSession: killSession,
  isUsernameAvailable: isUsernameAvailable
}

function install(vue, options) {
  vue.prototype.$sso = sso
  window.MKCLAPI = sso

  if (options != undefined && options !== null) {
    Object.keys(options).forEach(function(key) {
      config[key] = options[key]
    })
  }
}

export default {
  install: install
}
