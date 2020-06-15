<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light sticky-top mb-5" style="background-color: #e3f2fd;">
      <router-link class="navbar-brand" to="/"><i class="fa fa-video"></i></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav" v-if="isLoggedIn">
          <router-link class="nav-item nav-link" :to="{ name: 'MovieList' }">영화</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'MovieRecommend' }">영화추천</router-link>
          <router-link v-if="isAdmin" class="nav-item nav-link" :to="{ name: 'MovieCreate' }">영화생성</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'ArticleList' }">게시글</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'Logout' }">로그아웃</router-link>
          <span v-if="loginUsername" class="nav-item nav-link">{{ loginUsername }}님 환영합니다.</span>
        </div>
        <div class="navbar-nav" v-else>
          <router-link class="nav-item nav-link" :to="{ name: 'MovieList' }">영화</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'MovieRecommend' }">영화추천</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'ArticleList' }">게시글</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'Login' }">로그인</router-link>
        </div>
      </div>
    </nav>    
    <router-view class="container"/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters('CommunityModule',['isLoggedIn']),
    ...mapState('CommunityModule', ['isAdmin', 'loginUsername'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
