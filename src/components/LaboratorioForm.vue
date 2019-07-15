<template>
  <form>
    <slot name="titulo"></slot>
    <div class="laboratorio">
      <label for="laboratorio">Laboratorio:</label>
      <input id="nome" type="text" name="nome" v-model="laboratorio.nome" />

      <label for="host">Host:</label>
      <input id="host" type="text" name="host" v-model="laboratorio.host" />

      <label for="porta">Porta:</label>
      <input id="porta" type="text" name="porta" v-model="laboratorio.porta" />

      <label for="tempo">Tempo de Experimento:</label>
      <input id="tempo" type="number" name="tempo" v-model="laboratorio.tempo" />

      <label for="descricao">Descrição:</label>
      <textarea name="descricao" id="descricao" cols="30" rows="5" v-model="laboratorio.descricao"></textarea>
    </div>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "LaboratorioForm",
  data() {
    return {
      laboratorio: {
        nome: "",
        host: "",
        porta: "",
        tempo: "",
        descricao: ""
      }
    };
  },
  methods: {
    incluirLab() {
      this.$store.dispatch("setLaboratorio", this.laboratorio);
      alert("Solicitação enviada...");
      this.limpaVariaveis();
      this.$router.go(-1);
    },
    limpaVariaveis() {
      (this.nome = ""),
        (this.host = ""),
        (this.porta = ""),
        (this.tempo = ""),
        (this.descricao = "");
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
