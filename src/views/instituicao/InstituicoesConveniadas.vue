<template>
  <section>
    <h1>Instituições cadastradas</h1>
    <div id="instituicoes" v-if="instituicoes.length > 0">
      <b-table striped hover :items="instituicoes" :fields="fields" class="text-center">
        <template slot="opcoes" slot-scope="row">
          <b-button class="editar" @click="editar(row.item)">Editar</b-button>
          <b-button class="excluir" @click="excluir(row.item)">Excluir</b-button>
        </template>
      </b-table>
    </div>
    <div v-else>
      <h3>Nenhum registrado encontrado!!!</h3>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "InstituicoesConveniadas",
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
      }
    };
  },
  created() {
    this.buscaInstituicoes();
  },
  methods: {
    buscaInstituicoes() {
      api.get("/instituicao/").then(response => {
        if (response.data) {
          console.log(response.data);
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
      console.log("Tipo recebido: ", tipo);
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
      console.log("Descrição no momento: ", descricao);
      return descricao;
    },
    editar(item) {
      console.log("Item selecionado: ", item);
    },
    excluir(item) {
      console.log("Item para excluir: ", item);
    }
  }
};
</script>

<style scoped>
#instituicoes {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
