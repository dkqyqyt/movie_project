<template>
  <div class="home">
    <h1>All about Movie</h1>
    <div class="head">
    <figure class="snip1283">
      <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="sample70"/>
      <figcaption>
        <h3>영화 리스트 </h3>
        <p>The strength to change what I can, the inability to accept what I can't and the incapacity to tell the difference.</p><button class="ui inverted purple basic button" @click="moveToMovieList">리스트 보기</button>
      </figcaption>
    </figure>

    <figure class="snip1283">
      <img src="https://images.unsplash.com/photo-1452697620382-f6543ead73b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="sample70"/>
      <figcaption>
        <h3>영화 추천 </h3>
        <p>The strength to change what I can, the inability to accept what I can't and the incapacity to tell the difference.</p><button class="ui inverted blue basic button" @click="moveToMovieRecommend">추천 영화 보기</button>
      </figcaption>
    </figure>

    <figure class="snip1283">
      <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="sample70"/>
      <figcaption>
        <h3>게시판 </h3>
        <p>The strength to change what I can, the inability to accept what I can't and the incapacity to tell the difference.</p><button class="ui inverted purple olive button" @click="moveToArticleList">게시판 보기</button>
      </figcaption>
    </figure>


<!-- 
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
        </div> -->
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
@import url(https://fonts.googleapis.com/css?family=Raleway:400,500,800);
.head {
  display: flex;

}
figure.snip1283 {
  font-family: 'Raleway', Arial, sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
  max-width: 315px;
  max-height: 220px;
  width: 100%;
  color: #ffffff;
  text-align: left;
  background-color: #07090c;
  font-size: 16px;
  -webkit-perspective: 50em;
  perspective: 50em;
}
figure.snip1283 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.6s ease;
  transition: all 0.6s ease;
}
figure.snip1283 img {
  opacity: 1;
  width: 100%;
  -webkit-transform-origin: 50% 0%;
  -ms-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
figure.snip1283 figcaption {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  -webkit-transform: rotateX(90deg);
  transform: rotateX(90deg);
  -webkit-transform-origin: 50% 100%;
  -ms-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  z-index: 1;
  opacity: 0;
  padding: 20px 30px;
}
figure.snip1283 h3,
figure.snip1283 p {
  line-height: 1.5em;
}
figure.snip1283 h3 {
  margin: 0;
  font-weight: 800;
  text-transform: uppercase;
}
figure.snip1283 p {
  font-size: 0.8em;
  font-weight: 500;
  margin: 0 0 15px;
}
figure.snip1283 .read-more {
  border: 2px solid #ffffff;
  padding: 0.5em 1em;
  font-size: 0.8em;
  text-decoration: none;
  color: #ffffff;
  display: inline-block;
}
figure.snip1283 .read-more:hover {
  background-color: #ffffff;
  color: #000000;
}
figure.snip1283:hover img,
figure.snip1283.hover img {
  -webkit-transform: rotateX(-90deg);
  transform: rotateX(-90deg);
  opacity: 0;
}
figure.snip1283:hover figcaption,
figure.snip1283.hover figcaption {
  -webkit-transform: rotateX(0deg);
  transform: rotateX(0deg);
  opacity: 1;
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
  
</style>