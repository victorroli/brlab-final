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
      <div class="group-button">
        <b-button @click="novoPapel()">
          <font-awesome-icon icon="plus-circle" />Novo Papel
        </b-button>
      </div>
    </div>
    <div v-else>
      <PaginaCarregando v-if="listaPapeis.length == 0" />
    </div>
    <modal-papeis ref="modalPapeis" :titulo="titulo"></modal-papeis>
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
      },
      titulo: ""
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
      this.listaPapeis = [];
      let aLista = [];
      api.get("/usuarios/papeis").then(response => {
        if (response.data.papeis) {
          response.data.papeis.forEach(elemento => {
            let objeto = new Object({
              id: elemento.id,
              nome: elemento.nome,
              descricao: elemento.descricao
            });
            this.listaPapeis.push(objeto);
            // console.log("Papeis...", this.listaPapeis);
            // aLista = [...this.listaPapeis];
          });
        }
        // this.listaPapeis = this.ordenaLista(aLista);
      });
    },
    // ordenaLista(lista) {
    //   console.log("LIsta: ", lista);
    //   lista.sort(function(a, b) {
    //     return parseInt(a.id) - parseInt(b.id);
    //   });
    // },
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
        } else if (response.data.status == 204) {
          this.boxMensagem(
            `Papel ${valor.nome} não pode ser excluído, possui usuários vinculados!`
          );
        }
      });
    },
    editar(valor) {
      this.$refs.modalPapeis.recebeValores(valor, "edicao");
      this.titulo = "Papel cadastrado";
    },
    novoPapel() {
      this.$refs.modalPapeis.recebeValores("", "inclusao");
      this.titulo = "Cadastrar Papel/Função";
    },
    boxMensagem(mensagem) {
      this.$bvModal.msgBoxOk(mensagem, {
        footerClass: "p-2",
        buttonSize: "md",
        centered: true
      });
      this.buscaPapeis();
    }
  }
};
</script>

<style scoped>
#papeis {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>