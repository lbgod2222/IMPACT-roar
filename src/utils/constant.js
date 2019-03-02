// THIS JUST FOR THE UPCOMING MUTISERVER MIND
const server = 'http://127.0.0.1:3007'
// const server = 'http://47.105.188.213:3007'

const urls = {
  // USER
  createUser: '/user',
  login: '/user/login',
  userInfo: '/user/:uid',
  updateInfo: '/user/:uid',
  // ARTICLE
  postArticle: '/article',
  userArticleList: 'articles/:uid',
  articleList: '/articles',
  articleDetail: '/article/:aid',
  adjustArticle: '/article/adjust/:aid',
  // COMMENT
  postComment: '/comment/:aid',
  articleComments: '/comments/:aid',
  adjustComment: '/comments/:cid',
  replyComment: '/comments/reply/:cid',
  // LADS
  postLad: '/lad',
  lads: '/lads',
  ladsByColor: '/lads/:color',
  ladsByText: '/search',
  changeLad: '/lads/:id',
  // MAIL
  sendValidMail: '/mailValid',
  validMail: '/checkValid'
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

const forbiddenPath = [
  'home'
]

const errMap = [
  {
    error: '5001',
    key: '内容长度应小于225并大于1'
  },
  {
    error: '5002',
    key: 'Quick 的颜色属性应该在列表中选择'
  },
  {
    error: '5003',
    key: 'Quick 必需创建时间'
  },
  {
    error: '5004',
    key: '标题长度应小于50且大于1'
  },
  {
    error: '5005',
    key: 'article内容长度应小于31000且大于1'
  },
  {
    error: '5006',
    key: '账户名不符合要求'
  },
  {
    error: '5007',
    key: '密码错误或账号不存在'
  },
  {
    error: '5008',
    key: '邮箱不符合要求'
  },
  {
    error: '5009',
    key: '账户名不符合要求'
  },
  {
    error: '5010',
    key: '更新对象错误'
  },
  {
    error: '5011',
    key: '登录失效'
  },
  {
    error: '5012',
    key: '需要提供JWToken'
  },
  {
    error: '5013',
    key: '邮箱验证未通过'
  }
]

export {
  urls,
  colorBox,
  server,
  forbiddenPath,
  errMap
}
