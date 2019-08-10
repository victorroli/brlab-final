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
      nickname: "",
      email: "",
      senha: "",
      papel_id: ""
    },
    experimento: {
      id: "",
      tempoRestante: "",
      ativo: "",
      periodo_inicio: "",
      periodo_fim: "",
      observacao: ""
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
    },
    laboratorio: {
      id: "",
      tempo: ""
    },
    equipamentos: []
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
    UPDATE_LABORATORIO(state, payload) {
      state.laboratorio = payload;
    },
    UPDATE_EXPERIMENTO(state, payload) {
      state.experimento = Object.assign(state.experimento, payload);
    },
    UPDATE_EQUIPAMENTOS(state, payload) {
      state.equipamentos.push(payload);
    },
    REMOVE_EQUIPAMENTO(state, payload) {
      state.equipamentos.splice(payload, 1);
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
      state.experimento.periodo_inicio = hora_inicio;
    },
    SET_HORA_FIM(state, hora_fim) {
      state.experimento.periodo_fim = hora_fim;
    },
    SET_OBSERVACAO(state, observacao) {
      state.experimento.observacao = observacao;
    },
    SET_EXPERIMENTO_ID(state, payload) {
      state.experimento.id = payload;
    }
  },
  actions: {
    setUsuario(context, payload) {
      api
        .post(`/usuario`, {
          nome: payload.nome,
          email: payload.email,
          senha: payload.senha,
          nickname: payload.nickname,
          papel_id: payload.papel_id
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

    setExperimento(context, payload) {
      console.log("Objeto passado: ", payload);

      api
        .post("/experimento", {
          periodo_inicio: payload.periodo_inicio,
          usuario_id: context.state.usuario.id,
          laboratorio_id: payload.laboratorio_id
        })
        .then(response => {
          console.log("Dados obtidos: ", response.data);
          if (response.data.status == 201) {
            if (payload.status) {
              context.commit("SET_TIMER", payload.timer);
              context.commit("SET_STATUS", payload.status);
              context.commit("SET_HORA_INICIO", payload.periodo_inicio);
              context.commit(
                "SET_EXPERIMENTO_ID",
                parseInt(response.data.experimento_id)
              );
              // console.log("Response: ", context.state.experimento.id);
            }
          }
        });
    },

    updateExperimento(context, payload) {
      console.log("Enter in a function: ", payload);
      context.commit("SET_STATUS", payload.status);
      api
        .put(`/experimento/${context.state.experimento.id}`, {
          periodo_fim: payload.periodo_fim,
          observacao: payload.observacao
        })
        .then(response => {
          if (response.data.status == 201) {
            context.commit("SET_HORA_FIM", payload.periodo_fim);
            context.commit("SET_OBSERVACAO", payload.observacao);
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
          if (response.data == 201) {
            // console.log("Passou com 201");
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
        nome: "",
        nickname: "",
        email: "",
        senha: "",
        papel_id: ""
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
