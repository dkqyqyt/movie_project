<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-5">
      <router-link class="navbar-brand" to="/"><i class="fa fa-2x fa-video"></i></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav" v-if="isLoggedIn">
          <router-link class="nav-item nav-link" :to="{ name: 'MovieList' }">영화</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'MovieRecommend' }">영화추천</router-link>
          <router-link v-if="isAdmin" class="nav-item nav-link" :to="{ name: 'MovieCreate' }">영화생성</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'ArticleList' }">게시글</router-link>
        </div>
        <div class="navbar-nav" v-else>
          <router-link class="nav-item nav-link" :to="{ name: 'MovieList' }">영화</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'MovieRecommend' }">영화추천</router-link>
          <router-link class="nav-item nav-link" :to="{ name: 'ArticleList' }">게시글</router-link>
        </div>
        <div class="navbar-nav" v-if="isLoggedIn">
          <span v-if="loginUsername" class="nav-item nav-link">{{ loginUsername }}님 환영합니다.</span>
          <router-link class="nav-item nav-link" :to="{ name: 'Logout' }">로그아웃</router-link>
        </div>
        <div class="navbar-nav" v-else>
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
@font-face {
  font-family: 'SungDongGothic';
  font-style: normal;
  font-weight: 1000;
  src: url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/govs/sdgu/SungDongGothic/SungDongGothicB.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/govs/sdgu/SungDongGothic/SungDongGothicB.woff') format('woff');
}
@font-face {
  font-family: 'Youth';
  font-style: normal;
  font-weight: 400;
  src: url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff') format('woff');
}
@font-face {
  font-family: 'Busan';
  font-style: normal;
  font-weight: 400;
  src: url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/govs/busan/Busan/Busan.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/govs/busan/Busan/Busan.woff') format('woff');
}
#app {
  font-family: 'Busan','Youth', 'SungDongGothic', sans-serif, Impact, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
