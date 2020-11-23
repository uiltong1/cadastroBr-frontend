<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <UsuarioConfiguracoes />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import UsuarioConfiguracoes from "@/components/UsuarioConfiguracoes.vue";
export default {
  name: "Home",
  components: {
    Menu,
    UsuarioConfiguracoes
  }
};
</script>
