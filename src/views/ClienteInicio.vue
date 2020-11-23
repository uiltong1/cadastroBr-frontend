<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <ClienteInicio />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import ClienteInicio from "@/components/ClienteInicio.vue";
export default {
  name: "Home",
  components: {
    Menu,
    ClienteInicio
  }
};
</script>
