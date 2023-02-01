import Vue from "vue";
import VueRouter from "vue-router";
// import AppVue from "@/App.vue";

Vue.use(VueRouter);

const routes = [
  {
    // path: "/",
    // component: AppVue,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
