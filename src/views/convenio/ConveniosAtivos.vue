<template>
  <section>
    <h1>Convênios Ativos</h1>
    <transition mode="out-in">
      <div id="convenios" v-if="convenios.length > 0">
        <b-table striped hover :items="convenios" :fields="fields" class="text-center">
          <template slot="opcoes" slot-scope="row">
            <b-button class="editar" @click="editar(row.item.id)">Editar</b-button>
            <b-button class="excluir" @click="excluir(row.item.id)">Excluir</b-button>
          </template>
        </b-table>
      </div>
      <div v-else>
        <h3>Nenhum registro encontrado!!!</h3>
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ConveniosAtivos",
  data() {
    return {
      convenios: [],
      fields: {
        id: {
          label: "ID"
        },
        instituicao_id: {
          label: "Instituição Parceira"
        },
        laboratorio_id: {
          label: "Laboratório alvo"
        },
        criacao: {
          label: "Criado em"
        },
        validade: {
          label: "Valido até"
        },
        opcoes: {
          label: "Opções"
        }
      }
    };
  },
  created() {
    this.buscaConvenios();
  },
  methods: {
    buscaConvenios() {
      api.get("/convenios").then(response => {
        response.data.map(convenio => {
          let novoConvenio = new Object({
            id: convenio.id,
            instituicao_id: convenio.instituicao_id,
            laboratorio_id: convenio.laboratorio_id,
            criacao: this.converteDate(convenio.criacao),
            validade: this.converteDate(convenio.validade)
          });
          this.convenios.push(novoConvenio);
        });
      });
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        return `0${valorFinal}`;
      }
      return valorFinal;
    },

    converteDate(data) {
      console.log("Não tratada: ", data);
      let dataTratada = new Date(data);
      let stringFinal = `${this.checValores(
        dataTratada.getDate()
      )}/${this.checValores(
        dataTratada.getMonth()
      )}/${dataTratada.getFullYear()}`;
      return stringFinal;
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 20px auto 20px auto;
}
#convenios {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>