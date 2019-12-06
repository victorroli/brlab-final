<template>
  <b-container class="lab-container">
    <b-row class="linha-1">
      <b-col class="lab-selecionado">
        <div class="lab-img">
          <img src="../../assets/lab.svg" alt />
        </div>
        <div class="lab-info">
          <h3>{{ lab_selecionado.name }}</h3>
          <p>
            <b>Descrição:</b>
            {{ lab_selecionado.description }}
          </p>
          <div class="tempo-experimento">
            <p>
              <b>Tempo de Experimentação:</b>
              {{ lab_selecionado.tempo }} minutos
            </p>
          </div>
          <b-row>
            <b-col class="text-center btn-div" v-if="true">
              <router-link
                :to="{
                  name: 'iniciaExperimento',
                  params: { laboratorio_id: lab_selecionado.id }
                }"
                tag="b-button"
                class="btn"
              >Iniciar</router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center btn-div">
              <router-link
                :to="{
                  name: 'agendamento',
                  params: { laboratorio: lab_selecionado }
                }"
                tag="b-button"
                class="btn"
              >Reservar</router-link>
              <!-- <vue-calendar :laboratorio="lab_selecionado"></vue-calendar> -->
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row class="linha-2">
      <b-col class="text-center" v-if="equipamentos != ''">
        <h3>Equipamentos Disponíveis</h3>
        <ul>
          <li v-for="(equipamentos, index) in equipamentos" :key="index">
            <b>
              <u>{{ equipamentos.nome }}</u>:
            </b>
            {{ equipamentos.descricao }}
          </li>
        </ul>
      </b-col>
    </b-row>
    <hr />
    <b-row class="linha-3">
      <b-col class="text-center">
        <h3>Últimos Experimentos</h3>
        <p>Nenhum experimento realizado</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { api } from "@/services.js";
import CalendarModal from "@/components/CalendarModal.vue";

export default {
  name: "DadosLaboratorio",
  props: ["laboratorio"],
  components: {
    "vue-calendar": CalendarModal
  },
  data() {
    return {
      lab_selecionado: "",
      equipamentos: "",
      mostrarBotaoIniciar: false
    };
  },
  methods: {
    getLaboratorio() {
      if (this.laboratorio) {
        api.get(`/labs/${this.laboratorio}`).then(response => {
          this.lab_selecionado = response.data;
          this.equipamentos = this.lab_selecionado.equipamentos;
        });
      }
    },
    horarioMarcado() {
      api
        .get(`agendamento/valida_horario/${this.$store.state.usuario.id}`)
        .then(response => {
          console.log("Resposta valida: ", response);
          if (response.data.status == 200) {
            this.mostrarBotaoIniciar = true;
          } else this.mostrarBotaoIniciar = false;
        });
    },
    ultimosExperimentos() {
      api
        .get(`/experimentos/usuario/${this.$store.state.usuario.id}`)
        .then(response => {
          console.log("Resposta: ", response);
        });
    }
  },
  watch: {
    lab_selecionado(valor) {
      if (valor) {
        this.$store.commit("UPDATE_LABORATORIO", valor);
      }
    }
  },
  created() {
    this.getLaboratorio();
    this.horarioMarcado();
    this.ultimosExperimentos();
  }
};
</script>

<style scoped>
h3 {
  color: #84f;
  margin-top: 40px;
  font-size: 1.5rem;
}

.linha-2 h3 {
  text-align: left;
  position: static;
}

/* .lab-container {
  width: 1024px;
} */
.lab-selecionado {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px;
  padding-bottom: 20px;
  /* border-bottom: 1px solid red; */
}
.lab-img {
  display: flex;
  justify-content: center;
}

.lab-info {
  display: grid;
  text-align: center;
  font-size: 20px;
}

img {
  max-width: 250px;
}

.btn-div {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.btn {
  width: 249px;
  height: 55px;
  align-content: center;
  background: #87f;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  background: #65d;
}

hr {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: 30%;
  margin-left: 30%;
  color: #84f;
}
/* .tempo-experimento p {
  padding: 20px;
  font-size: 17px;
} */
.descricao-lab {
  font-size: 1.5rem;
  color: rgb(138, 103, 197);
  font-weight: 550;
}
.lab-info p {
  text-align: center;
  font-size: 1rem;
}
</style>
