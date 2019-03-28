// LOAD function
function load (component, isLayout = false) {
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
        path: 'article/:aid',
        name: 'article',
        component: load('ArticleDetail')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: load('QuickDashboard')
      },
      {
        path: 'personal',
        name: 'personal',
        component: load('Personal')
      },
      {
        path: 'quicklad',
        name: 'quicklad',
        component: load('Quicklads')
      },
      {
        path: 'writter',
        name: 'writter',
        component: load('Writter')
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
