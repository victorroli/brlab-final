<template>
  <b-modal
    id="modal-form"
    ref="modal"
    title="Papel cadastrado"
    :ok-title="txtBotaoIncluir"
    :cancel-title="txtBotaoCancelar"
    cancel-variant="danger"
    @show="showModal"
    @hidden="resetModal"
    @cancel="funcao_cancel"
    @ok="incluiPapel"
  >
    <form>
      <slot name="titulo"></slot>
      <div class="usuario">
        <form>
          <label for="nome">Nome:</label>
          <b-form-input id="nome" type="text" name="nome" v-model="registro.nome" />

          <label for="descricao">Descrição:</label>

          <b-form-input id="descricao" type="text" name="descricao" v-model="registro.descricao" />
        </form>
      </div>

      <div class="button">
        <slot></slot>
      </div>
    </form>
  </b-modal>
</template>

<script>
// import { mapFields } from "@/helpers/mapFields.js";
import { api } from "@/services.js";

export default {
  name: "PapelForm",
  props: ["papel"],
  data() {
    return {
      registro: {
        id: "",
        nome: "",
        descricao: ""
      },
      txtBotaoIncluir: "Cadastrar",
      txtBotaoCancelar: "Cancelar",
      funcao: "teste()"
    };
  },
  created() {
    this.resetModal();
  },
  methods: {
    recebeValores(papel, acao) {
      this.acao = acao;
      if (acao == "edicao") {
        this.preencheCampos(papel);
        this.txtBotaoIncluir = "Salvar";
      }

      if (acao == "inclusao") {
        this.txtBotaoIncluir = "Cadastrar";
        this.showModal();
      }
    },
    preencheCampos(valor) {
      this.registro.id = valor.id;
      this.registro.nome = valor.nome;
      this.registro.descricao = valor.descricao;
      this.showModal();
    },
    showModal() {
      this.$bvModal.show("modal-form");
    },
    funcao_cancel() {},
    resetModal() {
      this.registro.id = "";
      this.registro.nome = "";
      this.registro.descricao = "";
    },
    incluiPapel() {
      switch (this.acao) {
        case "inclusao":
          api
            .post("/usuarios/papeis/", {
              nome: this.registro.nome,
              descricao: this.registro.descricao
            })
            .then(response => {
              if (response.data.status == 201) {
                this.boxMensagem(
                  `Papel ${this.registro.nome} criado com sucesso!`
                );
              }
            });
          break;
        case "edicao":
          api
            .put(`/usuarios/papeis/${this.registro.id}`, {
              id: this.registro.id,
              nome: this.registro.nome,
              descricao: this.registro.descricao
            })
            .then(response => {
              if (response.data.status == 200) {
                this.boxMensagem(
                  `Papel ${this.registro.nome} atualizado com sucesso!`
                );
              }
            });
          break;
      }
    },
    boxMensagem(mensagem) {
      this.$bvModal.msgBoxOk(mensagem, {
        footerClass: "p-2",
        buttonSize: "md",
        centered: true
      });
    }
  }
};
</script>

<style scoped>
</style>
