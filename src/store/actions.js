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
  },
  // 获取文章简列表
  getArticleList: ({
    commit
  }, params) => {
    return api.articleList(params)
  },
  // 获取文章详情
  getArticleDetail: ({
    commit
  }, params) => {
    return api.articleDetail(params)
  },
  // 获取文章评论
  getComments: ({
    commit
  }, params) => {
    return api.articleComments(params)
  },
  // 发布评论
  postComment: ({
    commit
  }, params) => {
    return api.postComment(params)
  },
  // 回复评论
  replyComment: ({
    commit
  }, params) => {
    return api.replyComment(params)
  },
  // 发布新文章
  postArticle: ({
    commit
  }, params) => {
    return api.postArticle(params)
  },
  // 获取QUICKLADS
  getAllQuicklads: ({
    commit
  }, params) => {
    return api.lads(params)
  },
  // 获取（通过关键字）QUICKLAD
  getQuickladsByText: ({
    commit
  }, params) => {
    return api.ladsByText(params)
  },
  // 发布QUICKLAD
  postQuicklad: ({
    commit
  }, params) => {
    return api.postLad(params)
  }
}
