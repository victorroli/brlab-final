<template>
  <section>
    <h1>Solicitações Pendentes</h1>
    <div id="usuarios" v-if="pendentes.length > 0">
      <b-table striped hover :items="pendentes" :fields="fields"></b-table>
    </div>
    <div v-else>
      <h3>Nenhum registrado encontrado!!!</h3>
    </div>
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
        }
      }
    };
  },
  created() {
    this.solicitacoesPendentes();
  },
  methods: {
    solicitacoesPendentes() {
      api.get("/usuarios").then(response => {
        console.log("Resposta: ", response.data);
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
        // this.pendentes = [...pendentes];
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
</style>