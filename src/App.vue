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
    callApi(path, page = 1){
      axios.get(store.apiUrl + path, {
        params: {
          api_key: store.apiKey,
          language: store.apiLang,
          query: store.querySearch,
          page
        }
      })
       .then((response) => {
        switch(path){
          case '/search/movie':
            store.movies.array = store.movies.array.concat(response.data.results);
            break;
          case '/search/tv':
            store.series.array = store.series.array.concat(response.data.results);
            break;
          case '/trending/movie/week':
            store.trendingMovies.array = store.trendingMovies.array.concat(response.data.results);
            break;
          case '/trending/tv/week':
            store.trendingSeries.array = store.trendingSeries.array.concat(response.data.results);
            break;
          case '/movie/popular':
            store.popularMovies.array = store.popularMovies.array.concat(response.data.results);
            break;
          case '/movie/top_rated':
            store.topRatedMovies.array = store.topRatedMovies.array.concat(response.data.results);
            break;
          case '/tv/popular':
            store.popularSeries.array = store.popularSeries.array.concat(response.data.results);
            break;
            case '/tv/top_rated':
            store.topRatedSeries.array = store.topRatedSeries.array.concat(response.data.results);
            break;
          default:
        }
        store.loading = false;
        store.loadingNewPage = false;
       })
       .catch((error) => {
        console.log(error)
        store.loading = false;
       })
    },
    searchApiFor(what){
      store.loading = true;
      if (store.querySearch == '') return;
      store.currentPage = 'Search';
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
    },
    callNewPage(type){
      store.loadingNewPage = true;
      switch (type) {
        case 'movies':
          store.movies.page++;
          this.callApi('/search/movie', store.movies.page);
          break;
        case 'series':
          store.series.page++;
          this.callApi('/search/tv', store.series.page);
          break;
        case 'tmovies':
          store.trendingMovies.page++;
          this.callApi('/trending/movie/week', store.trendingMovies.page);
          return ''
        case 'tseries':
          store.trendingSeries.page++;
          this.callApi('/trending/tv/week', store.trendingSeries.page);
          break;
        case 'topmovies':
          store.topRatedMovies.page++;
          this.callApi('/movie/top_rated', store.topRatedMovies.page);
          break;
        case 'topseries':
          store.topRatedSeries.page++;
          this.callApi('/tv/top_rated', store.topRatedSeries.page);
          break;
        case 'popmovies':
          store.popularMovies.page++;
          this.callApi('/movie/popular', store.popularMovies.page);
          break;
        case 'popseries':
          store.popularSeries.page++;
          this.callApi('/tv/popular', store.popularSeries.page);
        }
      console.log(type)
    },
    loadPage(){
      store.loading = true;
      store.currentPage = 'Home'
      store.movies.array = [];
      store.series.array = [];
      store.trendingMovies.array = [];
      store.trendingSeries.array = [];
      store.popularMovies.array = [];
      store.popularSeries.array = [];
      store.topRatedMovies.array = [];
      store.topRatedSeries.array = [];
      this.callApi('/trending/movie/week');
      this.callApi('/trending/tv/week');
      this.callApi('/movie/popular');
      this.callApi('/movie/top_rated');
      this.callApi('/tv/popular');
      this.callApi('/tv/top_rated');
    }
  },
  mounted(){
    this.loadPage()
  }
}

</script>

<template>

  <AppHeader @newSearch="searchApiFor('both')" @newLoad="loadPage()"/>
  <AppMain @callNewPage="callNewPage"/>

</template>

<style lang="scss">

@use './styles/general.scss' as *;

</style>
