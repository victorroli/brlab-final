import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      name: "",
      nickname: "",
      email: "",
      senha: "",
      confirm_senha: ""
    },
    experimento: {
      tempoRestante: "",
      ativo: "",
      horarioInicio: "",
      horarioTermino: ""
    }
  },
  getters: {
    status: state => {
      return state.experimento.ativo;
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      console.log("Valor status: ", payload);
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      console.log("Valor recebido: ", payload);
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_TIMER(state) {
      state.experimento.tempoRestante--;
    },
    SET_TIMER(state, valorTempo) {
      state.experimento.tempoRestante = valorTempo;
    },
    SET_STATUS(state, valor) {
      state.experimento.ativo = valor;
    },
    SET_HORA_INICIO(state, hora_inicio) {
      state.experimento.horarioInicio = hora_inicio;
    },
    SET_HORA_FIM(state, hora_fim) {
      state.experimento.horarioTermino = hora_fim;
    }
  },
  actions: {
    setUsuario(context, payload) {
      api
        .post(`/usuario`, {
          name: payload.name,
          email: payload.email,
          senha: payload.senha,
          nickname: payload.nickname
        })
        .then(response => {
          if (response.data == 200) {
            context.commit("UPDATE_USUARIO", payload);
          }
        });
    },
    login(context, payload) {
      api.get(`/usuario/${payload.email}`).then(response => {
        if (response.data) {
          context.commit("UPDATE_USUARIO", response.data);
          if (context.state.usuario.senha == payload.senha) {
            context.commit("UPDATE_LOGIN", true);
          } else {
            alert("Credenciais erradas!!");
          }
        }
      });
    }
  }
});
