<template>
  <form>
    <slot name="titulo"></slot>

    <div class="laboratorio">
      <label for="laboratorio">Laboratorio:</label>
      <input id="nome" type="text" name="nome" v-model="nome" disabled />
      <label for="data">Data:</label>

      <vue-calendar></vue-calendar>

      <!-- <input type="date" name="data" v-model="reserva.data" />

      <label for="horaInicio">Horário Início:</label>
      <div class="horario">
        <input type="time" v-model="horarioInicio" />
        {{horarioInicio}}
      </div>

      <label for="horaFim">Horário Fim:</label>
      <div class="horario">
      <!-- <datetime v-model="horarioFim" type="time"></datetime>-->
      <!-- <input type="time" v-model="horarioFim" />
        {{horarioFim}}
      </div>-->

      <label for="observacao">Observação</label>
      <textarea name="observacao" id="observacao" cols="30" rows="5" v-model="reserva.observacao"></textarea>
    </div>

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
// import { mapFields } from "@/helpers/mapFields.js";
// import { Datetime } from "vue-datetime";
// import Calendar from "@/components/Calendar.vue";
import CalendarModal from "@/components/CalendarModal.vue";

export default {
  name: "AgendamentoForm",
  props: ["lab_id", "nome"],
  components: {
    "vue-calendar": CalendarModal
  },
  data() {
    return {
      reserva: {
        data: "",
        horaInicio: "",
        minutoInicio: "",
        usuario: "",
        horaFim: "",
        minutoFim: "",
        laboratorio: ""
      }
    };
  },
  methods: {
    salvarAgendamento() {
      console.log("Registro geral: ", this.reserva);
      if (!this.validaDados()) {
        this.reserva.usuario = this.$store.state.usuario.id;
        this.reserva.laboratorio = this.lab_id;
        this.$store.dispatch("setReserva", this.reserva);
        alert("Agendamento realizado!!!");
        this.$router.go(-1);
      }
    },
    validaDados() {
      console.log("No bruto: ", this.reserva.horaInicio);
      var erro = false;

      if (!this.reserva.horaInicio || !this.reserva.horaFim) {
        erro = true;
      }

      if (!this.reserva.minutoInicio || !this.reserva.minutoFim) {
        erro = true;
      }

      if (!this.reserva.data) erro = true;

      return erro;
    }
  },
  computed: {
    horarioInicio: {
      set(valor) {
        var hora_entrada = valor.split(":");
        this.reserva.horaInicio = hora_entrada[0];
        this.reserva.minutoInicio = hora_entrada[1];
      },
      get() {}
    },
    horarioFim: {
      set(valor) {
        var hora_saida = valor.split(":");
        this.reserva.horaFim = hora_saida[0];
        this.reserva.minutoFim = hora_saida[1];
      },
      get() {}
    }
  }
};
</script>

<style scoped>
form,
.laboratorio {
  display: grid;
  /* grid-template-columns: 1fr; */
  align-items: center;
}

.horario input {
  margin: 10px;
  /* width: 50px; */
}

textarea {
  max-width: 500px;
}
</style>

