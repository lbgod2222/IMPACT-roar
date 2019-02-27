import api from '../utils/apis'

export default {
  // 获得用户信息
  getUserInfo: ({
    commit
  }, uid) => {
    return api.userInfo({
      uid
    })
  },
  // 登录
  login: ({
    commit
  }, params) => {
    return api.login(params)
  },
  // 注册用户
  createUser: ({
    commit
  }, params) => {
    return api.createUser(params)
  },
  // 更新用户信息
  updateUser: ({
    commit
  }, params) => {
    return api.updateInfo(params)
  },
  // 发送验证邮件
  sendValidMail: ({
    commit
  }, params) => {
    return api.sendValidMail(params)
  },
  // 验证邮箱
  validMail: ({
    commit
  }, params) => {
    return api.validMail(params)
  }
}
