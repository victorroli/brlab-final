<template>
  <section>
    <h1>Instituições cadastradas</h1>
    <div id="instituicoes" v-if="instituicoes.length > 0">
      <b-table striped hover :items="instituicoes" :fields="fields" class="text-center">
        <template slot="opcoes" slot-scope="row">
          <b-button class="editar" @click="editar(row.item)">
            <font-awesome-icon icon="edit" />Editar
          </b-button>
          <b-button class="excluir" @click="excluirInstituicao(row.item)">
            <font-awesome-icon icon="trash" />Excluir
          </b-button>
        </template>
      </b-table>
      <div class="group-button">
        <router-link tag="b-button" :to="{name:'nova_instituicao'}">
          <font-awesome-icon icon="plus-circle" />Nova Instituição
        </router-link>
      </div>

      <modal-instituicao ref="modal"></modal-instituicao>
    </div>
    <div v-else>
      <h3>Nenhum registrado encontrado!!!</h3>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
import ModalInstituicao from "@/components/ModalInstituicao.vue";
export default {
  name: "InstituicoesConveniadas",
  components: {
    "modal-instituicao": ModalInstituicao
  },
  data() {
    return {
      instituicoes: [],
      fields: {
        id: {
          label: "ID"
        },
        nome: {
          label: "Nome"
        },
        cnpj: {
          label: "CNPJ"
        },
        telefone: {
          label: "Telefone"
        },
        cidade: {
          label: "Cidade"
        },
        opcoes: {
          label: "Opções"
        }
      },
      confirm: ""
    };
  },
  created() {
    this.buscaInstituicoes();
  },
  methods: {
    buscaInstituicoes() {
      this.instituicoes = [];
      api.get("/instituicoes/").then(response => {
        if (response.data) {
          response.data.map(instituicao => {
            let instit = new Object({
              id: instituicao.id,
              nome: instituicao.nome,
              cnpj: instituicao.cnpj,
              telefone: instituicao.telefone,
              tipo: this.buscaTipo(instituicao.tipo),
              cep: instituicao.cep,
              bairro: instituicao.bairro,
              cidade: instituicao.cidade,
              numero: instituicao.numero,
              rua: instituicao.rua
            });
            this.instituicoes.push(instit);
          });
        }
      });
    },
    buscaTipo(tipo) {
      let descricao = "";
      switch (tipo) {
        case 0: {
          descricao = "Ensino Fundamental";
          break;
        }
        case 1: {
          descricao = "Ensino Médio";
          break;
        }
        case 2: {
          descricao = "Ensino Superior";
          break;
        }
      }
      return descricao;
    },
    editar(item) {
      this.$refs.modal.recebeValoresInstituicao(item);
    },
    excluir(instituicao) {
      api.delete(`/instituicao/${instituicao.id}`).then(response => {
        if (response.data.status == 200) {
          this.confirmExclusao(instituicao.nome);
          this.buscaInstituicoes();
        }
      });
    },
    excluirInstituicao(instituicao) {
      this.confirm = "";
      this.$bvModal
        .msgBoxConfirm(
          "Deseja realmente deletar a instituição " + instituicao.nome + "?",
          {
            title: "",
            // size: "sm",
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
          if (value) this.excluir(instituicao);
        })
        .catch(err => {
          this.$bvModal.msgBoxOk("Erro " + err);
        });
    },
    confirmExclusao(nome) {
      this.$bvModal
        .msgBoxOk("Instituição " + nome + " excluída com sucesso!")
        .then(value => {})
        .catch(err => {
          this.$bvModal.msgBoxOk("Erro " + err);
        });
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 20px auto 20px auto;
}
#instituicoes {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
