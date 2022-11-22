<script>

import MainCardContainer from './MainCardContainer.vue';

import { store } from '../data/store';

export default{
  name: 'AppMain',
  components:{
    MainCardContainer
  },
  data(){
    return{
      store,
      indexJumbo: 15
    }
  },
  computed:{
    urlBackImage(){
      if (store.popularMovies.length == 0) return ''
      else return 'https://image.tmdb.org/t/p/' + 'w1280' + store.popularMovies[this.indexJumbo].backdrop_path
    },
    titleJumbo(){
      if (store.popularMovies.length == 0) return ''
      else return store.popularMovies[this.indexJumbo].title
    },
    subTitleJumbo(){
      if (store.popularMovies.length == 0) return ''
      else return store.popularMovies[this.indexJumbo].overview
    },
    fullStars(){
      if (store.popularMovies.length == 0) return ''
      else return Math.floor(Math.round(store.popularMovies[this.indexJumbo].vote_average)/2);
    },
    halfStars(){
      if (store.popularMovies.length == 0) return ''
      else return Math.round(store.popularMovies[this.indexJumbo].vote_average)%2;
    },
    whiteStars(){
      if (store.popularMovies.length == 0) return ''
      else return Math.floor((10 - Math.round(store.popularMovies[this.indexJumbo].vote_average))/2);
    }
  }
}

</script>

<template>

  <main>

    <div class="jumbo">
      <img :src="urlBackImage" alt="a">
      <h1>{{titleJumbo}}</h1>
      <div class="subRating">
        <i v-for="n in fullStars" :key="n" class="fa-solid fa-star"></i>
        <i v-for="n in halfStars" :key="n" class="fa-regular fa-star-half-stroke"></i>
        <i v-for="n in whiteStars" :key="n" class="fa-regular fa-star"></i>
        <i class="buttons fa-solid fa-circle-play"></i>
        <i class="buttons fa-solid fa-circle-plus"></i>
      </div>
    </div>

    <div class="container">
      <MainCardContainer sectionTitle="Trending Movies" type="tmovies"/>
      <MainCardContainer sectionTitle="Trending TV Series" type="tseries"/>
      <MainCardContainer sectionTitle="Movies" type="movies"/>
      <MainCardContainer sectionTitle="TV Series" type="series"/>
    </div>

  </main>

</template>

<style lang="scss" scoped>

.jumbo{
  width: 100%;
  height: 70vh;
  overflow: hidden;
  position: relative;
  z-index: -1;
  &::after{
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    background: linear-gradient(rgba(0,0,0,0), #333 95%);
    width: 100%;
    height: 200px;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    object-position: center;
    background-color: black;
  }
  h1{
    font-size: 4rem;
    color: white;
    position: absolute;
    bottom: 150px;
    left: 50px;
    z-index: 1;
  }
  .subRating{
    font-size: 1.8rem;
    color: white;
    position: absolute;
    z-index: 1;
    bottom: 90px;
    left: 54px;
    width: 50%;
    i.buttons{
      font-size: 3rem;
      margin-left: 20px;
      vertical-align: middle;
      cursor: pointer;
      z-index: 444;
    }
  }
}

</style>