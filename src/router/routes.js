// LOAD function
function load (component, isLayout = false) {
  console.log('what we load:', component, isLayout)
  return isLayout ? () => import(`layouts/${component}.vue`) : () => import(`pages/${component}.vue`)
}

const routes = [
  // {
  //   path: '/main',
  //   component: load('main', true),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') },
  //     { path: 'sec', component: () => import('pages/Sec.vue') }
  //   ]
  // },
  {
    path: '/',
    name: '',
    component: load('Main', true),
    children: [
      {
        path: 'home',
        name: 'home',
        component: load('Home')
      },
      {
        path: 'articles',
        name: 'articles',
        component: load('Articles')
      },
      {
        path: 'article',
        name: 'article',
        component: load('ArticleDetail')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
