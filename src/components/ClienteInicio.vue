<template>
  <div>
    <v-app>
      <v-container>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            Clientes
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
                @click="consultar(item)"
                title="Consultar"
              >{{icone.mdiMagnify}}</v-icon>
               <v-icon
                color="#7E9980"
                class="mr-2"
                @click="editar(item)"
                title="Editar"
              >{{icone.mdiPencil}}</v-icon>
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
        { text: "Cliente", value: "nome" },
        { text: "CPF", value: "cpf" },
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
    this.carregar()
  },
  methods: {
    carregar(){
      axios({
      method: "get",
      url: `${constants.baseUrl}/cliente/list`,
    })
      .then(response => {
        this.info = response.data;
      })
      .catch(error => {
        this.info = error.data.message;
      })
      .finally(() => (this.loading = false));
    },
    cadastrar: function() {
      this.$router.push({ name: "ClienteCadastrar" });
    },
    consultar:function(item){
      const id = item.id
      this.$router.push({ path:`/ConsultarCliente/${id}`})
    },
    editar:function(item){
      const id = item.id
      this.$router.push({ path:`/EditarCliente/${id}`})
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