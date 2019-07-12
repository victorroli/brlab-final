<template>
  <section class="agendamento">
    <transition mode="out-in">
      <AgendamentoForm ref="agendaLaboratorio" :lab_id="lab_id" :nome="nome_lab">
        <template v-slot:titulo>
          <h1>Agendar Laboratório</h1>
        </template>
        <template>
          <slot>
            <button class="btn" @click.prevent="reservaLab">Reservar</button>
          </slot>
        </template>
      </AgendamentoForm>
    </transition>
  </section>
</template>

<script>
import AgendamentoForm from "@/components/ReservaForm.vue";
import { mapFields } from "@/helpers/mapFields.js";
export default {
  name: "Agendamento",
  props: ["lab_id", "nome_lab"],
  components: {
    AgendamentoForm
  },
  methods: {
    reservaLab() {
      console.log("Enter in the function !");
      console.log("Agendamento: ", this.$refs.agendaLaboratorio);
      this.$refs.agendaLaboratorio.salvarAgendamento();
      //  if()
    },
    verificaCampos() {
      console.log("horaInicio", this.horaInicio);
    }
  },
  computed: {
    // ...mapFields({
    //   fields: ["horaInicio", "horaFim", "observacoes", "laboratorio", "data"],
    //   base: "reserva"
    // })
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
