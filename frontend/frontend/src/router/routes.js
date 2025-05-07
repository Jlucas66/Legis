const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('pages/TelaAposLoginUser.vue') },
      { path: '/TelaLogin', name: 'TelaLogin', component: () => import('pages/TelaLogin.vue') },
      { path: '/TelaAdmin', name : 'TelaAdmin', component: () => import('pages/TelaAposLoginAdmin.vue') },
      { path: '/TelaOrgaos', name : 'TelaOrgaos', component: () => import('pages/TelaOrgaos.vue') },
      { path: '/TelaTipoDocumento', name: 'TelaTipoDocumento', component: () => import('pages/TelaTipoDocumento.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
