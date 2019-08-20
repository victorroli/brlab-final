<template>
  <section>
    <h1>Solicitações Pendentes</h1>
    <div id="solicitacoes" v-if="laboratorios.length > 0">
      <b-table striped hover :items="laboratorios"></b-table>
    </div>
    <div v-else>
      <h3>Nenhum registro encontrado!!!</h3>
    </div>
  </section>
</template>
<script>
export default {
  name: "SolicitacoesLaboratorios",
  data() {
    return {
      laboratorios: ""
    };
  }
};
</script>
<style scoped>
h1 {
  margin: 20px auto 20px auto;
}
</style>