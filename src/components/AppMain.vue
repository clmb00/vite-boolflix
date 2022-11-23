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
      indexJumbo: 16
    }
  },
  methods:{
    newPage(type){
      this.$emit('callNewPage', type);
    }
  },
  computed:{
    urlBackImage(){
      if (store.popularMovies.array.length == 0) return ''
      else return 'https://image.tmdb.org/t/p/' + 'w1280' + store.popularMovies.array[this.indexJumbo].backdrop_path
    },
    titleJumbo(){
      if (store.popularMovies.array.length == 0) return ''
      else return store.popularMovies.array[this.indexJumbo].title
    },
    subTitleJumbo(){
      if (store.popularMovies.array.length == 0) return ''
      else return store.popularMovies.array[this.indexJumbo].overview
    },
    fullStars(){
      if (store.popularMovies.array.length == 0) return ''
      else return Math.floor(Math.round(store.popularMovies.array[this.indexJumbo].vote_average)/2);
    },
    halfStars(){
      if (store.popularMovies.array.length == 0) return ''
      else return Math.round(store.popularMovies.array[this.indexJumbo].vote_average)%2;
    },
    whiteStars(){
      if (store.popularMovies.array.length == 0) return ''
      else return Math.floor((10 - Math.round(store.popularMovies.array[this.indexJumbo].vote_average))/2);
    }
  }
}

</script>

<template>

  <main>

    <div class="jumbo" v-show="store.currentPage == 'Home'">
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

    <div v-if="store.currentPage != 'Home'" class="top-space"></div>

    <div class="container">
      <MainCardContainer v-show="store.currentPage == 'Home' || store.currentPage == 'Series'" sectionTitle="Trending TV Series" type="tseries" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Home' || store.currentPage == 'Movies'" sectionTitle="Trending Movies" type="tmovies" @newPage="newPage"/>

      <MainCardContainer v-show="store.currentPage == 'Movies'" sectionTitle="Popular Movies" type="popmovies" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Movies'" sectionTitle="Top Rated Movies" type="topmovies" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Series'" sectionTitle="Popular Tv Series" type="popseries" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Series'" sectionTitle="Top Rated Tv Series" type="topseries" @newPage="newPage"/>

      <MainCardContainer v-show="store.currentPage == 'Search'" v-if="store.movies.array.length != 0" sectionTitle="Movies" type="movies" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Search'" v-if="store.series.array.length != 0" sectionTitle="TV Series" type="series" @newPage="newPage"/>
      <h2 v-show="store.currentPage == 'Search' && store.series.array.length == 0 && store.movies.array.length == 0">Non abbiamo trovato nessun risultato con la ricerca: <i>"{{store.lastSearch}}""</i></h2>
    </div>

  </main>

</template>

<style lang="scss" scoped>

@use "../styles/partials/variables.scss" as *;

main{
  padding-bottom: 80px;
}

.top-space{
  height: calc($header_height + 50px);
}

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
    background: linear-gradient(rgba(0,0,0,0), $back-color 95%);
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
    }
  }
}

</style>