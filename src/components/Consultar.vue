<template>
    <v-app>
      <v-card>
        <v-card-title>
          <v-col class="text-right" cols="0" sm="0">
            <div class="my-2">
              <v-btn class="ma-2" color="#E3726A" @click="voltarInicio">Voltar</v-btn>
            </div>
          </v-col>
        </v-card-title>
        <v-container>
          <v-row>Cliente: {{info.cliente}}</v-row>
          <v-row>Data: {{info.data_execucao}}</v-row>
          <v-row>Funcionário: {{info.funcionario}}</v-row>
          <v-row>Observação: {{info.observacao}}</v-row>
          <v-row>Tipo: {{info.tipo}}</v-row>
        
        </v-container>
      </v-card>
    </v-app>
</template>
<script>
import axios from "axios";
import constants from "../constants/constants";
export default {
  name: "Form",
  VoltarInicio: "",
  data() {
    return {
      info: [],
    };
  },
  mounted() {
    this.consultar(this.$route.params.id)
  },

  methods: {
    consultar(id) {
      axios({
        method: "get",
        url: `${constants.baseUrl}/atendimento/${id}`
      })
        .then(response => {
          this.info = response.data;
        })
        .catch(error => {
          this.info = error;
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    voltarInicio: function() {
      history.back();
    },
  }
};
</script>
<style>
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: 4px;
    top: 65px;
}
</style>
