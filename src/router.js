import Vue from "vue";
import Router from "vue-router";
import Laboratorios from "@/views/laboratorio/Laboratorios.vue";
import ListaLaboratorios from "@/views/laboratorio/ListaLaboratorios.vue";
import Laboratorio from "@/views/laboratorio/Laboratorio.vue";
import Experimentos from "@/views/Experimentos.vue";
import Reservas from "@/views/Reservas.vue";
import Login from "@/views/usuario/Login.vue";
import RegisterUser from "@/views/usuario/RegisterUser.vue";
import Usuarios from "@/views/usuario/Usuarios.vue";
import ListaUsuarios from "@/views/usuario/ListaUsuarios.vue";
import SolicitacoesUsuarios from "@/views/usuario/SolicitacoesUsuarios.vue";
import Home from "@/views/Home.vue";
import Agendamento from "@/views/laboratorio/Agendamento.vue";
import DadosLaboratorio from "@/views/laboratorio/DadosLaboratorio.vue";
import NovoLaboratorio from "@/views/laboratorio/NovoLaboratorio.vue";
import DadosColetados from "@/views/laboratorio/DadosColetados.vue";
import IniciaExperimento from "@/views/laboratorio/IniciaExperimento.vue";
import DivisaoHorarios from "@/views/DivisaoHorarios.vue";
import InstituicoesConveniadas from "@/views/instituicao/InstituicoesConveniadas.vue";
import NovaInstituicao from "@/views/instituicao/NovaInstituicao.vue";
import Instituicoes from "@/views/instituicao/Instituicoes.vue";
import NovoConvenio from "@/views/convenio/NovoConvenio.vue";
import ConveniosAtivos from "@/views/convenio/ConveniosAtivos.vue";
import Convenios from "@/views/convenio/Convenios.vue";
import SolicitacoesLaboratorios from "@/views/laboratorio/SolicitacoesLaboratorios.vue";

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
          path: "/novo",
          name: "novo-laboratorio",
          component: NovoLaboratorio
        },
        {
          path: "/solicitacoes_laboratorios",
          name: "solicitacoes-laboratorios",
          component: SolicitacoesLaboratorios
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
      path: "/divisao_horarios",
      name: "divisao-horarios",
      component: DivisaoHorarios
    },
    {
      path: "",
      name: "convenios",
      component: Convenios,
      children: [
        {
          path: "",
          name: "convenios_ativos",
          component: ConveniosAtivos
        },
        {
          path: "/novo",
          name: "novo_convenio",
          component: NovoConvenio
        }
      ]
    },
    {
      path: "/instituicoes",
      name: "instituicoes",
      component: Instituicoes,
      children: [
        {
          path: "",
          name: "instituicoes_conveniadas",
          component: InstituicoesConveniadas,
          props: true
        },
        {
          path: "/instituicao",
          name: "nova_instituicao",
          component: NovaInstituicao,
          props: true
        }
      ]
    },
    {
      path: "/usuarios",
      name: "usuarios",
      component: Usuarios,
      children: [
        {
          path: "",
          name: "usuarios",
          component: ListaUsuarios,
          props: true
        },
        {
          path: "/solicitacoes",
          name: "solicitacoes_usuarios",
          component: SolicitacoesUsuarios,
          props: true
        }
      ]
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
