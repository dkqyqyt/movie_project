<template>
  <div class="home">
      <h1>All about Movie</h1>
        <div class="ui very relaxed items">
          <div class="item">
            <div class="image">
              <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60">
            </div>
            <div class="content">
              
              <div class="description">
                <p>영화를 무엇을 볼지 모르겠다면 전체 영화중에 골라봅시다 !</p>
              </div>
              <button class="ui blue button" @click="moveToMovieList">영화 리스트</button>
            </div>
          </div>
          <div class="item">
            <div class="image">
              <img src="https://images.unsplash.com/photo-1520853504280-249b72dc947c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60">
            </div>
            <div class="content">
              
              <div class="description">
                <p></p>
              </div>
              <button class="ui blue button" @click="moveToMovieRecommend">영화추천</button>
            </div>
          </div>
          <div class="item">
            <div class="image">
              <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60">
            </div>
            <div class="content">
              
              <div class="description">
                <p>Ut imperdiet dignissim feugiat. Phasellus tristique odio eu justo dapibus, nec rutrum ipsum luctus. Ut posuere nec tortor eu ullamcorper. <a href="#link">Etiam pellentesque</a> tincidunt tortor, non sagittis nibh pretium sit amet. Sed neque dolor, blandit eu ornare vel, lacinia porttitor nisi. Vestibulum sit amet diam rhoncus, consectetur enim sit amet, interdum mauris. Praesent feugiat finibus quam, porttitor varius est egestas id.</p>
              </div>
              <button class="ui blue button" @click="moveToArticleList">게시글 전체 보기</button>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
      moveToMovieList() {
        this.$router.push({name : 'MovieList'})
      },
      moveToMovieRecommend() {
        this.$router.push({name : 'MovieRecommend'})
      },
      moveToArticleList() {
        this.$router.push({name : 'ArticleList'})
      }
    }
  
}
</script>

<style scoped>
  
</style>