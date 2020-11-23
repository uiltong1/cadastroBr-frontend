<template>
<div>
 <v-app-bar
      app
      color="primary"
      dark
      class="nav"
    >
     <v-menu
      v-for="([text, rounded], index) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
        <v-icon
                color="white"
                class="mr-2"
              >{{icone.mdiMenu}}</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          @click="users"
          link
        >
          <v-list-item-title v-text="'Usuários'"></v-list-item-title>
        </v-list-item>
          <v-list-item
          @click="usersativar"
          link
        >
          <v-list-item-title v-text="'Reativar Usuário'"></v-list-item-title>
        </v-list-item>
         <v-list-item
          @click="clientes"
          link
        >
          <v-list-item-title v-text="'Clientes'"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      <v-spacer></v-spacer>
      <!-- <router-link to="/logout">{{this.nome}}</router-link>     -->
        <v-menu
      v-for="([text, rounded], index) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
          v-label=""
        >
        Mais
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          @click="configuracoes"
          link
        >
          <v-list-item-title v-text="'Configurações'"></v-list-item-title>
        </v-list-item>
         <v-list-item
          @click="sair"
          link
        >
          <v-list-item-title v-text="'Sair'"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      
</v-app-bar>
</div>
</template>
<script>
import { mdiMenu } from "@mdi/js"
export default {
   data: () => ({
      icone: {
        mdiMenu,
      },
      btns: [
        ['asasa', 'lg'],
      ],
      colors: ['deep-purple accent-4', 'error', 'teal darken-1'],
      items: [...Array(4)].map((_, i) => `Item ${i}`),
      nome:'',
    }),
    mounted(){
      this.nome = sessionStorage.nome
    },
methods:{
clientes: function() {
      this.$router.push({ name: "ClienteInicio" });
},
users: function() {
      this.$router.push({ name: "UsuarioInicio" });
},
usersativar: function() {
      this.$router.push({ name: "UsuarioReativar" });
},
configuracoes: function() {
      this.$router.push({ name: "" });
},
sair: function() {
      this.$router.push({ name: "Logout" });
},
}
}
</script>
<style lang="stylus">
a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    color: white;
    text-decoration: none;
    font-size: 17px;
    font-family: sans-serif;
}
</style>