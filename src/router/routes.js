
const routes = [
  {
    path: '/main',
    component: () => import('layouts/main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'sec', component: () => import('pages/Sec.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Home.vue')
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
