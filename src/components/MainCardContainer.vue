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
      }
    }
  }
}

</script>

<template>

  <main>

    <div>
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

  </main>

</template>

<style lang="scss" scoped>

@use "../styles/partials/variables.scss" as *;

h2{
  margin-bottom: 25px;
  color: white;
  font-size: 1.8rem;
}

ul{
  display: flex;
  // overflow-x: scroll;
  column-gap: 8px;
  margin-bottom: 30px;
}

</style>