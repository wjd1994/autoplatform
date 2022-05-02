import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'

Vue.use(VueRouter)
// Vue.prototype.$router = router
const router = new VueRouter({
    routes
  })

export default router