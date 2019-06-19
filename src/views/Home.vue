<template>
  <div>
    <h1>Laboratórios</h1>
    <Laboratorios/>
  </div>
</template>

<script>
import Laboratorios from "@/components/Laboratorios.vue";
export default {
  name: "home",
  components: {
    Laboratorios
  }
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

