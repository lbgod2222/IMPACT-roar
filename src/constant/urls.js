const urls = {
  // USER
  createUser: '/user',
  login: '/user/login',
  userInfo: '/user/:uid',
  // ARTICLE
  postArticle: '/article',
  userArticleList: 'articles/:uid',
  articleList: '/articles',
  articleDetail: '/article/:aid',
  adjustArticle: '/article/adjust/:aid',
  // COMMENT
  postComment: '/comment',
  articleComments: '/comments/:aid',
  adjustComment: '/comments/:cid',
  replyComment: '/comments/reply/:cid',
  // LADS
  postLad: '/lad',
  lads: '/lads',
  ladsByColor: '/lads/:color',
  changeLad: '/lads/:id'
}

export default urls
