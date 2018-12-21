<<<<<<< HEAD
import Router from "vue-router";
import store from "./store";
import Vue from "vue";
import { account } from "./store/account.module";
import { isNullOrUndefined } from "util";
=======
import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
>>>>>>> fix merge conflict

Vue.use(Router);

function alwaysDirect(to, from, next) {
  next();
}

function noAuth(to, from, next) {
  if (store.state.account.status.loggedIn) {
    next("/");
  } else {
    next();
  }
}

const router = new Router({
  routes: [
    {
      path: "/",
<<<<<<< HEAD
      redirect: "/events"
    },
    {
      path: "/agenda",
      name: "agenda",
      component: () => import("./pages/Session/Agenda/Agenda.vue")
=======
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/Login.vue")
>>>>>>> fix merge conflict
    },
    {
      path: "/bookmark",
      name: "bookmark",
<<<<<<< HEAD
      component: () => import("./pages/Bookmark.vue")
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
      path: '/speakerbio',
      name: 'speakerbio',
      component: () => import('./pages/Speakerbio.vue')
    },
    {
      path: '/attendeelist',
      name: 'attendeelist',
      component: () => import('./pages/AttendeeList.vue')
    },
    {
      path: '/eventMaterialHome',
      name: 'eventMaterialHome',
      component: () => import('./pages/EventMaterialHome.vue')
    },
    {
      path: "/events/feedback",
      name: "feedback",
      component: () => import("./pages/Events/Feedback.vue")
    },
    {
      path: "/events/progress",
      name: "progress",
      component: () => import("./pages/Events/MyProgress.vue")
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("./pages/Info/Faq.vue"),
      beforeEnter: alwaysDirect
=======
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "bookmark" */ "./pages/Bookmark.vue")
    },
    {
      path: "/game",
      name: "game",
      component: () => import("./pages/Game.vue")
    },
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
>>>>>>> fix merge conflict
    },
    {
      path: "/my-events",
      name: "my-events",
      component: () => import("./pages/Events/EventList.vue")
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("./pages/Info/Faq.vue")
    }
  ]
});
<<<<<<< HEAD

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route =>
    isNullOrUndefined(route.beforeEnter)
  );
  if (requiresAuth) {
    if (account.state.status.loggedIn) {
      next();
    } else {
      next("/startup");
    }
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  store.dispatch("alert/clear").then(() => {
    store.dispatch("common/setShowBackButton", false);
    store.dispatch("common/setNewHeading", "");
    next();
  });
});

export default router;
=======
>>>>>>> fix merge conflict
