<template>
  <section>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Configuracao",
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>