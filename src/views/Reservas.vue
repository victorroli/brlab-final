<template>
  <section>
    <h1>Reservas</h1>
    <div id="box-laboratorio">
      <b-form-select id="select-laboratorio" v-model="laboratorio" :options="lista_laboratorios"></b-form-select>
    </div>

    <div id="reservas" v-if="reservas.length">
      <b-table
        v-if="this.$store.state.usuario.papel_id == 1"
        striped
        hover
        :items="reservas"
        :fields="fields_adm"
      ></b-table>
      <b-table v-else striped hover :items="reservas" :fields="fields"></b-table>
    </div>
    <div class="texto-reserva" v-else-if="laboratorio != 0">
      <p>Nenhuma reserva efetuada para este laboratório...</p>
    </div>
    <div v-else class="texto-reserva">
      <p>Selecione um laboratório...</p>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "reservas",
  data() {
    return {
      reservas: [],
      fields_adm: [
        {
          key: "usuario",
          label: "Usuário"
        },
        {
          key: "titulo",
          label: "Título"
        },
        {
          key: "horario_inicio",
          label: "Horário Início"
        },
        {
          key: "horario_termino",
          label: "Horário Término"
        },
        {
          key: "observacao",
          label: "Observação"
        }
      ],
      fields: [
        {
          key: "titulo",
          label: "Título"
        },
        {
          key: "horario_inicio",
          label: "Horário Início"
        },
        {
          key: "horario_termino",
          label: "Horário Término"
        },
        {
          key: "observacao",
          label: "Observação"
        }
      ],
      lista_laboratorios: [{ value: 0, text: "Selecione um laboratório" }],
      laboratorio: 0
    };
  },
  created() {
    this.listaLaboratorios();
  },
  watch: {
    laboratorio: function(valor, old) {
      if (valor) {
        this.listaReservas(valor);
      } else this.laboratorio = valor;
    }
  },
  methods: {
    listaLaboratorios() {
      api.get(`/labs/`, {}).then(response => {
        if (response.status == 200) {
          response.data.forEach(laboratorio => {
            this.lista_laboratorios.push({
              value: laboratorio.id,
              text: laboratorio.name
            });
          });
        }
      });
    },
    listaReservas(id_laboratorio) {
      api
        .get(`/agendamento/laboratorio/${id_laboratorio}`, {})
        .then(response => {
          console.log("Resposta obtida: ", response);
          let reservasUsuario = [];
          if (response.data.length > 1) {
            response.data.forEach(reserva => {
              let oReserva = new Object({
                usuario: reserva.usuario,
                horario_inicio: this.converteDate(reserva.periodo_inicio),
                horario_termino: this.converteDate(reserva.periodo_fim),
                titulo: "Horário reservado",
                observacao: reserva.observacao
              });
              reservasUsuario.push(oReserva);
            });
          }
          this.reservas = [...reservasUsuario];
        });
    },
    converteDate(data) {
      /*
        A data obtida do banco não vem com o valor GMT, então
        deve-se acrescentar na string esse valor.
        Como neste ano de 2019 não haverá horário de verão
        então permaneceu padrão o valor "-0300 que corresponde ao horário de Brasília"         
      */
      data += "-0300";
      let dataConvertida = new Date(data);
      let dia = "",
        mes = "",
        ano = "",
        hora = "",
        minutos = "";
      ano = dataConvertida.getFullYear();
      mes = this.checValores(dataConvertida.getMonth(), true);
      dia = this.checValores(dataConvertida.getDate());
      hora = this.checValores(dataConvertida.getHours());
      minutos = this.checValores(dataConvertida.getMinutes());

      return `${hora}:${minutos} ${dia}-${mes}-${ano}`;
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        if (valorFinal < 10) valorFinal = `0${valorFinal}`;
      }
      return valorFinal;
    }
  }
};
</script>

<style scoped>
#reservas {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}

#box-laboratorio {
  text-align: center;
}

#select-laboratorio {
  width: 50%;
  margin-bottom: 40px;
}

.texto-reserva {
  text-align: center;
  font-size: 1.5rem;
}
</style>
