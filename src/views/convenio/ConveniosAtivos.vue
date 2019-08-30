<template>
  <section id="convenios">
    <h1>Convênios Ativos</h1>
    <transition mode="out-in">
      <div v-if="convenios.length > 0">
        <b-table striped hover :items="convenios" :fields="fields" class="text-center">
          <template slot="opcoes" slot-scope="row">
            <b-button class="editar" @click="editar(row.item)">Editar</b-button>
            <b-button class="excluir" @click="excluir(row.item)">Excluir</b-button>
          </template>
        </b-table>
        <!-- <b-button>Novo convênio +</b-button> -->
        <div class="group-button">
          <router-link tag="b-button" :to="{name:'novo_convenio'}">Novo Convênio +</router-link>
        </div>

        <modal-convenio ref="modal"></modal-convenio>
        <b-modal id="my-modal" centered title="Gestão de Convênios" ok-only>
          <p class="my-2">{{mensagem}}</p>
        </b-modal>
      </div>
      <div v-else>
        <h3>Nenhum registro encontrado!!!</h3>
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
import ModalConvenio from "@/components/ModalConvenio.vue";
import { setTimeout } from "timers";
export default {
  name: "ConveniosAtivos",
  components: {
    "modal-convenio": ModalConvenio
  },
  data() {
    return {
      convenios: [],
      mensagem: "",
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
      this.convenios = [];
      api.get("/convenios").then(response => {
        response.data.content.map(convenio => {
          let novoConvenio = new Object({
            id: convenio.id,
            instituicao_id: convenio.instituicao_id,
            laboratorio_id: convenio.laboratorio_id,
            criacao: this.converteDate(convenio.criacao),
            validade: this.converteDate(convenio.validade),
            tempo: convenio.tempo,
            dias: convenio.dias
          });
          console.log("Convenio final: ", novoConvenio);
          this.convenios.push(novoConvenio);
        });
      });
    },
    checValores(valor, mes) {
      let valorFinal = valor;

      if (!mes) {
        valorFinal += 1;
      }
      if (mes) {
        valorFinal += 1;
        if (valor < 10) {
          return `0${valorFinal}`;
        }
      }
      return valorFinal;
    },
    converteDate(data) {
      // console.log("Data que chega: ", data);
      let dataTratada = new Date(data);
      let stringFinal = `${this.checValores(
        dataTratada.getDate(),
        false
      )}/${this.checValores(
        dataTratada.getMonth(),
        true
      )}/${dataTratada.getFullYear()}`;
      // console.log("Data que sai: ", stringFinal);
      return stringFinal;
    },
    editar(convenio) {
      this.$refs.modal.recebeValoresConvenio(convenio);
    },
    excluir(convenio) {
      this.$bvModal
        .msgBoxConfirm("Deseja excluir convênio?", {
          title: "Exclusão de convênio",
          okVariant: "info",
          okTitle: "Sim",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(resposta => {
          if (resposta) {
            this.removeConvenio(convenio.id);
            this.$bvModal.show("my-modal");
            this.buscaConvenios()
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    removeConvenio(id) {
      api.delete(`/convenio/${id}`).then(response => {
        if (response.data.status == 201) {
          this.mensagem = "Convênio excluído com sucesso!";
        } else this.mensagem = "Erro ao excluir convênio!";
      });
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