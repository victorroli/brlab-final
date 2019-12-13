<template>
  <section>
    <h1>Usuários do sistema</h1>
    <div id="usuarios">
      <div v-if="listaUsuarios.length > 0">
        <b-table striped hover :items="listaUsuarios" :fields="fields" class="text-center">
          <template slot="opcoes" slot-scope="row">
            <b-button class="editar" @click="editarUsuario(row.item)">
              <font-awesome-icon icon="edit" />Editar
            </b-button>
            <b-button class="excluir" @click="excluirUsuario(row.item)">
              <font-awesome-icon icon="trash" />Excluir
            </b-button>
          </template>
        </b-table>
        <div class="group-button">
          <router-link tag="b-button" class="btn" :to="{name: 'novo-usuario'}">
            <font-awesome-icon icon="plus-circle" />Novo Usuário
          </router-link>
        </div>
      </div>
      <div v-else-if="!listaUsuarios.length">
        <PaginaCarregando />
      </div>
      <div class="text-center" v-else>
        <h4>Nenhum usuário cadastrado...</h4>
      </div>
    </div>
    <modal-usuario ref="modalUsuario"></modal-usuario>
  </section>
</template>

<script>
import ModalUsuario from "@/views/usuario/ModalUsuario.vue";
import PaginaCarregando from "@/components/PaginaCarregando.vue";
import { api } from "@/services.js";
export default {
  name: "ListaUsuarios",
  components: {
    ModalUsuario,
    PaginaCarregando
  },
  data() {
    return {
      listaUsuarios: [],
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
        funcao: {
          label: "Papel"
        },
        opcoes: {
          label: "Opções"
        }
      }
    };
  },
  created() {
    this.buscaUsuarios();
  },
  methods: {
    buscaUsuarios() {
      api.get(`/usuarios`, {}).then(response => {
        let usuarios_sistema = response.data.filter(usuario => {
          return usuario.verificado;
        });

        usuarios_sistema.map(usuario => {
          let novoUsuario = new Object({
            id: usuario.id,
            nome: usuario.nome,
            nickname: usuario.nickname,
            email: usuario.email,
            funcao: this.descricaoPapel(usuario.papel_id)
          });
          this.listaUsuarios.push(novoUsuario);
        });
      });
    },
    descricaoPapel(tipo) {
      console.log("Tipo recebido: ", tipo);
      let papel = "";
      switch (tipo) {
        case 1: {
          papel = "Administrador";
          break;
        }
        case 2: {
          papel = "Aluno";
          break;
        }
        case 3: {
          papel = "Professor";
          break;
        }
        case 4: {
          papel = "Pesquisador";
          break;
        }
      }
      return papel;
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
    },
    editarUsuario(usuario) {
      this.$refs.modalUsuario.recebeValores(usuario);
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
h4 {
  font-weight: 300;
}
#usuarios {
  max-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}

.text-center {
  margin-bottom: 30px;
}
</style>
