<template>
  <div>
    <h2>Seja bem vindo {{this.$store.state.usuario.nome}}</h2>
    <!-- <b-button></b-button> -->
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style>
h1 {
  color: #84f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}

p {
  text-align: center;
}
</style>

