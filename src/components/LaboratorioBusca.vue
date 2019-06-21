<template>
  <form>
    <input name="busca" id="busca" type="text" placeholder="Buscar Laboratório..." v-model="busca">
    <input type="submit" id="lupa" value="Buscar" @click.prevent="buscarLaboratorio">
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LaboratorioBusca",
  data() {
    return {
      busca: ""
    };
  },
  methods: {},
  actions: {}
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: none;
}
</style>
