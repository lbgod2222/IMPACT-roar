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

const colorBox = {
  'BLACK': {
    background: 'grey-10',
    content: 'red-13'
  },
  'PURPLE': {
    background: 'purple',
    content: 'white'
  },
  'GREEN': {
    background: 'light-green-9',
    content: 'white'
  },
  'RED': {
    background: 'red-12',
    content: 'white'
  },
  'YELLOW': {
    background: 'amber-9',
    content: 'blue-grey-10'
  },
  'BLUE': {
    background: 'indigo-8',
    content: 'grey-3'
  }
}

export {
  urls,
  colorBox
}
