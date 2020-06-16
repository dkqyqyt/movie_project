<template>
  <div class="login">
      <h1 class="text-center">로그인</h1>
      <div class="login-form">
        <div class="form-group">
            <input class="form-control" @keypress.enter="login(loginData)" v-model="loginData.username" id="username" type="text" placeholder="아이디">
        </div>
        <div class="form-group">
            <input class="form-control" @keypress.enter="login(loginData)" v-model="loginData.password" id="password" type="password" placeholder="비밀번호">
        </div>
        <div class="d-flex justify-content-between">
            <button class="btn btn-primary" @click="login(loginData)">로그인</button>
            <button class="btn btn-success" @click="moveToSignup">회원가입</button>
        </div>
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
                redirectUrl: this.$route.query.redirect
            },
        }
    },
    methods: {
        ...mapActions('CommunityModule',['login']),
        moveToSignup() {
            this.$router.replace({ name: 'Signup' })
        }
    }
}
</script>

<style scoped>
    div.login-form {
        width: 300px;
        margin: 30px auto;
    }
    div.signup {
        background-color: #313288 ;
    }
    div.form-group input {
        height: 50px;
        border-radius: 10px;
    }
    .login{
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>