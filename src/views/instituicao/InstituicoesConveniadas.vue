<template>
  <section>
    <h1>Instituições conveniadas</h1>
    <div id="instituicoes">
      <b-table striped hover :items="instituicoes"></b-table>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "InstituicoesConveniadas",
  data() {
    return { instituicoes: [] };
  },
  created() {
    this.buscaInstituicoes();
  },
  methods: {
    buscaInstituicoes() {
      api.get("/instituicao/").then(response => {
        if (response.data) {
          this.instituicoes = response.data;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
