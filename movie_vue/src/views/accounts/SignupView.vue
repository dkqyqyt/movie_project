<template>
  <div>
      <h1>회원 가입</h1>
      <div class="signup-form">
        <div class="form-group">
            <input class="form-control" v-model="signupData.username" id="username" type="text" placeholder="아이디">
        </div>
        <div class="form-group">
            <input class="form-control" v-model="signupData.password1" id="password1" type="password" placeholder="비밀번호">
        </div>
        <div class="form-group">
            <input class="form-control" v-model="signupData.password2" id="password2" type="password" placeholder="비밀번호 확인">
        </div>
        <button class="btn btn-primary" @click="signup(signupData)">회원 가입</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'SignupView',
    data() {
        return {
            signupData: {
                username: null,
                password1: null,
                password2: null
            }
        }
    },
    methods: {
        ...mapActions(['signup'])
    }
}
</script>

<style scoped>
    div.signup-form {
        width: 70%;
        margin: 30px auto;
    }
</style>