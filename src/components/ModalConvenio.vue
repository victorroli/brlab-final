<template>
  <b-modal
    id="modal-form"
    ref="modal"
    title="Convênio cadastrado"
    :ok-title="txtBotaoIncluir"
    :cancel-title="txtBotaoExcluir"
    cancel-variant="danger"
    @show="showModal"
    @hidden="resetModal"
    @cancel="resetModal"
    @ok="salvaConvenio"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <label for="uri-input">Criado em:</label>
      <b-form-input
        id="criacao-input"
        v-model="criacao"
        type="date"
        :state="criacaoState"
        required
        aria-describedby="criacao-input"
      ></b-form-input>
      <b-form-invalid-feedback id="criacao-input">Campo Data de Criação é obrigatório</b-form-invalid-feedback>

      <label for="validade-input">Válido até:</label>
      <b-form-input id="validade-input" v-model="validade" :state="validadeState" type="date"></b-form-input>
      <b-form-invalid-feedback id="observacao-input">Campo Data de validade obrigatório</b-form-invalid-feedback>

      <label for="instituicao">Instituição:</label>
      <b-form-select v-model="instituicao" :options="instituicoes"></b-form-select>

      <label for="laboratorio">Laboratório:</label>
      <b-form-select v-model="laboratorio" :options="laboratorios"></b-form-select>

      <b-form-group label="Dias que será disponibilizado:">
        <b-form-checkbox-group
          id="dias-semana"
          v-model="diasSelecionados"
          :options="diasSemana"
          name="diasSemana"
        ></b-form-checkbox-group>
      </b-form-group>

      <label for="tempo">Tempo Máximo de Uso (por dia)</label>
      <b-form-input id="tempo-input" v-model="tempo" :state="tempoState" type="time"></b-form-input>
    </form>
  </b-modal>
</template>

<script>
import { api } from "@/services.js";
import { setTimeout } from "timers";
export default {
  name: "ModalConvenio",
  // props: [laboratorio],
  data() {
    return {
      evento: "",
      tempoState: "",
      criacaoState: "",
      validadeState: "",
      instituicaoState: "",
      laboratorioState: "",
      criacao: "",
      validade: "",
      instituicao: "",
      laboratorio: "",
      txtBotaoIncluir: "Salvar",
      txtBotaoExcluir: "Cancelar",
      tipo: "",
      id: "",
      tempo: "",
      options: [
        { value: 0, text: "Educação Básica" },
        { value: 1, text: "Educação Superior" },
        { value: 2, text: "Outro" }
      ],
      laboratorios: [],
      instituicoes: [],
      diasSelecionados: [],
      diasSemana: [
        { text: "Domingo", value: 1 },
        { text: "Segunda", value: 2 },
        { text: "Terça", value: 3 },
        { text: "Quarta", value: 4 },
        { text: "Quinta", value: 5 },
        { text: "Sábado", value: 6 }
      ]
    };
  },
  created() {
    this.buscaLaboratorios();
    this.buscaInstituicoes();
  },
  methods: {
    showModal() {
      this.$bvModal.show("modal-form");
    },
    resetModal() {
      this.$bvModal.hide("modal-form");
    },
    salvaConvenio() {
      let tempoMinutos = this.tempoEmMinutos(this.tempo);

      api
        .put(`/convenio/${this.id}`, {
          criacao: this.criacao,
          validade: this.validade,
          laboratorio: this.laboratorio,
          instituicao: this.instituicao,
          tempo: tempoMinutos,
          dias: this.diasSelecionados.filter(dia => dia)
        })
        .then(response => {
          if (response.data.status == 201) {
            this.preencheCampos(response.data.content, true);
          }
        });

      setTimeout(() => {
        this.$parent.buscaConvenios();
      }, 500);
    },
    preencheCampos(convenio, atualiza = false) {
      this.id = convenio.id;
      this.instituicao = convenio.instituicao_id;
      this.laboratorio = convenio.laboratorio_id;
      this.criacao = this.quebraData(convenio.criacao, atualiza);
      this.validade = this.quebraData(convenio.validade, atualiza);
      this.tempo = this.formataTempoInput(convenio.tempo);
      this.diasSelecionados = convenio.dias.split(",").map(response => {
        return parseInt(response);
      });
    },
    tempoEmMinutos(tempo) {
      let valorTempo = tempo.split(":");
      let valorFinal = parseInt(valorTempo[0]) * 60 + parseInt(valorTempo[1]);
      return valorFinal;
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
    quebraData(data, atualiza) {
      let dataFinal = "";
      if (data.includes("/")) {
        let dataRecebida = data.split("/");
        dataFinal =
          this.checValores(dataRecebida[2]) +
          "-" +
          this.checValores(dataRecebida[1]) +
          "-" +
          this.checValores(dataRecebida[0], atualiza);
      } else {
        let recebido = new Date(data);
        dataFinal =
          recebido.getFullYear() +
          "-" +
          this.checValores(recebido.getMonth(), atualiza) +
          "-" +
          this.checValores(recebido.getDate());
      }

      return dataFinal;
    },
    limparCampos() {
      this.agendamento = null;
      this.solicitante = "";
      this.observacao = "";
      this.data = "";
      this.horarioTermino = "";
      this.horarioInicio = "";
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) {
          valorFinal += 1;
        }
        if (valor.length < 2) return `0${valorFinal}`;
      }
      return valorFinal;
    },
    recebeValoresConvenio(convenio) {
      this.preencheCampos(convenio);
      this.showModal();
    },
    buscaLaboratorios() {
      this.laboratorios = [];
      this.laboratorio = "";
      api.get("/labs/").then(response => {
        response.data.map(response => {
          this.laboratorios.push({ value: response.id, text: response.name });
        });
      });
    },
    buscaInstituicoes() {
      this.instituicoes = [];
      this.instituicao = "";
      api.get("/instituicao/").then(response => {
        response.data.map(instituicao => {
          this.instituicoes.push({
            value: instituicao.id,
            text: instituicao.nome
          });
        });
      });
    }
  }
};
</script>

<style>
</style>
