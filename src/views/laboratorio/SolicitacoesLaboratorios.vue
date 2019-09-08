<template>
  <section>
    <h1>Solicitações Pendentes</h1>
    <div id="solicitacoes" v-if="laboratorios.length > 0">
      <b-table striped hover :items="laboratorios" :fields="fields">
        <template slot="opcoes" slot-scope="row">
          <!-- <b-button class="editar" @click="aceitar(row.item.id)">
            <font-awesome-icon icon="check-circle" />Aceitar
          </b-button>
          <b-button class="excluir" @click="rejeitar(row.item.id)">
            <font-awesome-icon icon="times-circle" />Rejeitar
          </b-button>-->
          <b-button class="ver" @click="aceitar(row.item)">
            <font-awesome-icon icon="eye" />Ver Detalhes
          </b-button>
        </template>
      </b-table>
      <modal-laboratorio ref="modal"></modal-laboratorio>
      <b-modal id="my-modal" centered title="Solicitação - Laboratório" ok-only>
        <p class="my-2">{{resposta}}</p>
      </b-modal>
    </div>
    <div v-else>
      <h3>Nenhum registro encontrado!!!</h3>
    </div>
  </section>
</template>
<script>
import { api } from "@/services.js";
import ModalLaboratorio from "@/components/ModalLaboratorio.vue";
export default {
  name: "SolicitacoesLaboratorios",
  components: {
    ModalLaboratorio
  },
  data() {
    return {
      laboratorios: "",
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
        },
        resposta: ""
      }
    };
  },
  created() {
    this.buscaSolicitacoes();
  },
  methods: {
    buscaSolicitacoes() {
      api.get(`/laboratorios/solicitacoes/`).then(response => {
        this.laboratorios = response.data.content;
      });
    },
    aceitar(item) {
      this.$refs.modal.recebeValoresLaboratorios(item, false);
    },
    exibeModal(mensagem) {
      this.resposta = mensagem;
      this.$bvModal.show("my-modal");
    }
  }
};
</script>
<style scoped>
h1 {
  margin: 20px auto 20px auto;
}

#solicitacoes {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>