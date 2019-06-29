<template>
  <section class="experimentacao-container">
    {{start}}
    <div class="inicial" v-if="!start">
      <h1>Iniciar Experimento</h1>
      <button class="btn" @click.prevent="start = !start">Iniciar</button>
    </div>
    <div class="labremoto" v-else-if="start">
      <div class="controladores">
        <div>
          <button class="btn danger" @click.prevent="start=!start">Parar Experimentação</button>
        </div>
        <div class="temporizador-info"></div>
      </div>
      <div class="experimento">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/8CdcCD5V-d8"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "IniciarExperimento",
  data() {
    return {
      start: false
      // timer: null
    };
  },

  methods: {
    // ativaTemporizador() {
    // }
  },
  created() {
    // this.ativaTemporizador();
  },
  watch: {
    // inicia() {
    //   this.ativaTemporizador();
    // }
  },
  computed: {
    // inicia() {
    //   if (this.start) {
    //     this.ativaTemporizador();
    //   }
    // }
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
