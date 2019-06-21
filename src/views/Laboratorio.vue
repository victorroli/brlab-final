<template>
  <h1>Laboratorio {{laboratorio}}</h1>
</template>

<script>
export default {
  name: "Laboratorio",
  props: ["laboratorio"]
};
</script>

<style scoped>
h1 {
  color: #84f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}

</style>
