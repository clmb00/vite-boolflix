<script>

import MainCard from './MainCard.vue';

import { store } from '../data/store';

export default{
  name: 'MainCardContainer',
  components:{
    MainCard
  },
  props:{
    sectionTitle: String,
    type: String
  },
  data(){
    return{
      store
    }
  },
  computed:{
    checkType(){
      if (this.type=='movies') {
        return store.moviesArray
      } else if (this.type=='series') {
        return store.seriesArray
      } else if (this.type=='tmovies') {
        return store.trendingMovies
      } else if (this.type=='tseries') {
        return store.trendingSeries
      } else if (this.type=='topmovies') {
        return store.topRatedMovies
      } else if (this.type=='topseries') {
        return store.topRatedSeries
      } else if (this.type=='popmovies') {
        return store.popularMovies
      } else if (this.type=='popseries') {
        return store.popularSeries
      }
    }
  }
}

</script>

<template>

    <div class="group">
      <h2>{{sectionTitle}}</h2>
      <ul>
        <MainCard
        v-for="(movie, i) in checkType" 
        :key="i" 
        :title="movie.title || movie.name" 
        :originalTitle="movie.original_title || movie.original_name" 
        :lang="movie.original_language" 
        :vote="movie.vote_average" 
        :urlImg="movie.poster_path" 
        :overview="movie.overview"
        class="card"
        />
      </ul>
    </div>

</template>

<style lang="scss" scoped>

@use "../styles/partials/variables.scss" as *;

h2{
  margin-bottom: 50px;
  color: white;
  font-size: 1.8rem;
}

ul{
  display: flex;
  // overflow-x: scroll;
  column-gap: 8px;
}

.group{
  margin-bottom: 60px;
}

</style>