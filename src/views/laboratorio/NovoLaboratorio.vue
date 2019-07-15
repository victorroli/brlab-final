<template>
  <section class="laboratorio">
    <transition mode="out-in">
      <LaboratorioForm ref="novoLaboratorio">
        <template v-slot:titulo>
          <h1>Novo Laboratório</h1>
        </template>
        <template>
          <b-button class="btn" @click.prevent="cadastraLab">Cadastrar</b-button>
        </template>
      </LaboratorioForm>
    </transition>
  </section>
</template>

<script>
import LaboratorioForm from "@/components/LaboratorioForm.vue";
export default {
  name: "NovoLaboratorio",
  components: {
    LaboratorioForm
  },
  methods: {
    cadastraLab() {
      console.log("Entrou na função!");
      this.$refs.novoLaboratorio.incluirLab();
    }
  }
};
</script>

<style scoped>
.laboratorio {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

label {
  margin-bottom: 7px;
  font-weight: bold;
}

form {
  margin-top: 30px;
  display: grid;
}
</style>
