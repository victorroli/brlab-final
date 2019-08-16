<template>
  <section>
    <transition mode="out-in">
      <div>
        <h1>Convênios Ativos</h1>
        <b-table striped hover :items="convenios"></b-table>
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ConveniosAtivos",
  data() {
    return {
      convenios: []
    };
  },
  created() {
    this.buscaConvenios();
  },
  methods: {
    buscaConvenios() {
      api.get("/convenios").then(response => {
        console.log("Convênios recuperados: ", response.data);
        this.convenios = response.data;
      });
    }
  }
};
</script>

<style scoped>
</style>