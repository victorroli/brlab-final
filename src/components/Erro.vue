<template>
  <div class="sem-resultados">
    <img src="../assets/404.png" alt="Erro encontrado">
    <h2>Busca sem resultados. Tente outro termo.</h2>
    <button class="btn" @click="$router.back(1)">Voltar</button>
  </div>
</template>

<script>
export default {
  name: "erro",
  methods: {
    // retornar() {
    //   this.$router.go("/laboratorios");
    // }
  }
};
</script>

<style scoped>
.sem-resultados {
  margin-top: 4vh;
  text-align: center;
}

.sem-resultados button {
  margin: 50px auto 50px auto;
  display: inline-block;
}

.sem-resultados img {
  max-width: 800px;
  display: inline-block;
}
</style>
