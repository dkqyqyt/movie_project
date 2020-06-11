<template>
  <div>
      <h1>Login</h1>
      <div>
          <label for="username">username: </label>
          <input v-model="loginData.username" id="username" type="text">
      </div>
      <div>
          <label for="password">password: </label>
          <input v-model="loginData.password" id="password" type="password">
      </div>
      <button @click="login(loginData)">login</button>
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

<style>

</style>