<template>
  <v-app>
    <v-container-fluid>
    <v-card>
    <v-container>
      <v-form ref="form">
        <v-card-title>Conta</v-card-title>
        <v-text-field color="#272727" v-model="nome" :rules="nomerules" label="Nome" outlined></v-text-field>
        <v-text-field color="#272727" v-model="email"     type="email"  :rules="emailrules" label="Email" outlined></v-text-field>
        <v-text-field color="#272727" v-model="password"  type="password" name="input-10-1" :rules="passwordrules" label="Senha" outlined></v-text-field>
        <v-select
          :rules="perfilrules"
          :items="perfis"
          v-model="perfil"
          outlined
          label="Perfil"
          disabled
        ></v-select>       
        <v-btn dark @click="gravar">Gravar</v-btn>
        <v-btn color="error" @click="voltarPagina">Cancelar</v-btn>
      </v-form>
    </v-container>
    </v-card>
    </v-container-fluid>
  </v-app>
</template>
<script>
import axios from "axios"
import { mask } from "vue-the-mask"
import constants from "../constants/constants";
export default {
  directives: {
    mask
  },
  name: "Cadastro",
  data: () => ({
    nome:'',
    email:'',
    password:'',
    perfil:'',
    info: [],
    perfis: ['Administrador', 'Atendente'],
    nomerules: [v => !!v || "O campo Nome é obrigatório"],
    emailrules: [v => !!v || "O campo Email é obrigatório."],
    perfilrules: [v => !!v || "O campo Perfil é obrigatório."]

  }),
  mounted(){
      axios({
      method: "get",
      url: `${constants.baseUrl}/users/get/${sessionStorage.id}`,
    })
      .then(response => {
       this.info = response.data;
          this.nome = this.info.name;
          this.email = this.info.email;
          this.perfil = this.info.perfil;
          this.perfil = this.info.perfil;
      })
      .catch(error => {
        this.info = error.data.message;
      })
      .finally(() => (this.loading = false));
    
  },
  methods: {

    gravar() {
      if(this.nome === '' || this.nome == null || this.email === '' || this.email === null ||
         this.perfil === '' || this.data === ''){
        this.info = 'Preencha os campos obrigatórios';
        alert(this.info)
        return false;
      }
      switch(this.perfil){
        case 'Administrador':
          this.perfil = 1;
         break;
        case 'Atendente':
          this.perfil = 2;
         break;
      }

      axios({
        method: "patch",
        url: `${constants.baseUrl}/register/update/${sessionStorage.id}`,
        data: {
          name: this.nome,
          email: this.email,
          password: this.password,
          perfil: this.perfil
        }
      })
        .then(response => {
          this.info = response.data.message;
          console.log(response)
          alert(this.info)
        })
        .catch(error => {
          this.info = error;
          console.log(this.info)
          console.log(this.info);
        });
    },
    voltarPagina: function() {
      history.back();
    }
  }
};
</script>
<style>
.v-card>:last-child:not(.v-btn):not(.v-chip) {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    margin-top: 65px;
}

.calendar{
  padding: 10px;
    margin: 5px;
    margin-bottom: 20px;
    border: solid 1px silver;
    border-radius: 5px;
}

</style>
