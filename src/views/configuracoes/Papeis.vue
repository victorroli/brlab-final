<template>
  <section>
    <div id="papeis" v-if="listaPapeis.length">
      <h1>Papeis</h1>
      <b-table
        striped
        hover
        :items="listaPapeis"
        :fields="fields"
        class="text-center"
        v-if="listaPapeis.length"
      >
        <template slot="opcoes" slot-scope="row">
          <b-button class="editar" @click="editar(row.item)">
            <font-awesome-icon icon="edit" />Editar
          </b-button>
          <b-button class="excluir" @click="excluir(row.item)">
            <font-awesome-icon icon="trash" />Excluir
          </b-button>
        </template>
      </b-table>
      <modal-papeis ref="modalPapeis"></modal-papeis>
      <div class="group-button">
        <b-button @click="novoPapel()">
          <font-awesome-icon icon="plus-circle" />Novo Papel
        </b-button>
      </div>
    </div>
    <div v-else>
      <PaginaCarregando v-if="listaPapeis.length == 0" />
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
import PaginaCarregando from "@/components/PaginaCarregando";
import PapelForm from "@/components/forms/Papel.vue";
export default {
  name: "Papel",
  data() {
    return {
      listaPapeis: [],
      fields: {
        id: {
          label: "ID"
        },
        nome: {
          label: "Nome"
        },
        descricao: {
          label: "Descrição"
        },
        opcoes: {
          label: "Opções"
        }
      }
    };
  },
  components: {
    PaginaCarregando,
    "modal-papeis": PapelForm
  },
  created() {
    this.buscaPapeis();
  },
  methods: {
    buscaPapeis() {
      api.get("/usuarios/papeis").then(response => {
        if (response.data.papeis) {
          response.data.papeis.forEach(elemento => {
            let objeto = new Object({
              id: elemento.id,
              nome: elemento.nome,
              descricao: elemento.descricao
            });
            this.listaPapeis.push(objeto);
          });
        }
      });
    },
    excluir(valor) {
      this.$bvModal
        .msgBoxConfirm("Deseja realmente deletar o papel " + valor.nome + "?", {
          title: "",
          buttonSize: "md",
          okVariant: "danger",
          okTitle: "Remover",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.confirmaExclusao(valor);
          }
        })
        .catch(err => {
          console.log("Erro: ", err);
        });
    },
    confirmaExclusao(valor) {
      api.delete(`/usuarios/papeis/${valor.id}`).then(response => {
        if (response.data.status == 200) {
          this.boxMensagem(`Papel ${valor.nome} excluído com sucesso!`);
        }
        console.log("Resposta pega: ", response);
      });
    },
    editar(valor) {
      this.$refs.modalPapeis.recebeValores(valor, "edicao");
    },
    novoPapel() {
      this.$refs.modalPapeis.recebeValores("", "inclusao");
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
console.log("Chega aqui?");
</script>

<style scoped>
#papeis {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>