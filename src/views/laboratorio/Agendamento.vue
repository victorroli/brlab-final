<template>
  <section class="agendamento">
    <h1>Agendar Laboratório</h1>

    <AgendamentoForm :laboratorio="laboratorio" :nome="nome_lab">
      <button class="btn" @click.prevent="lab">Reservar</button>
    </AgendamentoForm>
  </section>
</template>

<script>
import AgendamentoForm from "@/components/ReservaForm.vue";

export default {
  name: "Agendamento",
  props: ["laboratorio", "nome_lab"],
  components: {
    AgendamentoForm
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 40px auto 10px auto;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}

.agendamento {
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
