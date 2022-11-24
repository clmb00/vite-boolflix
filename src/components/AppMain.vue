<script>

import MainCardContainer from './MainCardContainer.vue';
import CompLoading from './CompLoading.vue';
import CompTag from './CompTag.vue';
import CompJumbo from './CompJumbo.vue';

import { store } from '../data/store';

export default{
  name: 'AppMain',
  components:{
    MainCardContainer,
    CompLoading,
    CompTag,
    CompJumbo
  },
  data(){
    return{
      store,
      indexJumbo: 10,
      timerSlider: 6, //secondi
      isPaused: false
    }
  },
  methods:{
    newPage(type){
      this.$emit('callNewPage', type);
    },
    createGenreTotal(){
      store.genreTotal = store.genreMovies.concat(store.genreSeries.filter(function(elem){
        let isThere = false;
        store.genreMovies.forEach((item) => {
          if(item.id == elem.id) isThere = true;
        })
        return !isThere
      }));
      return 'genreTotal'
    },
    scroll(direction){
      if (direction == 'r') {
        if (++this.indexJumbo > 19) this.indexJumbo = 0;
      } else {
        if (--this.indexJumbo < 0) this.indexJumbo = 19;
      }
    }
  },
  mounted(){
    // Change slider jumbo
    setInterval(()=>{
      if (!this.isPaused){
        if (++this.indexJumbo > 19 ) this.indexJumbo = 0;
      }
    },1000 * this.timerSlider)
  }
}

</script>

<template>

  <main>

    <div class="loading_page" v-show="store.loading">
      <CompLoading scale="big"/>
    </div>
    
    <div class="jumbo" v-show="store.currentPage == 'Home' && !store.loading" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
      <div class="scroll s-left" @click="scroll('l')" :class="{'hide-scroll' : !isPaused}">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <CompJumbo :index="indexJumbo"/>
      <div class="scroll s-right" @click="scroll('r')" :class="{'hide-scroll' : !isPaused}">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    
    <!-- White space for header -->
    <div v-show="store.currentPage != 'Home' && !store.loading" class="top-space"></div>

    <div class="container" v-show="!store.loading">
      
      <!-- Tags in Tv Shows, Movies and Search -->
      <div v-show="store.currentPage == 'Search' && store.movies.array.length != 0 || store.currentPage == 'Movies' || store.currentPage == 'Series'">
        <CompTag :type="createGenreTotal()"/>
      </div>
      
      <!-- Search sliders -->
      <MainCardContainer v-show="store.currentPage == 'Search'" v-if="store.movies.array.length != 0" sectionTitle="Movies" type="movies" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Search'" v-if="store.series.array.length != 0" sectionTitle="TV Series" type="series" @newPage="newPage"/>

      <!-- Home sliders (Movie/Series) -->
      <MainCardContainer v-show="store.currentPage == 'Home' || store.currentPage == 'Series'" sectionTitle="Trending TV Series" type="tseries" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Home' || store.currentPage == 'Movies'" sectionTitle="Trending Movies" type="tmovies" @newPage="newPage"/>
      
      <!-- Movies sliders -->
      <MainCardContainer v-show="store.currentPage == 'Movies'" sectionTitle="Top Rated Movies" type="topmovies" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Movies'" sectionTitle="Popular Movies" type="popmovies" @newPage="newPage"/>
      
      <!-- Series sliders -->
      <MainCardContainer v-show="store.currentPage == 'Series'" sectionTitle="Top Rated Tv Series" type="topseries" @newPage="newPage"/>
      <MainCardContainer v-show="store.currentPage == 'Series'" sectionTitle="Popular Tv Series" type="popseries" @newPage="newPage"/>

      <!-- Parental control message -->
      <h4 v-show="store.currentPage == 'Search' && store.series.array.length != 0 || store.currentPage == 'Search' && store.movies.array.length != 0">
        <span v-show="store.adultContent">Parental control is disable, go to your user profile to activate it.</span>
        <span v-show="!store.adultContent">Parental control is active, your search is safe!</span>
      </h4>
      
      <!-- No results in search -->
      <h2 v-show="store.currentPage == 'Search' && store.series.array.length == 0 && store.movies.array.length == 0">We didn't find any matches for <i>"{{store.lastSearch}}"</i>.</h2>
      <MainCardContainer v-show="store.currentPage == 'Search' && store.series.array.length == 0 && store.movies.array.length == 0" sectionTitle="Browse our most Popular Movies: " type="popmovies-two" @newPage="newPage"/>

    </div>

  </main>

</template>

<style lang="scss" scoped>

@use "../styles/partials/variables.scss" as *;

main{
  padding-bottom: 80px;
}

h2{
  margin-bottom: 50px;
}

h4{
  color: white;
}

.top-space{
  height: calc($header_height + 50px);
}

.jumbo{
  width: 100%;
  height: $jumbo_height;
  overflow: hidden;
  position: relative;
  &::after{
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    background: linear-gradient(rgba(0,0,0,0), $back-color 95%);
    width: 100%;
    height: 200px;
  }

  .scroll{
    z-index: 2;
    position: absolute;
    top: calc($jumbo_height / 2 - 50px);
    font-size: 4rem;
    color: rgba(255, 255, 255, .8);
    text-shadow: 0 0 5px black;
    cursor: pointer;
    transition: opacity .5s ease;
    &.s-right{
      right: 30px;
    }
    &.s-left{
      left: 30px;
    }
    &.hide-scroll{
      opacity: 0;
    }
  }
}

.loading_page{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>