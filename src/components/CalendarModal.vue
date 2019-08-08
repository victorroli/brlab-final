<template>
  <section class="calendarioModal">
    <!-- <b-button class="btn" @click="$bvModal.show('modal-scoped')">Reservar</b-button> -->
    <!-- <b-modal id="modal-scoped" size="xl"> -->
    <!-- <template slot="modal-header" slot-scope="{ close }">
      <h5>Horários no {{laboratorio.name}}</h5>
    </template>

    <template slot="default" slot-scope="{ hide }" ref="teste">-->
    <vue-calendario
      ref="vuecal"
      locale="pt-br"
      :startDate="selectedDate"
      :min-date="selectedDate"
      :selected-date="selectedDate"
      :time-from="12 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'day', 'month']"
      :cell-click-hold="false"
      :events="events"
      :on-event-create="onEventCreate"
      :time-step="laboratorio.tempo"
      @cell-dblclick="efetuarReserva($event)"
      @event-focus="(focusEvento ? verEvento('event-focus', $event): '')"
    ></vue-calendario>
    <!-- Evento Focus não utilizado por enquanto -->
    <!-- @event-mouse-enter="verEvento('event-mouse-enter', $event)" -->
    <!-- </template> -->

    <!-- <template slot="modal-footer" slot-scope="{ ok, cancel, hide }"> -->
    <!-- <b-button size="sm" variant="success" @click="ok()">Salvar</b-button> -->
    <!-- <b-button size="sm" variant="danger" @click="cancel()">Fechar</b-button> -->
    <!-- </template> -->
    <!-- </b-modal> -->
    <modal-form ref="modalForm"></modal-form>
  </section>
</template>

<script>
import ModalForm from "@/components/ModalForm.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/pt-br.js";
import { api } from "@/services.js";

export default {
  name: "Calendar",
  props: ["laboratorio"],
  components: {
    "vue-calendario": VueCal,
    "modal-form": ModalForm
  },
  data() {
    return {
      events: [],
      focusEvento: true
    };
  },
  reserva: {
    hora: "",
    minutos: "",
    dia: "",
    mes: "",
    ano: "",
    tempo: "",
    laboratorio_id: ""
  },
  computed: {
    selectedDate() {
      let dataAtual = new Date();
      let hora = dataAtual.getHours();
      let minuto =
        dataAtual.getMinutes() < 10
          ? `0${dataAtual.getMinutes()}`
          : dataAtual.getMinutes();
      return `${dataAtual.getFullYear()}-${
        dataAtual.getMonth() < 10
          ? "0" + (dataAtual.getMonth() + 1)
          : dataAtual.getMonth() + 1
      }-${
        dataAtual.getDate() < 10
          ? "0" + dataAtual.getDate()
          : dataAtual.getDate()
      } ${hora}:${minuto}`;
    }
    // laboratorio() {
    //   // console.log("Valor antigo: ", antigo);
    //   console.log("Valor laboratório: ", this.laboratorio);
    // }
  },

  watch: {},

  created() {
    console.log("Laboratório cadastrado: ", this.laboratorio);
    // this.$options.reserva.laboratorio_id = this.laboratorio.id;
    // console.log("Reserva: ", this.$options.reserva.laboratorio_id);
    if (this.laboratorio) this.buscaEventos();
  },

  methods: {
    efetuarReserva(evento) {
      if (this.horarioValido(evento)) {
        this.evento = evento;
        this.$options.reserva.hora = evento.getHours();
        (this.$options.reserva.minutos = evento.getMinutes()),
          (this.$options.reserva.dia = evento.getDate()),
          (this.$options.reserva.mes = evento.getMonth()),
          (this.$options.reserva.ano = evento.getFullYear());
        this.$options.reserva.tempo = this.laboratorio.tempo;
        this.$options.reserva.laboratorio_id = this.laboratorio.id;

        this.$refs.modalForm.recebeValoresReserva(
          this.$options.reserva,
          evento,
          "inclusao"
        );
      } else {
        alert("Horário inválido");
      }
    },

    horarioValido(horarioEvento) {
      let dataSelecionada =
        horarioEvento.getFullYear() +
        "-" +
        horarioEvento.getMonth() +
        "-" +
        horarioEvento.getDate();
      console.log("Data do evento: ", dataSelecionada);
      let dataAtual = new Date(this.selectedDate);
      let horaAtual = dataAtual.getHours();
      let minutoAtual = dataAtual.getMinutes();

      if (horarioEvento.getHours() < horaAtual) return false;

      if (horarioEvento.getHours() == horaAtual) {
        if (minutoAtual > horarioEvento.getMinutes()) {
          return false;
        }
      }
      return true;
    },

    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        return `0${valorFinal}`;
      }
      return valorFinal;
    },

    verEvento(acao, evento) {
      // console.log("Evento: ", evento);
      // console.log("Usuário evento: ", evento.usuario);
      // console.log("Usuário do sistema: ", this.$options.reserva.usuario.id);
      evento.laboratorio_id = this.$options.reserva.laboratorio_id;
      if (evento.usuario == this.$store.state.usuario.id) {
        this.$refs.modalForm.recebeValoresReserva(null, evento, "edicao");
        this.focusEvento = false;
      }
    },
    habilitaFocus() {
      this.focusEvento = true;
    },
    onEventCreate(event, deleteEventFunction) {
      event.endTimeMinutes = event.startTimeMinutes + this.laboratorio.tempo;
      var dataFim = new Date(event.start);
      var horaFim = "";
      let minutoFim = "";

      if (dataFim.getMinutes() + this.laboratorio.tempo >= 60) {
        minutoFim = dataFim.getMinutes() + this.laboratorio.tempo - 60;
        horaFim = `${dataFim.getHours() + 1}:${this.checValores(minutoFim)}`;
      } else {
        horaFim = `${dataFim.getHours()}:${dataFim.getMinutes() +
          this.laboratorio.tempo}`;
      }
      event.end =
        dataFim.getFullYear() +
        "-" +
        this.checValores(dataFim.getMonth(), true) +
        "-" +
        this.checValores(dataFim.getDate()) +
        " " +
        horaFim;
      event.endDate = new Date(event.end);
      return event;
    },
    converteDate(data) {
      /*
        A data obtida do banco não vem com o valor GMT, então
        deve-se acrescentar na string esse valor.
        Como neste ano de 2019 não haverá horário de verão
        então permaneceu padrão o valor "-0300 que corresponde ao horário de Brasília"         
      */
      data += "-0300";
      // console.log("Data passada: ", data);
      let dataConvertida = new Date(data);
      let dia = "",
        mes = "",
        ano = "",
        hora = "",
        minutos = "";
      ano = dataConvertida.getFullYear();
      mes = this.checValores(dataConvertida.getMonth(), true);
      dia = this.checValores(dataConvertida.getDate());
      hora = this.checValores(dataConvertida.getHours());
      minutos = this.checValores(dataConvertida.getMinutes());

      // console.log(`${ano}-${mes}-${dia} ${hora}:${minutos}`);
      return `${ano}-${mes}-${dia} ${hora}:${minutos}`;
    },
    buscaEventos() {
      api
        .get(`/agendamento/laboratorio/${this.laboratorio.id}`, {})
        .then(response => {
          let aEventos = [];
          if (Array.isArray(response.data))
            response.data.forEach(reserva => {
              let oReserva = new Object({
                start: this.converteDate(reserva.periodo_inicio),
                end: this.converteDate(reserva.periodo_fim),
                title: "Horário reservado",
                content: reserva.observacao,
                class: "reserva",
                usuario: reserva.usuario_id,
                id: reserva.id
              });
              aEventos.push(oReserva);
            });
          this.events = [...aEventos];
        });
    }
  }
};
</script>

<style scoped>
/* .modal-dialog {
  width: 900px;
} */

.btn {
  width: 100%;
  height: 100%;
  align-content: center;
  background: #87f;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  background: #65d;
}

.vuecal__cell.disabled {
  background: red;
}
</style>
