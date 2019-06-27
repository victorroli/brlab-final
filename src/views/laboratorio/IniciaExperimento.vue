<template>
  <section class="experimentacao-container">
    <div class="inicial" v-if="!start">
      <h1>Iniciar Experimento</h1>
      <button class="btn" @click.prevent="start = !start">Iniciar</button>
    </div>
    <div class="labremoto" v-else-if="start">
      <div class="controladores">
        <div>
          <label for>Contador:</label>
          <input type="text" value="Timer">
        </div>
        <button class="btn danger" @click.prevent="start=!start">Parar Experimentação</button>
      </div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/8CdcCD5V-d8"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: "IniciarExperimento",
  data() {
    return {
      start: false
    };
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
  height: 80vh;
}

.labremoto iframe {
  /* position: absolute; */
  margin-top: 40px;
  top: 0;
  left: 0;
  width: 100%;
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
</style>
