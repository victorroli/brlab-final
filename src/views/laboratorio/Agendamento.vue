<template>
  <section class="calendario-modal">
    <h5>Horários no {{laboratorio.name}}</h5>
    <vue-calendario
      ref="vuecal"
      locale="pt-br"
      :startDate="selectedDate"
      :min-date="selectedDate"
      :selected-date="selectedDate"
      :time-from="7 * 60"
      :time-to="24 * 60"
      :disable-views="['years', 'year', 'month', 'day']"
      :cell-click-hold="false"
      :events="events"
      :on-event-create="onEventCreate"
      :on-event-click="verEvento"
      :time-step="laboratorio.tempo"
      @cell-dblclick="efetuarReserva($event)"
      @event-focus="(focusEvento ? verEvento('event-focus', $event): '')"
    ></vue-calendario>

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
  name: "Agendamento",
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
  laboratorio: "",
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
  },

  created() {
    if (this.laboratorio.id) {
      this.$options.reserva.laboratorio_id = parseInt(this.laboratorio.id);
      // console.log("Laboratório id: ", this.$options.reserva.laboratorio_id);
    }
    if (this.laboratorio) this.buscaEventos();
  },

  methods: {
    efetuarReserva(evento) {
      console.log("Evento: ", evento);
      if (this.horarioValido(evento)) {
        this.evento = evento;
        this.$options.reserva.hora = evento.getHours();
        (this.$options.reserva.minutos = evento.getMinutes()),
          (this.$options.reserva.dia = evento.getDate()),
          (this.$options.reserva.mes = evento.getMonth() + 1),
          (this.$options.reserva.ano = evento.getFullYear());
        this.$options.reserva.tempo = this.$store.state.laboratorio.tempo;

        this.$refs.modalForm.recebeValoresReserva(
          this.$options.reserva,
          evento,
          "inclusao"
        );
      } else {
        this.$bvModal.msgBoxOk("Horário Inválido!", {
          footerClass: "p-2",
          buttonSize: "md",
          centered: true
        });
      }
    },

    horarioValido(horario) {
      // let dataSelecionada =
      //   horario.getFullYear() +
      //   "-" +
      //   this.checValores(horario.getMonth()) +
      //   "-" +
      //   this.checValores(horario.getDate());
      let dataAtual = new Date(this.selectedDate);
      let horaAtual = dataAtual.getHours();
      let minutoAtual = dataAtual.getMinutes();

      if (horario.getFullYear() == dataAtual.getFullYear())
        if (horario.getMonth() == dataAtual.getMonth())
          if (horario.getDate() == dataAtual.getDate())
            if (horario.getHours() < dataAtual.getHours()) return false;
            else if (horario.getHours() == horaAtual) {
              if (minutoAtual > horario.getMinutes()) {
                return false;
              }
            }
      return true;
    },

    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        if (valorFinal < 10) valorFinal = `0${valorFinal}`;
      }
      return valorFinal;
    },

    verEvento(acao, evento) {
      evento.laboratorio_id = this.$options.reserva.laboratorio_id;
      if (evento.usuario == this.$store.state.usuario.nome) {
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

      let dataConvertida = new Date(data);
      let dia = "",
        mes = "",
        ano = "",
        hora = "",
        minutos = "";
      ano = dataConvertida.getFullYear();
      mes = this.checValores(dataConvertida.getMonth() + 1, true);
      dia = this.checValores(dataConvertida.getDate());
      hora = this.checValores(dataConvertida.getHours());
      minutos = this.checValores(dataConvertida.getMinutes());

      return `${ano}-${mes}-${dia} ${hora}:${minutos}`;
    },
    buscaEventos() {
      this.events = [];
      setTimeout(() => {
        api
          .get(`/agendamento/laboratorio/${this.laboratorio.id}`, {})
          .then(response => {
            let aEventos = [];
            if (response.data.agendamentos) {
              response.data.agendamentos.forEach(reserva => {
                let oReserva = new Object({
                  start: this.converteDate(reserva.periodo_inicio),
                  end: this.converteDate(reserva.periodo_fim),
                  title: "Horário reservado",
                  content: reserva.observacao,
                  class: "reserva",
                  usuario: reserva.usuario,
                  id: reserva.id
                });
                aEventos.push(oReserva);
              });
            }
            this.events = [...aEventos];
            console.log("Eventos: ", this.events);
          });
      }, 200);
    }
  }
};
</script>

<style scoped>
.calendario-modal {
  /* padding: 10px auto 10px auto; */
  /* display: flex; */
  margin: auto 2% auto 2%;
}

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

h5 {
  margin: 10px auto 10px auto;
  text-align: center;
}

#calendario {
  width: 90%;
}
</style>
