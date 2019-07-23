<template>
  <section class="dados-coletados-container">
    <h1>Dados Coletados</h1>
    <div class="info-coletados">
      <p>
        <label>Tempo do Experimento:</label>
        {{tempoRestante }}
      </p>
      <p>
        <label for>Observação:</label>
        {{observacao}}
      </p>
      <p>
        <label>Horário Início:</label>
        {{periodoInicio }}
      </p>
      <p>
        <label>Horário Fim:</label>
        {{periodoFim }}
      </p>
    </div>
    <b-button class="btn" @click.prevent="retornar()">Voltar</b-button>
  </section>
</template>

<script>
import { mapFields } from "@/helpers/mapFields.js";
import { api } from "@/services.js";

export default {
  name: "DadosColetados",
  methods: {
    retornar() {
      this.$router.back(2);
    },

    buscaDadosExperimento() {
      console.log("Id do experimento: ", this.$store.state.experimento.id);
      api
        .get(`/experimento/${this.$store.state.experimento.id}`)
        .then(response => {
          this.$store.commit("UPDATE_EXPERIMENTO", response.data);
        });
    }
  },
  computed: {
    ...mapFields({
      fields: ["periodoInicio", "periodoFim", "observacao"],
      base: "experimento"
    }),
    tempoRestante() {
      // let tempo_inicial = this.horarioInicio.split(":");
      // let tempo_final = this.horarioTermino.split(":");

      // let hora_inicio = Number(tempo_inicial[0]);
      // let hora_final = Number(tempo_final[0]);

      // let minuto_inicio = Number(tempo_inicial[1]);
      // let minuto_final = Number(tempo_final[1]);

      // let segundo_inicio = Number(tempo_inicial[2]);
      // let segundo_final = Number(tempo_final[2]);

      // let horaTotal = hora_final - hora_inicio;
      // let minutosTotais = minuto_final - minuto_inicio;
      // let segundosTotais = segundo_final - segundo_inicio;
      return `A inserir`;
      // return `${horaTotal} Horas, ${minutosTotais} minutos e ${segundosTotais} segundos`;
    }
  },
  created() {
    this.buscaDadosExperimento();
  }
};
</script>

<style scoped>
.dados-coletados-container {
  display: grid;
  justify-content: center;
}

.info-coletados {
  margin-bottom: 20px;
}

p {
  margin: 10px;
  font-weight: 400;
  text-align: left;
  /* font-size: 1rem; */
}
</style>
