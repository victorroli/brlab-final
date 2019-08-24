<template>
  <section>
    <h1>Laboratórios Cadastrados</h1>
    <div id="laboratorios" v-if="laboratorios.length > 0">
      <b-table striped hover :items="laboratorios" :fields="fields" class="text-center">
        <template slot="opcoes" slot-scope="row">
          <b-button class="editar" @click="editar(row.item)">Editar</b-button>
          <b-button class="excluir" @click="excluirInstituicao(row.item)">Excluir</b-button>
        </template>
      </b-table>
      <div class="group-button">
        <router-link tag="b-button" class="button" :to="{name: 'novo-laboratorio'}">Novo Laboratório</router-link>
      </div>
    </div>
    <div v-else>
      <h3>Nenhum registrado encontrado!!!</h3>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "LaboratoriosCadastrados",
  data() {
    return {
      laboratorios: [],
      fields: {
        name: {
          label: "Nome"
        },
        description: {
          label: "Descrição"
        },
        host: {
          label: "Host"
        },
        port: {
          label: "Porta"
        },
        tempo: {
          label: "Tempo"
        },
        opcoes: {
          label: "Opções"
        }
      }
    };
  },
  methods: {
    buscaLaboratorios() {
      api.get("/labs/").then(response => {
        console.log("Resposta obtida: ", response.data);
        let aLabs = response.data.filter(laboratorio => {
          return laboratorio.status == 2;
        });
        this.laboratorios = [...aLabs];
      });
    }
  },
  created() {
    this.buscaLaboratorios();
  }
};
</script>

<style scoped>
h1 {
  margin: 20px auto 20px auto;
}
#laboratorios {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>