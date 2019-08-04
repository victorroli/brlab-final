<template>
  <section class="calendarioModal">
    <b-button class="btn" @click="$bvModal.show('modal-scoped')">Reservar</b-button>
    <b-modal id="modal-scoped" size="xl">
      <template slot="modal-header" slot-scope="{ close }">
        <h5>Horários no {{laboratorio.name}}</h5>
      </template>

      <template slot="default" slot-scope="{ hide }" ref="teste">
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
      </template>

      <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
        <!-- <b-button size="sm" variant="success" @click="ok()">Salvar</b-button> -->
        <b-button size="sm" variant="danger" @click="cancel()">Fechar</b-button>
      </template>
    </b-modal>
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
  // props: ["laboratorio"],
  components: {
    "vue-calendario": VueCal,
    "modal-form": ModalForm
  },
  data() {
    return {
      events: [{}],
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
    },
    laboratorio() {
      return this.$store.state.laboratorio;
    }
  },

  created() {
    this.$options.reserva.laboratorio_id = this.laboratorio;
    console.log("Reserva: ", this.$options.reserva.laboratorio_id);
    this.buscaEventos();
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
          "cadastro"
        );
      } else {
        alert("Horário inválido");
      }
    },

    horarioValido(horarioEvento) {
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
      evento.laboratorio_id = this.$options.reserva.laboratorio_id;
      this.$refs.modalForm.recebeValoresReserva(null, evento, "edicao");
      this.focusEvento = false;
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
    buscaEventos() {
      // console.log("Laboratório: ", this.laboratorio.id);
      api.get(`/agendamento/${this.laboratorio.id}`, {}).then(response => {
        console.log(response.data);
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
</style>
