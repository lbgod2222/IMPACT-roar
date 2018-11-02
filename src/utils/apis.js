import axios from 'axios'
import urls from '../constant/urls'
import server from '../constant/server'

// COMPILE FUNCTIONS
const json2url = json => {
  let arr = []
  let str = ''
  for (var i in json) {
    str = i + '=' + json[i]
    arr.push(str)
  }
  return arr.join('&')
}

const fetch = (url, data, method, postHeaders) => {
  for (const i in data) {
    if (data.indexOf(':' + i) > -1) {
      // const element = object[i];
      url = url.replace(':' + i, data[i])
      delete data[i]
    }
  }

  let type = method.toLowerCase()
  let res
  switch (type) {
    case 'get':
      res = axios.get(server + url + '?' + json2url(data))
      break

    case 'post':
      res = axios.post(server + url, data, postHeaders)
      break

    case 'put':
      res = axios.put(server + url, data, postHeaders)
      break
  }
  return res
}

const api = {
  // 创建账户
  createUser: (params) => {
    return fetch(urls.createUser, params, 'post')
  },
  // 登录
  login: (params) => {
    return fetch(urls.login, params, 'get')
  },
  // 获取用户信息
  userInfo: (params) => {
    return fetch(urls.userInfo, params, 'get')
  },
  // 发布新文章
  postArticle: (params) => {
    return fetch(urls.postArticle, params, 'post')
  },
  // 根据用户获取文章简略列表
  userArticleList: (params) => {
    return fetch(urls.userArticleList, params, 'get')
  },
  // 获取文章简略列表
  articleList: (params) => {
    return fetch(urls.articleList, params, 'get')
  },
  // 获取文章详情
  articleDetail: (params) => {
    return fetch(urls.articleDetail, params, 'get')
  },
  // 修改文章
  adjustArticle: (params) => {
    return fetch(urls.adjustArticle, params, 'get')
  },
  // 发布评论
  postComment: (params) => {
    return fetch(urls.postComment, params, 'post')
  },
  // 获取评论
  articleComments: (params) => {
    return fetch(urls.articleComments, params, 'get')
  },
  // 更改评论
  adjustComment: (params) => {
    return fetch(urls.adjustComment, params, 'put')
  },
  // 回复评论
  replyComment: (params) => {
    return fetch(urls.replyComment, params, 'get')
  },
  // 发布LAD
  postLad: (params) => {
    return fetch(urls.postLad, params, 'post')
  },
  // 获取LAD
  lads: (params) => {
    return fetch(urls.lads, params, 'get')
  },
  // 根据color查询LADS
  ladsByColor: (params) => {
    return fetch(urls.ladsByColor, params, 'get')
  },
  // 修改LADS
  changeLad: (params) => {
    return fetch(urls.changeLad, params, 'post')
  }
}

export default api
