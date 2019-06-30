<template>
  <section class="dados-coletados-container">
    <h1>Dados Coletados</h1>
    <div class="info-coletados">
      <p>
        <b>Tempo do Experimento:</b>
        {{tempoRestante }}
      </p>
      <p>
        <b>Horário Início:</b>
        {{horarioInicio }}
      </p>
      <p>
        <b>Horário Fim:</b>
        {{horarioTermino }}
      </p>
    </div>
    <button class="btn" @click.prevent="retornar()">Voltar</button>
  </section>
</template>

<script>
import { mapFields } from "@/helpers/mapFields.js";

export default {
  name: "DadosColetados",
  methods: {
    retornar() {
      this.$router.back(2);
    }
  },
  computed: {
    ...mapFields({
      fields: ["horarioInicio", "horarioTermino"],
      base: "experimento",
      mutation: ["SET_HORA_INICIO", "SET_HORA_FIM", "SET_STATUS"]
    }),
    tempoRestante() {
      let tempo_inicial = this.horarioInicio.split(":");
      let tempo_final = this.horarioTermino.split(":");

      let hora_inicio = Number(tempo_inicial[0]);
      let hora_final = Number(tempo_final[0]);

      let minuto_inicio = Number(tempo_inicial[1]);
      let minuto_final = Number(tempo_final[1]);

      let segundo_inicio = Number(tempo_inicial[2]);
      let segundo_final = Number(tempo_final[2]);

      let horaTotal = hora_final - hora_inicio;
      let minutosTotais = minuto_final - minuto_inicio;
      let segundosTotais = segundo_final - segundo_inicio;

      return `${horaTotal} Horas, ${minutosTotais} minutos e ${segundosTotais} segundos`;
    }
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
