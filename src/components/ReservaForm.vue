<template>
  <form>
    <div class="laboratorio">
      <label for="laboratorio">Laboratorio:</label>
      <input id="nome" type="text" name="nome" v-model="nome" disabled />
      <!-- {{nome}} -->
      <label for="data">Data:</label>
      <datetime v-model="data" type="date"></datetime>

      <label for="horaInicio">Horário Início:</label>
      <div class="horario">
        <!-- <datetime v-model="horarioInicio" type="time"></datetime> -->
        <input type="time" v-model="horarioInicio" />
        {{horarioInicio}}
        <!-- <input type="text"> v-model= -->
      </div>

      <label for="horaFim">Horário Fim:</label>
      <div class="horario">
        <!-- <datetime v-model="horarioFim" type="time"></datetime> -->
        <input type="time" v-model="horarioFim" />
        {{horarioFim}}
      </div>

      <label for="observacao">Observação</label>
      <textarea name="observacao" id="observacao" cols="30" rows="5"></textarea>
    </div>

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { Datetime } from "vue-datetime";

export default {
  name: "AgendamentoForm",
  props: ["laboratorio", "nome"],
  components: {
    datetime: Datetime
  },
  data() {
    return {
      data: "",
      horaInicio: "",
      minIni: "",
      horaFim: "",
      minFim: ""
    };
  },
  computed: {
    horarioInicio: {
      set(valor) {
        console.log("Valor: ", valor);
        this.horaInicio = valor;
      },
      get() {
        return this.horaInicio;
      }
    },
    horarioFim: {
      set(valor) {
        console.log("Horario Fim: ", valor);
        this.horaFim = valor;
      },
      get() {
        return this.horaFim;
      }
    }
  },
  methods: {}
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

