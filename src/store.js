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
      nome: "",
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
    UPDATE_USUARIO(state, payload) {
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
    setUsuario(payload) {
      console.log(payload);
      api
        .post(`/usuario`, {
          body: JSON.stringify(payload)
        })
        .then(response => {
          console.log("Resultado: ", response.data);
        });
    }
  }
});
