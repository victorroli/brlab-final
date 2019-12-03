<template>
  <section class="dados-coletados-container">
    <b-container class="info-coletados">
      <b-row>
        <b-col>
          <h1>Dados Coletados</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>Tempo do Experimento:</label>
          <p>{{tempoRestante }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label for>Observação:</label>
          <p>{{observacao}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>Horário Início:</label>
          <p>{{periodo_inicio }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>Horário Fim:</label>
          <p>{{periodo_fim }}</p>
        </b-col>
      </b-row>
    </b-container>

    <div class="info-coletados">
      <!-- <p>
        <label>Tempo do Experimento:</label>
        {{tempoRestante }}
      </p>-->
      <!-- <p>
        <label for>Observação:</label>
        {{observacao}}
      </p>-->
      <!-- <p>
        <label>Horário Início:</label>
        {{periodo_inicio }}
      </p>-->
      <!-- <p>
        <label>Horário Fim:</label>
        {{periodo_fim }}
      </p>-->
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
      this.$router.push({ path: "/experimentos" });
    },

    buscaDadosExperimento() {
      console.log("Id do experimento: ", this.$store.state.experimento.id);
      api
        .get(`/experimento/${this.$store.state.experimento.id}`)
        .then(response => {
          console.log("Resposta obtida: ", response.data);
          // let experimento = response.data.experimento;
          // console.log("Experimento retornado: ", experimento);
          // this.periodo_inicio = experimento.periodo_inicio;
          // this.periodo_fim = experimento.periodo_fim;
          // this.observacao = experimento.observacao;
        });
    }
  },
  watch: {
    periodo_inicio(novo) {
      console.log("Periodo Inicio", novo);
    }
  },
  computed: {
    ...mapFields({
      fields: ["periodo_inicio", "periodo_fim", "observacao", "id"],
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
