<template>
  <div class="container-equipamento">
    <div class="novo-equipamento">
      <b-button @click="$bvModal.show('modal-equipamento')">Adicionar Equipamento</b-button>
    </div>
    <br />
    <b-container class="lista-equipamentos">
      <b-row class="equipamentos" v-if="this.listaEquipamentos !== 0">
        <b-col cols="12">
          <b-row v-for="(equipamento, index) in this.$options.equipamentos" :key="index">
            <b-col cols="7">{{ equipamento.nome }}</b-col>
            <b-col cols="2">
              <b-button class="editar" @click="editarItem(index)">Editar</b-button>
            </b-col>
            <b-col cols="3">
              <b-button class="excluir" @click="removeItem(index)">Remover</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      id="modal-equipamento"
      ref="modal"
      title="Novo Equipamento"
      ok-title="Salvar"
      cancel-title="Cancelar"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <label for="uri-input">Nome:</label>
        <b-form-input
          id="name-input"
          v-model="name"
          :state="nameState"
          required
          aria-describedby="name-input"
        ></b-form-input>
        <b-form-invalid-feedback id="name-input">Campo Nome obrigatório</b-form-invalid-feedback>

        <label for="uri-input">URI:</label>
        <b-form-input
          invalid-feedback="O URI é obrigatório"
          id="uri-input"
          v-model="uri"
          :state="uriState"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="uri-input">Campo URI obrigatório</b-form-invalid-feedback>

        <label for="uri-input">Descrição:</label>
        <b-form-textarea
          id="descricao-input"
          v-model="descricao"
          placeholder="Descreva um pouco sobre o equipamento..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
        <b-form-invalid-feedback id="descricao-input">Campo descrição obrigatório</b-form-invalid-feedback>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameState: null,
      descricaoState: null,
      uriState: null,
      modo: "",
      equipamento: {
        nome: "",
        descricao: "",
        uri: ""
      },
      listaEquipamentos: []
    };
  },
  equipamentos: [],
  nome: "",
  descricao: "",
  uri: "",
  id: "",
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      this.descricaoState = valid ? "valid" : "invalid";
      this.uriState = valid ? "valid" : "invalid";
      return valid;
    },
    showModal() {
      this.equipamento.name = "";
      this.equipamento.descricao = "";
      this.equipamento.uri = "";
      this.uriState = null;
      this.nameState = null;
      this.descricaoState = null;
    },
    resetModal() {
      this.uriState = null;
      this.nameState = null;
      this.descricaoState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      let indexSelecionado = "";
      if (this.$options.nome && this.$options.nome != undefined) {
        let equipamento = Object({
          nome: this.$options.nome,
          descricao: this.$options.descricao,
          uri: this.$options.uri,
          id: this.$options.id
        });
        if (this.modo == "editar") {
          this.$options.equipamentos.forEach((elemento, indice) => {
            if (indice == equipamento.id) {
              indexSelecionado = indice;
            }
          });
          if (indexSelecionado == 0 || indexSelecionado != "")
            this.$options.equipamentos[indexSelecionado] = equipamento;
          this.$nextTick(() => {
            this.$refs.modal.hide();
          });
          return;
        }

        console.log("Índice selecionado: ", indexSelecionado);

        this.$options.equipamentos.push(equipamento);
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    removeItem(index) {
      let confirmaExclusao = confirm(
        `Remover equipamento ${this.$options.equipamentos[index].nome}?`
      );
      if (confirmaExclusao) {
        this.$options.equipamentos.splice(index, 1);
        this.listaEquipamentos = this.$options.equipamentos;
      }
    },
    editarItem(index) {
      this.$bvModal.show("modal-equipamento");
      this.modo = "editar";
      setTimeout(() => {
        let equipamento = this.$options.equipamentos[index];
        document.getElementById("name-input").value = equipamento.nome;
        document.getElementById("uri-input").value = equipamento.uri;
        document.getElementById("descricao-input").value =
          equipamento.descricao;
        this.$options.nome = equipamento.nome;
        this.$options.uri = equipamento.uri;
        this.$options.descricao = equipamento.descricao;
        this.$options.id = index;
      }, 80);
    },
    retornaEquipamentos() {
      return this.$options.equipamentos;
    },
    preencheEquipamentos(equipamentos) {
      this.listaEquipamentos = equipamentos;
      this.$options.equipamentos = equipamentos;
    }
  },

  computed: {
    descricao: {
      set(valor) {
        if (valor) this.$options.descricao = valor;
      },
      get() {
        return this.$options.descricao;
      }
    },
    uri: {
      set(valor) {
        if (valor) this.$options.uri = valor;
      },
      get() {}
    },
    name: {
      set(valor) {
        if (valor) this.$options.nome = valor;
      },
      get() {}
    }
  },
  created() {
    (this.$options.equipamentos = []),
      (this.nome = ""),
      (this.descricao = ""),
      (this.uri = "");
  }
};
</script>

<style scoped>
.novo-equipamento {
  margin-top: 12px;
  text-align: center;
}

.container-equipamento {
  width: 100%;
}

.lista-equipamentos {
  display: flex;
}

.equipamentos {
  width: 100%;
}

.container {
  padding-right: 0px;
  padding-left: 0px;
}

.col-2,
.col-3 {
  padding-right: 0px;
  padding-left: 0px;
}
</style>