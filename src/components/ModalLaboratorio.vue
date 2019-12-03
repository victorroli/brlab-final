<template>
  <b-modal
    id="modal-form"
    ref="modal"
    title="Laboratório cadastrado"
    :ok-title="txtBotaoIncluir"
    :cancel-title="txtBotaoExcluir"
    cancel-variant="danger"
    @show="showModal"
    @hidden="resetModal"
    @cancel="funcao_cancel"
    @ok="salvaLaboratorio"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <label for="uri-input">Laboratório:</label>
      <b-form-input
        id="nome-input"
        v-model="nome"
        :state="nomeState"
        required
        aria-describedby="nome-input"
        :disabled="!cadastro"
      ></b-form-input>
      <b-form-invalid-feedback id="nome-input">Campo Nome do Laboratório obrigatório</b-form-invalid-feedback>

      <label for="descricao-input">Descrição:</label>
      <b-form-input
        id="descricao-input"
        v-model="descricao"
        :state="descricaoState"
        required
        aria-describedby="descricao-input"
        :disabled="!cadastro"
      ></b-form-input>
      <b-form-invalid-feedback id="descricao-input">Campo descrição é obrigatório</b-form-invalid-feedback>

      <label v-if="cadastro" for="status-input">Status:</label>
      <b-form-select v-if="cadastro" v-model="status" :options="descricoes_status"></b-form-select>

      <label for="host-input">Host:</label>
      <b-form-input
        id="host-input"
        v-model="host"
        :state="hostState"
        required
        aria-describedby="host-input"
        :disabled="!cadastro"
      ></b-form-input>
      <b-form-invalid-feedback id="host-input">O host não pode ser vazio</b-form-invalid-feedback>

      <label for="porta-input">Porta:</label>
      <b-form-input id="porta-input" v-model="porta" :state="portaState" :disabled="!cadastro"></b-form-input>
      <b-form-invalid-feedback id="observacao-input">Campo porta obrigatório</b-form-invalid-feedback>

      <label for="tempo-input">Tempo:</label>
      <b-form-input
        id="tempo-input"
        v-model="tempo"
        :state="tempoState"
        type="time"
        :disabled="!cadastro"
      ></b-form-input>
      <b-form-invalid-feedback id="tempo-input">Campo tempo obrigatório</b-form-invalid-feedback>

      <label for="equipamento">Equipamentos:</label>
      <div class="add-equipamento">
        <EquipamentoForm ref="equipamentoRef"></EquipamentoForm>
      </div>
    </form>
  </b-modal>
</template>

<script>
import EquipamentoForm from "@/components/EquipamentoForm.vue";
import { api } from "@/services.js";
import { setTimeout } from "timers";
export default {
  name: "ModalLaboratorio",
  components: {
    EquipamentoForm
  },
  data() {
    return {
      evento: "",
      nomeState: "",
      hostState: "",
      portaState: "",
      tempoState: "",
      statusState: "",
      descricaoState: "",
      id: "",
      nome: "",
      descricao: "",
      host: "",
      porta: "",
      tempo: "",
      status: "",
      equipamentos: [],
      txtBotaoIncluir: "Salvar",
      txtBotaoExcluir: "Cancelar",
      descricoes_status: [
        { value: 2, text: "Disponível" },
        { value: 3, text: "Em manutenção" },
        { value: 4, text: "Desativado" }
      ],
      cadastro: true
    };
  },

  methods: {
    showModal() {
      this.$bvModal.show("modal-form");
      setTimeout(() => {
        this.$refs.equipamentoRef.preencheEquipamentos(
          this.equipamentos,
          this.cadastro
        );
      }, 400);
    },
    resetModal() {
      this.$bvModal.hide("modal-form");
    },
    salvaLaboratorio() {
      if (!this.cadastro) {
        this.status = 2;
      }
      alert("Aqui inferno...");
      api
        .put(`/labs/${this.id}`, {
          name: this.nome,
          description: this.descricao,
          host: this.host,
          port: this.porta,
          tempo_experimento: this.tempoEmMinutos(this.tempo),
          status_id: this.status,
          equipamentos: this.equipamentos
        })
        .then(response => {
          if (response.data.status == 201) {
            this.preencheCampos(response.data.content);
            if (!this.cadastro) {
              this.$parent.buscaSolicitacoes();
              this.$parent.exibeModal("Solicitação aceita com sucesso");
              return;
            }
            this.$parent.buscaLaboratorios();
          }
        });
    },
    preencheCampos(laboratorio) {
      this.id = laboratorio.id;
      this.nome = laboratorio.name;
      this.descricao = laboratorio.description;
      this.host = laboratorio.host;
      this.porta = laboratorio.port;
      this.tempo = this.formataTempoInput(laboratorio.tempo);
      this.status = laboratorio.status;
      this.equipamentos = laboratorio.equipamentos;
    },
    limparCampos() {
      this.nome = null;
      this.descricao = "";
      this.host = "";
      this.porta = "";
      this.tempo = "";
      this.status = "";
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) {
          valorFinal += 1;
        }
        return `0${valorFinal}`;
      }
      return valorFinal;
    },
    recebeValoresLaboratorios(laboratorio, cadastro) {
      if (!cadastro) {
        this.txtBotaoIncluir = "Aceitar";
        this.txtBotaoExcluir = "Rejeitar";
      }
      this.cadastro = cadastro;
      this.preencheCampos(laboratorio);
      this.showModal();
    },
    funcao_cancel() {
      if (!this.cadastro) {
        this.confirmaAcao();
        return;
      }
      this.resetModal();
    },
    confirmaAcao() {
      this.$bvModal
        .msgBoxConfirm("Deseja realmente remover a solicitação?", {
          title: "Solicitação - Laboratório " + this.nome,
          okVariant: "danger",
          okTitle: "Sim",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            api.delete(`/labs/${this.id}`).then(resposta => {
              if (resposta.data.status == 205) {
                this.$parent.exibeModal("Solicitação removida com sucesso");
                this.$parent.buscaSolicitacoes();
              }
            });
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    formataTempoInput(tempo) {
      if (tempo >= 60) {
        let horaFormatada = parseInt(tempo);
        let horaFinal = 0;
        while (horaFormatada >= 60) {
          horaFinal += 1;
          horaFormatada -= 60;
        }
        horaFinal = this.checValores(horaFinal.toString());
        let minutoFinal = this.checValores(horaFormatada);
        return `${horaFinal}:${minutoFinal == 0 ? "00" : minutoFinal}`;
      }
      return `00:${tempo}`;
    },
    tempoEmMinutos(tempo) {
      let valorTempo = tempo.split(":");
      let valorFinal = parseInt(valorTempo[0]) * 60 + parseInt(valorTempo[1]);
      return valorFinal;
    },
    recebeListaEquipamentos(equipamentos) {
      //  ("Equips recebidos: ", equipamentos);
      this.equipamentos = equipamentos;
    }
  }
};
</script>

<style>
</style>
