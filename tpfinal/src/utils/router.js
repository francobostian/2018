import Vue from 'vue'
import Router from 'vue-router'
import People from '../components/people.vue'

import OnePeople from '../components/onePeople.vue'
import Planets from '../components/planets.vue'
import OnePlanet from '../components/onePlanet.vue'
import Starships from '../components/starships.vue'
import login from '../components/Login.vue'
import store from './../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: '/', component: login, name: 'login'},
    { path: '/login', component: login, name: "login" },
    { path: '/people', component: People, name: "people" },
    { path: '/people/:id', component: OnePeople, name: 'onePeople' },
    { path: '/planets', component: Planets, name: "planets" },
    { path: '/planets/:id', component: OnePlanet, name: 'onePlanet' },
    { path: '/starships', component: Starships, name: "starships" },
    { path: "*", component: login }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    if (!store.state.token) {
      next("/");
    } else {
      next();
    }
  } else {
    if (store.state.token) {
      next("/login")
    } else {
      next();
    }
  }
})
export default router

