<template>
  <section>
    <h1>Divisão de Horários</h1>
    <div>
      <!-- <b-table striped hover :items="listaUsuarios"></b-table> -->
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "DivisaoHorarios",
  data() {
    return { listaHorarios: [] };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
#usuarios {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
