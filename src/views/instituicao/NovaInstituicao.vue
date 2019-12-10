<template>
  <section class="instituicao">
    <h1>Nova Instituição</h1>

    <form>
      <label for="nome">Nome da Instituição:</label>
      <b-form-input id="nome" type="text" name="nome" v-model="nome" />

      <label for="tipo">Tipo:</label>
      <b-form-select v-model="tipo" :options="options"></b-form-select>

      <div class="dados-menores">
        <div>
          <label for="telefone">Telefone:</label>
          <b-form-input id="telefone" type="text" name="telefone" v-model="telefone" />
        </div>
        <div>
          <label for="cnpj">CNPJ:</label>
          <b-form-input id="cnpj" type="text" name="cnpj" v-model="cnpj" />
        </div>
      </div>

      <label for="rua">Rua:</label>
      <b-form-input id="rua" type="text" name="rua" v-model="rua" />

      <div class="dados-menores">
        <div>
          <label for="cep">CEP:</label>
          <b-form-input id="cep" type="text" name="cep" v-model="cep" />
        </div>
        <div>
          <label for="numero">Número:</label>
          <b-form-input id="numero" type="text" name="numero" v-model="numero" />
        </div>
      </div>

      <label for="complemento">Complemento:</label>
      <b-form-input id="complemento" type="text" name="complemento" v-model="complemento" />

      <label for="bairro">Bairro:</label>
      <b-form-input id="bairro" type="text" name="bairro" v-model="bairro" />

      <label for="cidade">Cidade:</label>
      <b-form-input id="cidade" type="text" name="cidade" v-model="cidade" />
    </form>
    <div class="group-button">
      <b-button id="salvar" class="salvar" @click="salvaInstituicao()">Salvar</b-button>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "NovaInstituicao",
  data() {
    return {
      nome: "",
      telefone: "",
      cnpj: "",
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      tipo: "",
      cep: "",
      options: [
        { value: 0, text: "Educação Básica" },
        { value: 1, text: "Educação Superior" },
        { value: 2, text: "Outro" }
      ]
    };
  },
  methods: {
    salvaInstituicao() {
      if (!this.checCampos()) {
        this.boxMensagem("Preencha todos os campos...");
        return;
      }
      api
        .post("/instituicao", {
          nome: this.nome,
          telefone: this.telefone,
          cnpj: this.cnpj,
          cep: this.cep,
          rua: this.rua,
          bairro: this.bairro,
          cidade: this.cidade,
          tipo: this.tipo,
          cep: this.cep
        })
        .then(response => {
          if (reseponse.data == 201) {
            alert("Laboratório cadastrado com sucesso!!!");
          }
        });
    },
    boxMensagem(mensagem) {
      this.$bvModal.msgBoxOk(mensagem, {
        footerClass: "p-2",
        buttonSize: "md",
        centered: true
      });
      this.buscaPapeis();
    },
    checCampos() {
      let erro = false;
      if (!this.nome) {
        erro = true;
      }
      if (!this.telefone) {
        erro = true;
      }
      if (!this.cnpj) {
        erro = true;
      }
      if (!this.cep) {
        erro = true;
      }
      if (!this.rua) {
        erro = true;
      }
      if (!this.bairro) {
        erro = true;
      }
      if (!this.cidade) {
        erro = true;
      }
      if (!this.tipo) {
        erro = true;
      }
      if (!this.cep) {
        erro = true;
      }
      if (erro) {
        return false;
      }
    }
  }
};
</script>

<style scoped>
#salvar {
  margin-top: 20px;
  /* text-align: center; */
}

.dados-menores {
  margin-top: 10px;
  display: inline-flex;
  width: 100%;
}

.dados-menores div {
  width: 48%;
}

.dados-menores div:first-child {
  margin-right: 4%;
}
.group-button {
  display: flex;
  justify-content: center;
}
</style>
