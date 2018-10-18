<template>
  <div id="app">

    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-blue">
      <a class="navbar-brand" href="/">Burger Queen</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active" v-for="item in itemsOfNav" :key="item.title" :to="item.link">
            <a class="nav-link" :href="item.link">
              <i :class="item.class"></i> {{item.title}}</a>
          </li>
        </ul>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    itemsOfNav() {
      return [
        { title: "Ingresar", link: "/signin", class: "fas fa-sign-out-alt" },
        { title: "Registrarse", link: "/signup", class: "fas fa-user-plus" }
      ];
    }
  }
};
</script>

<style>
.bg-blue {
  background-color: #25ccca;
}
.nav-item:hover {
  background-color: #1ab5b3;
}
</style>

