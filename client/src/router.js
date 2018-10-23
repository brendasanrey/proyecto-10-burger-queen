import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Signin from "./components/Signin.vue";
import Order from "./components/Order.vue";
import Hola from "./components/Hola.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/order",
      name: "order",
      component: Order
    },
    {
      path: "/hola",
      name: "hola",
      component: Hola
    }
  ]
});
