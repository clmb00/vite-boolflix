<script>

import MainCard from './MainCard.vue';

import { store } from '../data/store';

export default{
  name: 'AppMain',
  components:{
    MainCard
  },
  data(){
    return{
      store
    }
  }
}

</script>

<template>

  <main>

    <h2>Movies</h2>
    <ul>
      <MainCard
      v-for="(movie, i) in store.moviesArray" 
      :key="i" 
      :title="movie.title" 
      :originalTitle="movie.original_title" 
      :lang="movie.original_language" 
      :vote="movie.vote_average"
      />
    </ul>

  </main>

</template>

<style lang="scss" scoped>

main{
  padding-inline: 34px;
}

</style>