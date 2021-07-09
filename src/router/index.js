import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

// ?Lakdan
import lDashboard from "../views/lakdan/Dashboard";
import lMydocument from "../views/lakdan/Mydocument";
import lUpload from "../views/lakdan/Upload";
import lManagement from "../views/lakdan/reportManagement.vue";

// ?Rendan
import rDashboard from "../views/rendan/Dashboard";
import rMydocument from "../views/rendan/Mydocument";
import rUpload from "../views/rendan/Upload";
import rManagement from "../views/rendan/reportManagement.vue";

// ?Divisi
import dDashboard from "../views/divisi/Dashboard";
import dMydocument from "../views/divisi/Mydocument";
import dUpload from "../views/divisi/Upload";
import dManagement from "../views/divisi/reportManagement.vue";

const routes = [
  /**
   * ?Login page
   */
  {
    path: "/",
    name: "Login",
    component: Login,
    // meta: { isAuth: true },
  },

  /**
   * ?Lakdan dashboard/*
   */
  {
    path: "/dashboard/lakdan",
    name: "lDashboard",
    component: lDashboard,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard/lakdan/mydocument",
        name: "lMydocument",
        component: lMydocument,
      },
      {
        path: "/dashboard/lakdan/upload",
        name: "lUpload",
        component: lUpload,
      },
      {
        path: "/dashboard/lakdan/management-report",
        name: "lManagement",
        component: lManagement,
      },
    ],
    // beforeEnter: (to, from, next) => {
    //   if (store.state.whoAreYou !== "lakdan") {
    //     router.push("/");
    //   }
    //   next();
    // },
  },

  /**
   * ?Rendan dashboard/*
   */
  {
    path: "/dashboard/rendan",
    name: "rDashboard",
    component: rDashboard,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard/rendan/mydocument",
        name: "rMydocument",
        component: rMydocument,
      },
      {
        path: "/dashboard/rendan/upload",
        name: "rUpload",
        component: rUpload,
      },
      {
        path: "/dashboard/rendan/management-report",
        name: "rManagement",
        component: rManagement,
      },
    ],
    // beforeEnter: (to, from, next) => {
    //   if (store.state.whoAreYou !== "rendan") {
    //     router.push("/");
    //   }
    //   next();
    // },
  },

  /**
   * ?UB-Divisi dashboard/*
   */
  {
    path: "/dashboard/divisi",
    name: "dDashboard",
    component: dDashboard,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard/divisi/mydocument",
        name: "dMydocument",
        component: dMydocument,
      },
      {
        path: "/dashboard/divisi/upload",
        name: "dUpload",
        component: dUpload,
      },
      {
        path: "/dashboard/divisi/management-report",
        name: "dManagement",
        component: dManagement,
      },
    ],
    // beforeEnter: (to, from, next) => {
    //   if (store.state.whoAreYou !== "divisi") {
    //     router.push("/");
    //   }
    //   next();
    // },
  },

  /**
   * ?Default route
   */
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Login" },
  },
];

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// Middleware
import progress from "nprogress";
import CryptoJS from "crypto-js";
import store from "../store";

function loggedIn() {
  progress.start();
  let identifier = localStorage.getItem("identifier");
  if (identifier) {
    const whoAreYou = store.state.whoAreYou;
    const hash = CryptoJS.AES.decrypt(identifier, "isValid").toString(CryptoJS.enc.Utf8);
    if (hash !== whoAreYou) {
      localStorage.clear();
      router.push("/");
      progress.done();
    }
    progress.done();
    return true;
  }
  progress.done();
  return identifier;
}

function auth() {
  let identifier = localStorage.getItem("identifier");
  if (identifier) {
    return true;
  }
  return false;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn()) {
      next({
        path: "/",
        query: { redirect: from.redirectedFrom },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.isAuth)) {
    if (auth()) {
      next({
        path: "/dashboard/" + store.state.whoAreYou,
        query: { redirect: from.redirectedFrom },
      });
    } else {
      next();
    }
  } else {
    next(); //?make sure to always call next()!
  }
});
