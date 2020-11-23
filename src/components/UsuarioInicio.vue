<template>
  <div>
    <v-app>
      <v-container>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            Usuários
          </v-card-title>
          <v-container>
            <v-row>
              <v-col class="text-right" cols sm="4">
                <v-text-field
                  color="#272727"
                  v-model="pesquisa"
                  label="Pesquisar"
                  outlined
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col class="text-right" cols="0" sm>
                <div class="my-2">
                  <v-btn dark @click="cadastrar">Novo</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-data-table :headers="headers" :items="info" :search="pesquisa">
            <template v-slot:item.action="{ item }">
               <v-icon
                color="#7E9980"
                class="mr-2"
                @click="editar(item)"
                title="Editar"
              >{{icone.mdiPencil}}</v-icon>
              <v-icon
                color="#e16267"
                class="mr-2"
                @click="deletar(item)"
                title="Cancelar"
              >{{icone.mdiCancel }}</v-icon>
            </template>
            <template v-slot:no-data>Nenhum registro encontrado.</template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import constants from "../constants/constants";
import axios from "axios";
import {
  mdiPencil,
  mdiCancel,
  mdiClipboardArrowRight,
  mdiMagnify,
  mdiCheckboxMarkedCircle
} from "@mdi/js";
export default {
  data() {
    return {
      pesquisa: "",
      headers: [
        { text: "Nº", value: "id" },
        { text: "Usuário", value: "name" },
        { text: "Email", value: "email" },
        { text: "Ações", value: "action", sortable: false }
      ],
      info: [],
      disabled: false,
      ret: 0,
      icone: {
        mdiPencil,
        mdiCancel,
        mdiClipboardArrowRight,
        mdiMagnify,
        mdiCheckboxMarkedCircle
      }
    };
  },
  mounted() {
     if(sessionStorage.perfil  !== '1'){
       alert('Você não tem permissão de acesso.')
          history.back();
    } 
    this.carregar()
  },
  methods: {
    
    carregar(){
      axios({
      method: "get",
      url: `${constants.baseUrl}/users/list`,
    })
      .then(response => {
        this.info = response.data;
      })
      .catch(error => {
        this.info = error.data.message;
      })
      .finally(() => (this.loading = false));
    },
    deletar: function(value) {
      let id = value.id;
      if(confirm(`Deseja excluir o cliente nº ${id}?`) == true){
      axios
        .delete(`${constants.baseUrl}/register/disable-user/${id}`)
        .then(response => {
          this.delete = response;
          this.carregar()
          alert(this.delete.data.message);
        })
        .catch(error => {
          this.delete = error.data.message;
          alert(this.delete);
        });
      }
    },
    cadastrar: function() {
      this.$router.push({ name: "UsuarioCadastrar" });
    },
    editar:function(item){
      const id = item.id
      this.$router.push({ path:`/UsuarioEditar/${id}`})
    }
  }
};
</script>
<style lang="stylus" scoped>
.theme--light.v-data-table thead tr:last-child th {
  border-bottom: thin solid rgba(0, 0, 0, 0.8) !important;
  background-color: #e16267 !important;
}
</style>