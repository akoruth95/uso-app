import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/Login.vue')
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "bookmark" */ './pages/Bookmark.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('./pages/Game.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('./pages/Notification.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./pages/Setting.vue')
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: () => import('./pages/Session/Agenda/Agenda.vue')
    },
    {
      path: '/session-info',
      name: 'session-info',
      component: () => import('./pages/Session/SessionInfo/SessionInfo.vue')
    },
    {
      path: '/my-events',
      name: 'my-events',
      component: () => import('./pages/Events/EventList.vue')
    },
    {
      path: '/socialwall',
      name: 'socialwall',
      //todo route this through the selected event, /socialwall endpoint is just for development!
      component: () => import('./pages/SocialWall/SocialWall.vue')
    }

  ]
})
