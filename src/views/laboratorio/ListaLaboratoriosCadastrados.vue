<template>
  <section>
    <div id="laboratorios" v-if="laboratorios.length > 0">
      <h1>Laboratórios Cadastrados</h1>
      <b-table striped hover :items="laboratorios" :fields="fields" class="text-center">
        <template v-slot:cell(opcoes)="data" >
          <b-button class="editar" @click="editar(data.item)">
            <font-awesome-icon icon="edit" />Editar
          </b-button>
          <b-button class="excluir" @click="excluirLaboratorio(data.item)">
            <font-awesome-icon icon="trash" />Excluir
          </b-button>
        </template>
      </b-table>
      <div class="group-button">
        <router-link tag="b-button" class="button" :to="{ name: 'novo-laboratorio' }">
          <font-awesome-icon icon="plus-circle" />Novo Laboratório
        </router-link>
      </div>
      <modal-laboratorio ref="modal"></modal-laboratorio>
    </div>
    <div v-else>
      <pagina-carregando />
    </div>
  </section>
</template>

<script>
import ModalLaboratorio from "@/components/ModalLaboratorio.vue";
import PageLoading from "@/components/PaginaCarregando.vue";
import { api } from "@/services.js";
export default {
  name: "LaboratoriosCadastrados",
  components: {
    "modal-laboratorio": ModalLaboratorio,
    "pagina-carregando": PageLoading
  },
  data() {
    return {
      laboratorios: [],
      fields: [
        { key: 'id',   label: "Id"},
        { key: 'name', label: "Nome"},
        { key: 'description', label: "Descrição"},
        { key: 'host', label: "Host"},
        { key: 'port', label: "Porta"},
        { key: 'tempo', label: "Tempo"},
        { key: 'opcoes', label: "Opções"},
      ]
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
    excluir(laboratorio) {
      api.delete(`/labs/${laboratorio.id}`).then(response => {
        if (response.data.status == 205) {
          this.confirmExclusao(labortorio.name);
          this.buscaLaboratorios();
        }
      });
    },
    excluirLaboratorio(laboratorio) {
      this.confirm = "";
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente deletar o Laboratório " + laboratorio.name + "?",
          {
            title: "",
            buttonSize: "md",
            okVariant: "danger",
            okTitle: "Remover",
            cancelTitle: "Cancelar",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value) this.excluir(laboratorio);
        })
        .catch(err => {
          console.log("Erro: ", err);
        });
    },
    confirmExclusao(nome) {
      this.$bvModal
        .msgBoxOk("Laboratório " + nome + " excluído com sucesso!")
        .then(value => {})
        .catch(err => {
          // An error occurred
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
