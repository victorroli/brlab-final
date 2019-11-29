<template>
  <b-modal
    id="modal-form"
    ref="modal"
    title="Reserva Laboratório"
    :ok-title="txtBotaoIncluir"
    :cancel-title="txtBotaoExcluir"
    cancel-variant="danger"
    @show="showModal"
    @hidden="resetModal"
    @cancel="excluiReserva"
    @ok="salvaReserva"
  >
    <!-- {{laboratorio}} -->
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <label for="uri-input">Solicitante:</label>
      <b-form-input
        id="solicitante-input"
        v-model="solicitante"
        :state="solicitanteState"
        required
        aria-describedby="solicitante-input"
      ></b-form-input>
      <b-form-invalid-feedback id="solicitante-input">Campo Nome obrigatório</b-form-invalid-feedback>

      <label for="data-input">Data:</label>
      <b-form-input
        id="data-input"
        type="date"
        v-model="data"
        :state="dataState"
        required
        aria-describedby="data-input"
      ></b-form-input>
      <b-form-invalid-feedback id="data-input">A data precisa ser informada</b-form-invalid-feedback>

      <div>
        <div>
          <label for="horario-inicio">Horário Início</label>
          <b-form-input
            id="horarioInicio-input"
            type="time"
            v-model="horarioInicio"
            :state="horarioInicioState"
            required
            aria-describedby="horarioInicio-input"
          ></b-form-input>
          <b-form-invalid-feedback id="horarioInicio-input">O horário de início é obrigatório</b-form-invalid-feedback>
        </div>
        <div>
          <label for="horario-termino">Horário Término</label>
          <b-form-input
            id="horariotermino-input"
            type="time"
            v-model="horarioTermino"
            :state="horarioTerminoState"
            required
            aria-describedby="horariotermino-input"
          ></b-form-input>
          <!-- <b-form-invalid-feedback id="horariotermino-input">O horário de início é obrigatório</b-form-invalid-feedback> -->
        </div>
      </div>

      <label for="observacao-input">Observação:</label>
      <b-form-textarea
        id="observacao-input"
        v-model="observacao"
        placeholder="Descreva mais sobre o experimento a ser realizado"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-form-invalid-feedback id="observacao-input">Campo descrição obrigatório</b-form-invalid-feedback>
    </form>
  </b-modal>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ModalForm",
  // props: [laboratorio],
  data() {
    return {
      evento: "",
      solicitanteState: "",
      horarioInicioState: "",
      horarioTerminoState: "",
      dataState: "",
      solicitante: "",
      observacao: "",
      data: "",
      horarioTermino: "",
      horarioInicio: "",
      acao: "",
      txtBotaoIncluir: "Salvar",
      txtBotaoExcluir: "Cancelar"
    };
  },

  agendamento: {
    id: "",
    solicitante: "",
    horarioInicio: "",
    horarioTermino: "",
    observacao: "",
    data: "",
    laboratorio_id: ""
  },

  watch: {
    data(novo, antigo) {
      if (antigo != novo) {
        this.$options.agendamento.data = novo;
      }
    },
    observacao(novo, antigo) {
      if (antigo != novo) {
        this.$options.agendamento.observacao = novo;
      }
    },
    horarioInicio(novo, antigo) {
      if (antigo != novo) {
        this.$options.agendamento.horarioInicio = novo;
      }
    },
    horarioTermino(novo, antigo) {
      if (antigo != novo) {
        this.$options.agendamento.horarioTermino = novo;
      }
    }
  },

  methods: {
    showModal() {
      this.$bvModal.show("modal-form");
    },
    resetModal() {
      this.$bvModal.hide("modal-form");
      this.$parent.habilitaFocus();
    },
    excluiReserva() {
      if (this.acao == "edicao") {
        this.confirm = "";
        this.$bvModal
          .msgBoxConfirm("Deseja remover o agendamento ?", {
            title: "",
            buttonSize: "md",
            okVariant: "danger",
            okTitle: "Remover",
            cancelTitle: "Cancelar",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            api
              .delete(`/agendamento/${this.$options.agendamento.id}`)
              .then(response => {
                if (response.status == 200) {
                  this.$parent.buscaEventos();
                  this.$bvModal.msgBoxOk("Agendamento excluído com sucesso!", {
                    footerClass: "p-2",
                    buttonSize: "md",
                    centered: true
                  });
                }
              });
          })
          .catch(err => {
            console.log("Erro: ", err);
          });
      }
    },
    salvaReserva() {
      switch (this.acao) {
        case "inclusao": {
          api
            .post(`/agendamento`, {
              horario_inicio: this.$options.agendamento.horarioInicio,
              horario_fim: this.$options.agendamento.horarioTermino,
              observacao: this.$options.agendamento.observacao,
              data: this.$options.agendamento.data,
              laboratorio_id: this.$options.agendamento.laboratorio_id,
              usuario_id: this.$store.state.usuario.id
            })
            .then(response => {
              if (response.data == 201) {
                this.retornaDados();
                alert("Agendamento realizado com sucesso!");
              }
              if (response.data == 200) {
                alert("Erro ao agendar. Verifique os horários");
              }
            });
          break;
        }
        case "edicao": {
          api
            .put(`/agendamento/${this.$options.agendamento.id}`, {
              horario_inicio: this.$options.agendamento.horarioInicio,
              horario_fim: this.$options.agendamento.horarioTermino,
              observacao: this.$options.agendamento.observacao,
              data: this.$options.agendamento.data,
              laboratorio_id: this.$options.agendamento.laboratorio_id,
              usuario_id: this.$store.state.usuario.id,
              id: this.$options.agendamento.id
            })
            .then(response => {
              if (response.data == 201) {
                this.retornaDados();
                alert("Agendamento atualizado com sucesso!");
              }
              if (response.data == 200) {
                alert("Alteração não realizada");
              }
            });
          break;
        }
        case "exclusao": {
          break;
        }
      }
      this.$parent.buscaEventos();
      this.acao = "";
    },
    retornaDados() {
      let dataInicio =
        this.$options.agendamento.data +
        " " +
        this.$options.agendamento.horarioInicio;

      this.$parent.$refs.vuecal.createEvent(this.evento, {
        title: "Reserva " + this.$store.state.usuario.nome,
        content: this.observacao
      });
    },
    preencheCampos(reserva) {
      this.limparCampos();
      this.solicitante = this.$store.state.usuario.nome;
      this.horarioInicio = reserva.inicio;
      this.$options.agendamento.laboratorio_id = reserva.laboratorio_id;
      this.horarioTermino = reserva.termino;
      this.data = reserva.data;
      this.observacao = reserva.observacao;
      this.solicitanteState = true;
      this.horarioInicioState = true;
      this.horarioTerminoState = true;
      this.dataState = true;
      this.$options.agendamento.id = reserva.id;
    },
    limparCampos() {
      this.agendamento = null;
      this.solicitante = "";
      this.observacao = "";
      this.data = "";
      this.horarioTermino = "";
      this.horarioInicio = "";
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) {
          valorFinal += 1;
        }
        return `0${valorFinal}`;
      }
      return valorFinal;
    },
    recebeValoresReserva(reserva, evento, acao) {
      let valoresReserva = new Object();

      let dia = "";
      let mes = "";
      this.acao = acao;
      if (acao == "edicao") {
        this.txtBotaoIncluir = "Salvar";
        this.txtBotaoExcluir = "Excluir";
        let inicio = evento.startDate;
        let fim = evento.endDate;

        dia = this.checValores(inicio.getDate());
        mes = this.checValores(inicio.getMonth(), true);
        valoresReserva.inicio =
          this.checValores(inicio.getHours()) +
          ":" +
          this.checValores(inicio.getMinutes());

        valoresReserva.termino =
          this.checValores(fim.getHours()) +
          ":" +
          this.checValores(fim.getMinutes());
        valoresReserva.data = fim.getFullYear() + "-" + mes + "-" + dia;
        valoresReserva.id = evento.id;
        valoresReserva.laboratorio_id = evento.laboratorio_id;
      }

      if (reserva && acao == "inclusao") {
        this.txtBotaoIncluir = "Cadastrar";
        this.txtBotaoExcluir = "Cancelar";
        let minutoInicio = this.checValores(reserva.minutos);
        valoresReserva.inicio = `${reserva.hora}:${minutoInicio}`;
        let minutoFim = "";

        if (reserva.minutos + reserva.tempo >= 60) {
          minutoFim = reserva.minutos + reserva.tempo - 60;
          valoresReserva.termino = `${reserva.hora + 1}:${
            minutoFim < 10 ? "0" + minutoFim : minutoFim
          }`;
        } else {
          valoresReserva.termino = `${reserva.hora}:${reserva.minutos +
            reserva.tempo}`;
        }
        dia = this.checValores(reserva.dia);
        mes = this.checValores(reserva.mes, true);

        valoresReserva.data = `${reserva.ano}-${mes}-${dia}`;
        valoresReserva.laboratorio_id = reserva.laboratorio_id;
      }
      valoresReserva.observacao = evento.content;
      this.preencheCampos(valoresReserva);
      this.showModal();
      this.evento = evento;
    }
  }
};
</script>

<style>
</style>
