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
      senha: ""
    },
    experimento: {
      tempoRestante: "",
      ativo: "",
      horarioInicio: "",
      horarioTermino: ""
    },
    reserva: {
      data: "",
      horaInicio: "",
      minutoInicio: "",
      horaFim: "",
      minutoFim: "",
      observacoes: "",
      laboratorio: "",
      usuario: ""
    }
  },
  getters: {
    status: state => {
      return state.experimento.ativo;
    }
  },
  mutations: {
    // Mutations do Usuário
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },

    // Mutations de Experimento
    UPDATE_RESERVA(state, payload) {
      state.reserva = Object.assign(state.reserva, payload);
    },
    SET_HORA_RESERVA_INICIO(state, valor) {
      state.reserva.horarioInicio = valor;
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
          if (response.data == 201) {
            context.commit("UPDATE_USUARIO", payload);
            context.commit("UPDATE_LOGIN", true);
          } else if (response.data == 200) {
            alert("Usuário já cadastrado!!!");
          }
        });
    },
    setReserva(context, payload) {
      api
        .post(`/agendamento`, {
          horario_inicio: payload.horaInicio,
          minuto_inicio: payload.minutoInicio,
          horario_fim: payload.horaFim,
          minuto_fim: payload.minutoFim,
          observacao: payload.observacao,
          laboratorio_id: payload.laboratorio,
          usuario_id: payload.usuario
        })
        .then(response => {
          if (response.data == 200) {
            context.commit("UPDATE_RESERVA", payload);
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
    },
    logout(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        name: "",
        nickname: "",
        email: "",
        senha: ""
        // rua: "",
        // numero: "",
        // bairro: "",
        // cidade: "",
        // estado: ""
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
});
