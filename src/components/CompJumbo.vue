<script>

import { store } from '../data/store';

export default{
  name: 'CompJumbo',
  props:{
    index: Number
  },
  data(){
    return{
      store
    }
  },
  computed:{
    urlBackImage(){
      if (store.trendingMovies.array.length == 0) return ''
      else return 'https://image.tmdb.org/t/p/' + 'original' + store.trendingMovies.array[this.index].backdrop_path
    },
    titleJumbo(){
      if (store.trendingMovies.array.length == 0) return ''
      else return store.trendingMovies.array[this.index].title
    },
    subTitleJumbo(){
      if (store.trendingMovies.array.length == 0) return ''
      else return store.trendingMovies.array[this.index].overview
    },
    fullStars(){
      if (store.trendingMovies.array.length == 0) return ''
      else return Math.floor(Math.round(store.trendingMovies.array[this.index].vote_average)/2);
    },
    halfStars(){
      if (store.trendingMovies.array.length == 0) return ''
      else return Math.round(store.trendingMovies.array[this.index].vote_average)%2;
    },
    whiteStars(){
      if (store.trendingMovies.array.length == 0) return ''
      else return Math.floor((10 - Math.round(store.trendingMovies.array[this.index].vote_average))/2);
    }
  }
}

</script>


<template>

<div class="JumboImg" :id="index">
  <img :src="urlBackImage" alt="a" :id="index">
  <h1>{{titleJumbo}}</h1>
  <div class="subRating">
    <i v-for="n in fullStars" :key="n" class="fa-solid fa-star"></i>
    <i v-for="n in halfStars" :key="n" class="fa-regular fa-star-half-stroke"></i>
    <i v-for="n in whiteStars" :key="n" class="fa-regular fa-star"></i>
    <i class="buttons fa-solid fa-circle-play"></i>
    <i class="buttons fa-solid fa-circle-plus"></i>
  </div>
</div>

</template>

<style lang="scss" scoped>

@use "../styles/partials/variables.scss" as *;

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
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
    bottom: 90px;
    left: 54px;
    z-index: 1;
    width: 50%;
    i.buttons{
      font-size: 3rem;
      margin-left: 20px;
      vertical-align: middle;
      cursor: pointer;
      &:hover{
        color: $accent-color;
        text-shadow: 0 0 5px black;
      }
    }
  }

</style>