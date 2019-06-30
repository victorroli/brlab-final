<template>
  <form>
    <div class="laboratorio">
      <label for="laboratorio">Laboratorio:</label>
      <input id="nome" type="text" name="nome" v-model="nome" disabled />

      <label for="data">Data:</label>
      <datetime v-model="data" type="date"></datetime>

      <label for="horaInicio">Horário Início:</label>
      <div class="horario">
        <datetime v-model="horarioInicio" type="time"></datetime>
      </div>

      <label for="horaFim">Horário Fim:</label>
      <div class="horario">
        <datetime v-model="horarioFim" type="time"></datetime>
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
      horaIni: "",
      minIni: "",
      horaFim: "",
      minFim: ""
    };
  },
  computed: {},
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
  width: 50px;
}

textarea {
  max-width: 500px;
}
</style>

