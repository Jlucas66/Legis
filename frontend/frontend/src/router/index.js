import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
// import { createApp } from 'vue'
// import { useReCaptcha } from 'vue-recaptcha-v3' 

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
// const app = creatApp(app)

// app.use(useReCaptcha, {
//   siteKey: '6Lde0O0lAAAAAOr0hY6o9Jd7qkXg5v2bR5H8m4w',
//   loaderOptions: {
//     autoHideBadge: true,
//     badge: 'bottomright'
//   }
// })
export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return Router
})
