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
      store,
      scrollValue: 500,
      scrollLimit: 60
    }
  },
  methods:{
    scrolltToLeft(){
      const ul = document.getElementById(this.type);
      ul.scrollLeft -= this.scrollValue;
    },
    scrollToRight(){
      const ul = document.getElementById(this.type);
      ul.scrollLeft += this.scrollValue;
    },
    loadNew(){
      this.scrollToRight();
      this.$emit('newPage', this.type);
    }
  },
  computed:{
    checkType(){
      if (this.type=='movies') {
        return store.movies.array
      } else if (this.type=='series') {
        return store.series.array
      } else if (this.type=='tmovies') {
        return store.trendingMovies.array
      } else if (this.type=='tseries') {
        return store.trendingSeries.array
      } else if (this.type=='topmovies') {
        return store.topRatedMovies.array
      } else if (this.type=='topseries') {
        return store.topRatedSeries.array
      } else if (this.type=='popmovies') {
        return store.popularMovies.array
      } else if (this.type=='popseries') {
        return store.popularSeries.array
      }
    }
  }
}

</script>

<template>

    <div class="group">
      <h2>{{sectionTitle}}</h2>
      <div class="scroll s-left" @click="scrolltToLeft">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <ul :id="type">
        <li><i class="white-space"></i></li>
        <MainCard
        v-for="(movie, i) in checkType" 
        :key="i" 
        :title="movie.title || movie.name" 
        :originalTitle="movie.original_title || movie.original_name" 
        :lang="movie.original_language" 
        :vote="movie.vote_average" 
        :urlImg="movie.poster_path" 
        :overview="movie.overview"
        :id="movie.id"
        class="card"
        />
        <li @click="loadNew"><i class="fa-solid fa-circle-plus"></i></li>
      </ul>
      <div class="scroll s-right" @click="scrollToRight">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>

</template>

<style lang="scss" scoped>

@use "../styles/partials/variables.scss" as *;

h2{
  color: white;
  font-size: 1.8rem;
}

ul{
  display: flex;
  // grid-auto-flow: column;
  column-gap: 8px;
  padding-inline: 80px;
  padding-block: 60px;

  overflow-x: auto;
  scroll-behavior: smooth;
  // snap at the start of cards when scroll
  scroll-snap-type: inline mandatory;
  &>*{
    scroll-snap-align: start;
  }

  li:first-child{
    padding-inline: 25px;
    padding-left: 60px;
  }

  li:last-child{
    color: white;
    font-size: 4rem;
    padding-inline: 25px;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }
}

.group{
  margin-bottom: 60px;
  width: 100%;
  position: relative;
}

.scroll{
  color: white;
  width: 80px;
  height: $height-card;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  position: absolute;
  top: calc(50% - $height-card/2 + 8px);
  z-index: 1;
  cursor: pointer;
  &.s-right{
    right: 0;
    // background: linear-gradient(to left, black, rgba(0,0,0,0));
  }
  &.s-left{
    left: 0;
    // background: linear-gradient(to right, black, rgba(0,0,0,0));
  }
}

</style>