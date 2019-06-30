import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: ""
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
    // tempoDoExperimento: state => {
    //   return `${state.experimento.horarioInicio} -
    //      ${state.experimento.horarioTermino}`;
    // }
  },
  mutations: {
    UPDATE_TIMER(state) {
      state.experimento.tempoRestante--;
      console.log("timer: ", state.experimento.tempoRestante);
    },
    SET_TIMER(state, valorTempo) {
      console.log("Value: ", valorTempo);
      state.experimento.tempoRestante = valorTempo;
      console.log("time: ", state.experimento.tempoRestante);
    },
    SET_STATUS(state, valor) {
      state.experimento.ativo = valor;
      console.log("Status store: ", state.experimento.ativo);
    },
    SET_HORA_INICIO(state, hora_inicio) {
      state.experimento.horarioInicio = hora_inicio;
      console.log("ini: ", state.experimento.horarioInicio);
    },
    SET_HORA_FIM(state, hora_fim) {
      state.experimento.horarioTermino = hora_fim;
      console.log("fim: ", state.experimento.horarioTermino);
    }
  },
  actions: {}
});
