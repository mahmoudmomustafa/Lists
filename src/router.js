import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
import Add from "./views/Add.vue";
import Show from "./views/Show.vue";
import Edit from "./views/Edit.vue";
import * as firebase from "firebase/app";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login",
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/lists/:list",
      name: "show",
      component: Show,
      meta: { requiresAuth: true }
    },
    {
      path: "/add",
      name: "add",
      component: Add,
      meta: { requiresAuth: true }
    },
    {
      path: "/list/:list/edit",
      name: "edit",
      component: Edit,
      meta: { requiresAuth: true }
    },
  ]
});
router.beforeEach((to, from, next) => {
  const currentUser=firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(!currentUser && requiresAuth) next('login');
  else if (currentUser && !requiresAuth) next('home');
  else next();
})

export default router;