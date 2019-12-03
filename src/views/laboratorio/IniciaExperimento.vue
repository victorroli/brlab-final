<template>
  <section class="experimentacao-container">
    <div class="inicial" v-if="!start">
      <h1>Iniciar Experimento</h1>
      <button class="btn" @click.prevent="iniciaExperimento()">Iniciar</button>
    </div>
    <div class="labremoto" v-else-if="start">
      <div class="controladores">
        <div>
          <button class="btn danger" @click.prevent="interrompeExperimento()">Parar Experimentação</button>
        </div>
        <div class="temporizador-info">
          <temporizador :seconds="seconds"></temporizador>
        </div>
      </div>
      <div class="experimento">
        <iframe
          width="560"
          height="315"
          src="https://weblab.deusto.es/weblab/labs/"
          frameborder="0"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
          allowfullscreen
        >
          <!-- <img style="width: 80%" src="../../imagens/exp_weblabdeusto.png" /> -->
        </iframe>
      </div>
    </div>
    <!-- <simplert></simplert> -->
  </section>
</template>

<script>
import axios from "axios";
import { api } from "@/services.js";
// import { mapState, mapGetters } from "vuex";
import { mapFields } from "@/helpers/mapFields.js";
import temporizador from "@/components/temporizador.vue";

export default {
  name: "IniciarExperimento",
  props: ["laboratorio_id"],
  data() {
    return {
      start: false,
      seconds: "",
      timestamp_inicio: "",
      timestamp_fim: ""
    };
  },
  components: {
    temporizador
  },

  methods: {
    iniciaExperimento() {
      this.start = !this.start;
      let horarioAtual = this.getHorarioAtual();
      this.$store.dispatch("setExperimento", {
        status: true,
        timer: 10 * 60,
        periodo_inicio: horarioAtual,
        laboratorio_id: this.laboratorio_id
      });
    },
    getHorarioAtual() {
      let data = new Date();

      let horarioAtual = `${data.getFullYear()}-${this.checValores(
        data.getMonth()
      )}-${this.checValores(data.getDate())} ${this.checValores(
        data.getHours()
      )}:${this.checValores(data.getMinutes())}`;

      return horarioAtual;
    },
    interrompeExperimento() {
      let confirm = window.confirm("Deseja parar experimento?");
      if (confirm) {
        this.finalizaExperimento();
      }
    },
    finalizaExperimento() {
      alert("Experimento encerrado");
      this.start = false;
      let horario_final = this.getHorarioAtual();
      console.log("Horário Final: ", horario_final);
      this.$store.commit("SET_HORA_FIM", this.getHorarioAtual());
      this.$store.dispatch("updateExperimento", {
        status: false,
        periodo_fim: horario_final,
        observacao: "Fim do experimento"
      });

      this.$router.push({
        name: "dadoscoletados",
        params: { dadoscoletados: "dados-coletados" }
      });
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        return `0${valorFinal}`;
      }
      return valorFinal;
    }
  },
  watch: {
    ativo(novo, old) {
      if (!novo) {
        this.finalizaExperimento();
      }
    }
  },
  created() {
    console.log("Laboratorio selecionado: ", this.laboratorio_id);
  },
  computed: {
    ...mapFields({
      fields: ["tempoRestante", "ativo", "periodo_inicio", "periodo_fim"],
      base: "experimento"
      // mutation: ["SET_HORA_INICIO", "SET_HORA_FIM", "SET_STATUS"]
    })
  }
};
</script>

<style scoped>
.experimentacao-container {
  height: 100vh;
}
.labremoto {
  margin-top: 20px;
  max-width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  height: 100vh;
}

.experimento {
  margin: 20px auto 20px auto;
  /* margin-bottom: 20px; */
  height: 90%;
  display: flex;
  justify-content: center;
}

.experimento iframe {
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
}

.inicial {
  display: grid;
  justify-content: center;
  margin-top: 20vh;
}

.danger {
  background: crimson;
}

.controladores {
  display: flex;
  justify-content: space-between;
}

.temporizador-info {
  display: flex;
  align-items: center;
}

h1 {
  margin-bottom: 20px;
}
</style>
