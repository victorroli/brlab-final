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
          src="https://www.youtube.com/embed/jzZhGf1oX6E"
          frameborder="0"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <!-- <simplert></simplert> -->
  </section>
</template>

<script>
import axios from "axios";
// import { mapState, mapGetters } from "vuex";
import { mapFields } from "@/helpers/mapFields.js";
import temporizador from "@/components/temporizador.vue";

// console.log("Modal: ", Simplert);

export default {
  name: "IniciarExperimento",
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
      this.$store.commit("SET_STATUS", true);
      this.$store.commit("SET_TIMER", 10);
      this.$store.commit("SET_HORA_INICIO", this.retornaTimestamp());
    },
    interrompeExperimento() {
      let confirm = window.confirm("Deseja parar experimento?");
      if (confirm) {
        this.finalizaExperimento();
      }
    },
    finalizaExperimento() {
      this.$store.commit("SET_STATUS", false);
      alert("Experimento encerrado");
      this.$router.push({
        name: "dadoscoletados",
        params: { dadoscoletados: "dados-coletados" }
      });
      this.start = false;
      this.$store.commit("SET_HORA_FIM", this.retornaTimestamp());
      console.log(this.horarioInicio + " - " + this.horarioTermino);
    },
    retornaTimestamp() {
      var date = new Date();
      // console.log("rece: ", Date.now());
      var horas = date.getHours();
      var minutos = date.getMinutes();
      var segundos = date.getSeconds();
      return `${horas}:${minutos}:${segundos}`;
      // console.log("Timestamp retornado: ", timestamp);
    }
  },
  watch: {
    ativo(novo, old) {
      console.log("Novo: ", novo);
      if (!novo) {
        this.finalizaExperimento();
      }
    }
  },
  computed: {
    ...mapFields({
      fields: ["tempoRestante", "ativo", "horarioInicio", "horarioTermino"],
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
