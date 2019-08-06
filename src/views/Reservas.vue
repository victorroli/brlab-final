<template>
  <section>
    <h1>Reservas</h1>
    <div id="reservas">
      <b-table striped hover :items="reservas"></b-table>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "reservas",
  data() {
    return { reservas: [] };
  },
  created() {
    this.listaReservas();
  },
  methods: {
    listaReservas() {
      api
        .get(`/agendamento/usuario/${this.$store.state.usuario.id}`, {})
        .then(response => {
          console.log("Resposta obtida: ", response.data);
          // let horarioInicio = this.converteDate(reserva.periodo_inicio);
          let reservasUsuario = [];
          response.data.forEach(reserva => {
            let oReserva = new Object({
              horario_inicio: this.converteDate(reserva.periodo_inicio),
              horario_termino: this.converteDate(reserva.periodo_fim),
              titulo: "Horário reservado",
              observacao: reserva.observacao
            });
            // Trecho a ser verificado posteriormente para checar o status da reserva no momento
            // let horaInicio = new Date(horarioInicio);
            // let horarioAtual = new Date();
            // console.log("Horário início: ", horarioInicio);
            // console.log("Horário atual: ", horarioAtual);

            // console.log("Reserva efetuada: ", oReserva);
            reservasUsuario.push(oReserva);
          });

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
      console.log("Data passada: ", data);
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

      console.log(`${ano}-${mes}-${dia} ${hora}:${minutos}`);
      return `${ano}-${mes}-${dia} ${hora}:${minutos}`;
    },
    checValores(valor, mes) {
      let valorFinal = valor;
      if (valor < 10) {
        if (mes) valorFinal = valor + 1;
        return `0${valorFinal}`;
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
</style>
