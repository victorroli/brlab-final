<template>
  <section class="laboratorio-container">
    <transition mode="out-in">
      <div v-if="laboratorios && laboratorios.length">
        <div class="pesquisa">
          <form>
            <input
              name="busca"
              id="busca"
              type="text"
              placeholder="Insira o nome do laboratório..."
              v-model="busca"
              @keyup="buscarLaboratorio"
            />
            <input
              type="submit"
              id="lupa"
              value="Buscar"
              @click.prevent="buscarLaboratorio"
            />
          </form>
        </div>
        <div
          class="laboratorios"
          v-if="labsaux && labsaux.length"
          key="laboratorios"
        >
          <div
            class="laboratorio"
            v-for="(laboratorio, index) in labsaux"
            :key="index"
          >
            <router-link
              :to="{
                name: 'laboratorio',
                params: { laboratorio: laboratorio.id }
              }"
            >
              <div class="img-labs">
                <img src="../../assets/lab.svg" />
              </div>
              <p>{{ laboratorio.name }}</p>
            </router-link>
          </div>
        </div>
        <div
          class="retorno"
          v-else-if="labsaux && labsaux.length == 0"
          key="sem-resultados"
        >
          <h4>Nenhum laboratório encontrado...</h4>
        </div>
      </div>
      <div v-else-if="!laboratorios">
        <!-- <Erro /> -->
        <PaginaCarregando />
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers/url.js";
import Erro from "@/components/Erro.vue";
import PaginaCarregando from "@/components/PaginaCarregando.vue";

export default {
  name: "Laboratorios",
  components: {
    Erro,
    PaginaCarregando
  },
  data() {
    return {
      laboratorios: null,
      labsPorPagina: null,
      labsaux: null,
      busca: ""
    };
  },
  methods: {
    getLaboratorios() {
      api.get("/labs").then(response => {
        let lab_filtrados = response.data.filter(
          elemento => elemento.status == 2
        );
        this.laboratorios = lab_filtrados;
        this.labsaux = this.laboratorios;
      });
    },
    buscarLaboratorio() {
      if (!this.busca) {
        this.getLaboratorios();
      }

      if (this.busca.length > 2) {
        let laboratorios_filtro = [];
        this.laboratorios.forEach(laboratorio => {
          if (
            laboratorio.name.toLowerCase().includes(this.busca.toLowerCase())
          ) {
            laboratorios_filtro.push(laboratorio);
          }
          this.labsaux = laboratorios_filtro;
        });
      }
    }
  },
  created() {
    this.getLaboratorios();
  },
  watch: {
    url() {
      this.getLaboratorios();
    }
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/laboratorio?limit=${this.labsPorPagina}${query}`;
    },
    papel() {
      if (
        this.$store.state.usuario.papel_id == 1 ||
        this.$store.state.usuario.papel_id == 3
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.laboratorio-container {
  max-width: 1000px;
  margin: 0 auto;
}

.laboratorios {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
}

.laboratorio {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
  max-width: 250px;
}

.pesquisa {
  grid-column: 1/4;
  justify-content: center;
}

.laboratorio p {
  text-align: center;
}

.laboratorio:hover {
  box-shadow: 0 8px 12px rgba(30, 60, 90, 0.3);
  transform: scale(1.1);
}
.retorno {
  text-align: center;
}
.laboratorio p:nth-child(2) {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  padding-top: 20px;
}
.img-labs {
  display: flex;
  justify-content: center;
}

img {
  max-width: 120px;
}

form {
  max-width: 600px;
  margin: 30px auto 30px auto;
  position: relative;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:focus,
#busca:hover {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../../assets/search.svg") no-repeat center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 20px;
  box-shadow: none;
}
</style>
