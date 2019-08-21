<template>
  <section>
    <h1>Solicitações Pendentes</h1>
    <transition mode="out-in">
      <div id="usuarios" v-if="pendentes.length > 0">
        <b-table striped hover :items="pendentes" :fields="fields" class="text-center">
          <template slot="opcoes" slot-scope="row">
            <b-button class="aceitar" @click="aceitar(row.item.id)">Aceitar</b-button>
            <b-button class="rejeitar" @click="rejeitar(row.item.id)">Rejeitar</b-button>
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
      fields: {
        id: {
          label: "ID"
        },
        nome: {
          label: "Nome"
        },
        nickname: {
          label: "Nickname"
        },
        email: {
          label: "Email"
        },
        papel: {
          label: "Função Solicitada"
        },
        opcoes: {
          label: "Opções"
        }
      }
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
          console.log("Resposta obtida: ", response);
        });
      this.solicitacoesPendentes();
    },
    rejeitar(item) {
      api.delete(`usuario/${item}`).then(response => {
        let usuario = response.data.content;
        alert("Usuário " + usuario + " deletado com sucesso!!!");
      });
      this.solicitacoesPendentes();
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
            papel: this.descricaoPapel(usuario.papel_id)
          });
          this.pendentes.push(novoUsuario);
        });
      });
    },
    descricaoPapel(papel) {
      let descricao = "";
      switch (papel) {
        case 1: {
          descricao = "Administrador";
          break;
        }
        case 2: {
          descricao = "Aluno";
          break;
        }
        case 3: {
          descricao = "Professor";
          break;
        }
        case 4: {
          descricao = "Pesquisador";
          break;
        }
      }
      return descricao;
    }
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