<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <Cadastrar />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Cadastrar from "@/components/Cadastrar.vue";
export default {
  name: "Home",
  components: {
    Menu,
    Cadastrar
  }
};
</script>
