<template>
  <section>
    <h1>Solicitações Pendentes</h1>
    <div id="solicitacoes" v-if="laboratorios.length > 0">
      <b-table striped hover :items="laboratorios" :fields="fields">
        <template v-slot:cell(opcoes)="data">
          <b-button class="ver" @click="aceitar(data.item)">
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
      laboratorios: [],
      fields: [
        {key:"name", label: "Nome"},
        {key:"description", label: "Descrição"},
        {key:"host", label: "Host"},
        {key:"port", label: "Porta"},
        {key:"tempo", label: "Tempo"},
        {key:"opcoes", label: "Opções"}
      ],
      resposta: ''
    };
  },
  created() {
    this.buscaSolicitacoes();
  },
  methods: {
    buscaSolicitacoes() {
      api.get(`/laboratorios/solicitacoes/`).then(response => {
        if (response.data.status == 200 && !response.data.content) {
          this.laboratorios = [...response.data.solicitacoes];
        }
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