import Vue from 'vue'
import Router from 'vue-router'
import People from '../components/people.vue'

import OnePeople from '../components/onePeople.vue'
import msPlanets from '../components/planets.vue'
import msOnePlanet from '../components/onePlanet.vue'
import msStarships from '../components/starships.vue'
import login from '../components/Login.vue'
import store from './../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
   
    { path: '/login', component: login, name: "login" },
    { path: '/people', component: People, name: "people" },
    { path: '/people/:id', component: OnePeople, name: 'onePeople' },
    { path: '/planets', component: msPlanets, name: "planets" },
    { path: '/planets/:id', component: msOnePlanet, name: 'onePlanet' },
    { path: '/starships', component: msStarships, name: "starships" },



   
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

