<template>
  <div class="container-equipamento">
    <div class="novo-equipamento" v-if="cadastro">
      <b-button @click="$bvModal.show('modal-equipamento')"
        >Adicionar Equipamento</b-button
      >
    </div>
    <br />
    <b-container class="lista-equipamentos">
      <b-row class="equipamentos" v-if="this.listaEquipamentos !== 0">
        <b-col cols="12">
          <b-row
            v-for="(equipamento, index) in this.listaEquipamentos"
            :key="index"
          >
            <b-col cols="6">{{ equipamento.nome }}</b-col>
            <b-col cols="3" v-if="cadastro">
              <b-button class="editar" @click="editarItem(index)"
                >Editar</b-button
              >
            </b-col>
            <b-col cols="3" v-if="cadastro">
              <b-button class="excluir" @click="removeItem(index)"
                >Remover</b-button
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <modal-equipamento ref="modalEquipamento"></modal-equipamento>
  </div>
</template>

<script>
import ModalEquipamento from "@/components/ModalEquipamento.vue";
export default {
  data() {
    return {
      listaEquipamentos: [],
      cadastro: true,
      exclusao: false
    };
  },
  components: {
    ModalEquipamento
  },
  equipamentos: [],
  nome: "",
  descricao: "",
  uri: "",
  id: "",
  methods: {
    modalExclusao(index) {
      console.log("Indice: ", index);
      let retorno = false;
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente remover o equipamento " +
            this.listaEquipamentos[index].nome +
            "?",
          {
            title: "Exclusão de Equipamento",
            okVariant: "danger",
            okTitle: "Sim",
            cancelTitle: "Cancelar",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value) {
            // if (!index) {
            //   index += 1;
            // }
            console.log("Equipamentos 1: ", this.listaEquipamentos);
            this.listaEquipamentos.splice(index, 1);
            console.log("Equipamentos 2: ", this.listaEquipamentos);
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log("Retorno na função: ", retorno);
      return retorno;
    },
    removeItem(index) {
      this.modalExclusao(index);
    },
    editarItem(index) {
      this.$refs.modalEquipamento.recebeValores(
        this.listaEquipamentos[index],
        "editar"
      );
    },
    retornaEquipamentos() {
      return this.listaEquipamentos;
    },
    preencheEquipamentos(equipamentos, cadastro) {
      this.listaEquipamentos = equipamentos;
      this.cadastro = cadastro;
    },
    equipamentoEditado(equipamento) {
      let aEquipamentos = this.listaEquipamentos;
      aEquipamentos.map((equip, indice) => {
        if (equip.id == equipamento.id) {
          aEquipamentos[indice] = equipamento;
        }
      });
      this.listaEquipamentos = aEquipamentos;
    }
  },

  watch: {
    listaEquipamentos(equipamentos) {
      this.$parent._data.equipamentos = equipamentos;
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
  display: flex;
  justify-content: center;
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
