<template>
  <form>
    <div class="laboratorio">
      <label for="laboratorio">Laboratorio:</label>
      <input id="nome" type="text" name="nome" v-model="nome">

      <label for="data">Data:</label>
      <input id="data" type="date" name="data" v-model="data">

      <label for="horaInicio">Horário Início:</label>
      <div class="horario">
        <input id="horaInicio" type="number" name="horaInicio" v-model="horaIni">
        <input id="minInicio" type="number" name="minInicio" v-model="minIni">
      </div>

      <label for="horaFim">Horário Fim:</label>
      <div class="horario">
        <input id="horaFim" type="number" name="horaFim" v-model="horaFim">
        <input id="minFim" type="number" name="minFim" v-model="minFim">
      </div>

      <label for="observacao">Observação</label>
      <textarea name="observacao" id="observacao" cols="30" rows="5"></textarea>
    </div>

    <!-- <label for="cep">Cep</label>
    <input id="cep" type="text" name="cep" v-model="cep" @keyup="preencherCep" maxlength="8">

    <label for="rua">Rua</label>
    <input id="rua" type="text" name="rua" v-model="rua">

    <label for="numero">Número</label>
    <input id="numero" type="text" name="numero" v-model="numero">

    <label for="bairro">Bairro</label>
    <input id="bairro" type="text" name="bairro" v-model="bairro">

    <label for="cidade">Cidade</label>
    <input id="cidade" type="text" name="cidade" v-model="cidade">

    <label for="estado">Estado</label>
    <input id="estado" type="text" name="estado" v-model="estado">-->

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
export default {
  name: "AgendamentoForm",
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

