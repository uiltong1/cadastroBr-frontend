<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <Editar />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Editar from "@/components/Editar.vue";
export default {
  name: "Home",
  components: {
    Menu,
    Editar
  }
};
</script>
