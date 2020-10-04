<template>
  <section>
    <h1>Solicitações Pendentes</h1>
    <transition mode="out-in">
      <div id="usuarios" v-if="pendentes.length > 0">
        <b-table striped hover :items="pendentes" :fields="fields" class="text-center">
          <template v-slot:cell(opcoes)="data">
            <b-button class="editar" @click="aceitar(data.item.id)">
              <font-awesome-icon icon="check-circle" />Aceitar
            </b-button>
            <b-button class="excluir" @click="rejeitar(data.item.id)" v-if="data.item.papel_id != 1">
              <font-awesome-icon icon="trash" />Rejeitar
            </b-button>
          </template>
        </b-table>
      </div>
      <div v-else>
        <h3>Nenhuma solicitação no momento!!!</h3>
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "SolicitacoesUsuarios",
  data() {
    return {
      pendentes: [],
      fields: [
        {key:'id', label:"ID"},
        {key:'nome', label:"Nome"},
        {key:'nickname', label:"Nickname"},
        {key:'email', label:"Email"},
        {key:'papel', label:"Função Solicitada"},
        {key:'opcoes', label:"Opções"}
      ]
    };
  },
  created() {
    this.solicitacoesPendentes();
  },
  methods: {
    aceitar(item) {
      api
        .put(`/usuario/${item}`, {
          verificado: "true"
        })
        .then(response => {
          console.log("Resp: ", response);
          if (response.data.status == 201) {
            this.$bvModal
              .msgBoxConfirm("Integrar usuário " + usuario + " ao sistema?")
              .then(value => {
                if (value) {
                  this.$bvModal.msgBoxOk(
                    "Solicitação do usuário " + usuario + " aceita!"
                  );
                  this.solicitacoesPendentes();
                }
              });
          }
        });
    },
    rejeitar(item) {
      api.delete(`usuario/${item}`).then(response => {
        let usuario = response.data.content;
        this.$bvModal
          .msgBoxConfirm("Rejeitar solicitação do usuário " + usuario + "?")
          .then(value => {
            if (value) {
              this.$bvModal.msgBoxOk(
                "Solicitação do usuário " + usuario + " rejeitada!"
              );
              this.solicitacoesPendentes();
            }
          });
      });
    },
    solicitacoesPendentes() {
      api.get("/usuarios").then(response => {
        this.pendentes = [];
        let pendentes = response.data.filter(usuario => {
          return usuario.verificado == false;
        });
        pendentes.map(usuario => {
          let novoUsuario = new Object({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nickname: usuario.nickname,
            papel: usuario.descricao,
            papel_id: usuario.papel_id
          });
          this.pendentes.push(novoUsuario);
        });
      });
    }
    // descricaoPapel(papel) {
    //   let descricao = "";
    //   switch (papel) {
    //     case 1: {
    //       descricao = "Administrador";
    //       break;
    //     }
    //     case 2: {
    //       descricao = "Aluno";
    //       break;
    //     }
    //     case 3: {
    //       descricao = "Professor";
    //       break;
    //     }
    //     case 4: {
    //       descricao = "Pesquisador";
    //       break;
    //     }
    //   }
    //   return descricao;
    // }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
#usuarios {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
.aceitar {
  /* background: blue; */
}
.rejeitar {
  /* background: red; */
}
</style>