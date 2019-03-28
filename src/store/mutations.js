export default {
  setLoginState (state, isLogin) {
    state.IS_LOGIN = isLogin
  },
  envalUserInfo (state, data) {
    state.USER_INFO = data
  }
}
