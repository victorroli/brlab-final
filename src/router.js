import Vue from "vue";
import Router from "vue-router";
import Laboratorios from "@/views/Laboratorios.vue";
import ListaLaboratorios from "@/views/ListaLaboratorios.vue";
import Laboratorio from "@/views/Laboratorio.vue";
import Experimentos from "@/views/Experimentos.vue";
import Reservas from "@/views/Reservas.vue";
import Login from "@/views/usuario/Login.vue";
import Home from "@/views/Home.vue";
import RegisterUser from "@/views/usuario/RegisterUser.vue";

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
      path: "/laboratorios",
      component: Laboratorios,
      children: [
        {
          path: "",
          name: "laboratorios",
          component: ListaLaboratorios,
          props: true
        },
        {
          path: ":laboratorio",
          name: "laboratorio",
          component: Laboratorio,
          props: true
        }
      ]
    },
    {
      path: "/experimentos",
      name: "experimentos",
      component: Experimentos
    },
    {
      path: "/reservas",
      name: "reservas",
      component: Reservas
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register-user",
      component: RegisterUser
    }
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
