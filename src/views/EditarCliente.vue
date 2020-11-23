<template>
  <div class="pagina">
    <div class="menu">
      <Menu />
    </div>
    <div class="app-componente">
      <EditarCliente />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import EditarCliente from "@/components/EditarCliente.vue";
export default {
  name: "Home",
  components: {
    Menu,
    EditarCliente
  }
};
</script>
