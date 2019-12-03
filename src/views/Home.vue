<template>
  <div>
    <h2>Seja bem vindo {{this.$store.state.usuario.nome}}</h2>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style scoped>
h1 {
  color: rgba(35, 127, 155, 0.91);
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 2rem;
  text-align: center;
}

p {
  text-align: center;
}
</style>

