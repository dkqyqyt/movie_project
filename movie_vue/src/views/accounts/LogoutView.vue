<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'LogoutView',
    methods: {
        ...mapActions('CommunityModule',['logout'])
    },
    created() {
        this.logout()
    }
}
</script>

<style>

</style>