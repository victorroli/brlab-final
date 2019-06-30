import Vue from "vue";
import Router from "vue-router";
import Laboratorios from "@/views/laboratorio/Laboratorios.vue";
import ListaLaboratorios from "@/views/laboratorio/ListaLaboratorios.vue";
import Laboratorio from "@/views/laboratorio/Laboratorio.vue";
import Experimentos from "@/views/Experimentos.vue";
import Reservas from "@/views/Reservas.vue";
import Login from "@/views/usuario/Login.vue";
import Home from "@/views/Home.vue";
import RegisterUser from "@/views/usuario/RegisterUser.vue";
import Agendamento from "@/views/laboratorio/Agendamento.vue";
import DadosLaboratorio from "@/views/laboratorio/DadosLaboratorio.vue";
import IniciaExperimento from "@/views/laboratorio/IniciaExperimento.vue";
import DadosColetados from "@/views/laboratorio/DadosColetados.vue";

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
          component: Laboratorio,
          props: true,
          children: [
            {
              path: "",
              name: "laboratorio",
              component: DadosLaboratorio,
              props: true
            },
            {
              path: ":agendamento",
              name: "agendamento",
              component: Agendamento,
              props: true
            },
            {
              path: ":iniciaExperimento",
              name: "iniciaExperimento",
              component: IniciaExperimento,
              props: true
            },
            {
              path: ":dadoscoletados",
              name: "dadoscoletados",
              component: DadosColetados,
              props: true
            }
          ]
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
