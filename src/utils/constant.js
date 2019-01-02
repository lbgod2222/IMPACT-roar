// THIS JUST FOR THE UPCOMING MUTISERVER MIND
const server = 'https://localhost:3007'

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
    content: 'red-13',
    style: [
      'bg-grey-10',
      'text-red-13'
    ]
  },
  'PURPLE': {
    background: 'purple',
    content: 'white',
    style: [
      'bg-purple',
      'text-white'
    ]
  },
  'GREEN': {
    background: 'light-green-9',
    content: 'white',
    style: [
      'bg-light-green-9',
      'text-red-white'
    ]
  },
  'RED': {
    background: 'red-12',
    content: 'white',
    style: [
      'bg-red-12',
      'text-white'
    ]
  },
  'YELLOW': {
    background: 'amber-9',
    content: 'blue-grey-10',
    style: [
      'bg-amber-9',
      'text-blue-grey-10'
    ]
  },
  'BLUE': {
    background: 'indigo-8',
    content: 'grey-3',
    style: [
      'bg-indigo-8',
      'text-grey-3'
    ]
  }
}

export {
  urls,
  colorBox,
  server
}
