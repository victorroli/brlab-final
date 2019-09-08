<template>
  <section>
    <h1>Laboratórios Cadastrados</h1>

    <div id="laboratorios" v-if="laboratorios.length > 0">
      <b-table striped hover :items="laboratorios" :fields="fields" class="text-center">
        <template slot="opcoes" slot-scope="row">
          <b-button class="editar" @click="editar(row.item)">
            <font-awesome-icon icon="edit" />Editar
          </b-button>
          <b-button class="excluir" @click="excluir(row.item)">
            <font-awesome-icon icon="trash" />Excluir
          </b-button>
        </template>
      </b-table>
      <div class="group-button">
        <router-link tag="b-button" class="button" :to="{name: 'novo-laboratorio'}">
          <font-awesome-icon icon="plus-circle" />Novo Laboratório
        </router-link>
      </div>
      <modal-laboratorio ref="modal"></modal-laboratorio>
    </div>
    <div v-else>
      <h3>Nenhum registrado encontrado!!!</h3>
    </div>
  </section>
</template>

<script>
import ModalLaboratorio from "@/components/ModalLaboratorio.vue";
import { api } from "@/services.js";
export default {
  name: "LaboratoriosCadastrados",
  components: {
    "modal-laboratorio": ModalLaboratorio
  },
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
        let aLabs = response.data.filter(laboratorio => {
          return laboratorio.status == 2;
        });
        this.laboratorios = [...aLabs];
      });
    },
    editar(item) {
      this.$refs.modal.recebeValoresLaboratorios(item, true);
    },
    excluir(item) {
      api.delete(`/laboratorios/${instituicao.id}`).then(response => {
        if (response.data.status == 200) {
          this.confirmExclusao(instituicao.nome);
          this.buscaInstituicoes();
        }
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