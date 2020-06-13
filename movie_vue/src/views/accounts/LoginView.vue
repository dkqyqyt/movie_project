<template>
  <div>
      <h1 class="text-center">로그인</h1>
      <div class="login-form">
        <div class="form-group">
            <input class="form-control" v-model="loginData.username" id="username" type="text" placeholder="아이디">
        </div>
        <div class="form-group">
            <input class="form-control" v-model="loginData.password" id="password" type="password" placeholder="비밀번호">
        </div>
        <button class="btn btn-primary" @click="login(loginData)">로그인</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'LoginView',
    data() {
        return {
            loginData: {
                username: null,
                password: null,
            }
        }
    },
    methods: {
        ...mapActions(['login'])
    }
}
</script>

<style scoped>
    div.login-form {
        width: 50%;
        margin: 30px auto;
    }
</style>