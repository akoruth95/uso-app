import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

function requireAuth(to, from, next) {
  if (localStorage.getItem("userid")) {
    next();
  } else {
    next("/startup");
  }
}

function noAuth(to, from, next) {
  if (localStorage.getItem("userid")) {
    next("/");
  } else {
    next();
  }
}

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./pages/Events/EventList.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/startup",
      name: "startup",
      component: () => import("./pages/Startup.vue"),
      beforeEnter: noAuth
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./pages/Register.vue"),
      beforeEnter: noAuth
    },
    {
      path: "/setup",
      name: "setup",
      component: () => import("./pages/Setup.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/Login.vue"),
      beforeEnter: noAuth
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./pages/Profile.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./pages/Events/EventList.vue")
    },
    {
      path: "/event/details",
      name: "eventdetails",
      component: () => import("./pages/Events/EventDetails.vue")
    },
    {
      path: "/events/feedback",
      name: "feedback",
      component: () => import("./pages/Events/Feedback.vue")
    },
    {
      path: "/bookmark",
      name: "bookmark",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "bookmark" */ "./pages/Bookmark.vue")
    },
    // {
    //   path: "/game",
    //   name: "game",
    //   component: () => import("./pages/Game.vue")
    // },
    {
      path: "/notification",
      name: "notification",
      component: () => import("./pages/Notification.vue")
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("./pages/Setting.vue")
    },
    {
      path: "/agenda",
      name: "agenda",
      component: () => import("./pages/Session/Agenda/Agenda.vue")
    },
    {
      path: "/session-info",
      name: "session-info",
      component: () => import("./pages/Session/SessionInfo/SessionInfo.vue")
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("./pages/Info/Faq.vue")
    }
  ]
});
