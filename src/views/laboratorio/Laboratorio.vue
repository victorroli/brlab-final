<template>
  <section>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Laboratorio",
  data() {
    return {
      busca: ""
    };
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
