import api from '../utils/apis'

export default {
  getUserInfo: ({
    commit
  }, uid) => {
    return api.userInfo({
      uid
    })
  },
  login: ({
    commit
  }, params) => {
    return api.login(params)
  },
  createUser: ({
    commit
  }, params) => {
    return api.createUser(params)
  }
}
