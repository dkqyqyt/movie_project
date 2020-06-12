<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'MovieDeleteView',
    methods: {
        ...mapActions(['deleteMovie'])
    },
    created() {
        this.deleteMovie(this.$route.params.id)
    }
}
</script>

<style>

</style>