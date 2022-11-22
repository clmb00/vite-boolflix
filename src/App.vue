<script>

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

import axios from 'axios';

import { store } from './data/store'

export default{
  name: 'App',
  components:{
    AppHeader,
    AppMain
  },
  data(){
    return{
      store
    }
  },
  methods:{
    callApi(path){
      axios.get(store.apiUrl + path, {
        params: {
          api_key: store.apiKey,
          language: store.apiLang,
          query: store.querySearch
        }
      })
       .then((response) => {
        switch(path){
          case '/search/movie':
            store.moviesArray = [...response.data.results];
            break;
          case '/search/tv':
            store.seriesArray = [...response.data.results];
            break;
          case '/trending/movie/week':
            store.trendingMovies = [...response.data.results];
            break;
          case '/trending/tv/week':
            store.trendingSeries = [...response.data.results];
            break;
          case '/movie/popular':
            store.popularMovies = [...response.data.results];
            break;
          case '/movie/top_rated':
            store.topRatedMovies = [...response.data.results];
            break;
          case '/tv/popular':
            store.popularSeries = [...response.data.results];
            break;
            case '/tv/top_rated':
            store.topRatedSeries = [...response.data.results];
            break;
          default:
        }
       })
       .catch((error) => {
        console.log(error)
       })
    },
    searchApiFor(what){
      switch(what){
        case 'movies':
          this.callApi('/search/movie');
          break;
        case 'series':
          this.callApi('/search/tv');
          break;
        default:
          this.callApi('/search/movie');
          this.callApi('/search/tv');
      }
    }
  },
  mounted(){
    this.callApi('/trending/movie/week');
    this.callApi('/trending/tv/week');
    this.callApi('/movie/popular');
    this.callApi('/movie/top_rated');
    this.callApi('/tv/popular');
    this.callApi('/tv/top_rated');
  }
}

</script>

<template>

  <AppHeader @newSearch="searchApiFor('both')"/>
  <AppMain/>

</template>

<style lang="scss">

@use './styles/general.scss' as *;

</style>
