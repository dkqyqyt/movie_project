<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav" v-if="isLoggedIn">
          <router-link class="nav-item nav-link" :to="{ name: 'MovieList' }">Movie</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'ArticleList' }">Article</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'Logout' }">Logout</router-link>
        </div>
        <div class="navbar-nav" v-else>
          <router-link class="nav-item nav-link" :to="{ name: 'MovieList' }">Movie</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'ArticleList' }">Article</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'Login' }">Login</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'Signup' }">Signup</router-link>
        </div>
      </div>
    </nav>
      <router-link :to="{ name: 'MovieCreate' }">Movie Create</router-link>
    <router-view class="container"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
