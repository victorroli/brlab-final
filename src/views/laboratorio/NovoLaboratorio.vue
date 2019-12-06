<template>
  <section class="laboratorio">
    <transition mode="out-in">
      <LaboratorioForm ref="novoLaboratorio">
        <template v-slot:titulo>
          <h1>Novo Laboratório</h1>
        </template>
        <template class="cadastro">
          <div class="group-button">
            <b-button class="btn salvar" @click.prevent="cadastraLab">Cadastrar</b-button>
          </div>
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
      this.$refs.novoLaboratorio.incluirLab();
    }
  }
};
</script>

<style scoped>
h1 {
  margin: auto auto 20px auto;
}
/* .laboratorio {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
} */

label {
  margin-bottom: 7px;
  font-weight: bold;
}

form {
  margin-top: 30px;
  display: grid;
}
.cadastro {
  display: flex;
}
.group-button {
  margin-top: 20px;
  align-items: center;
}
</style>
