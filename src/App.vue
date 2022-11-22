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
        if(path.includes('movie')){
          store.moviesArray = [...response.data.results];
        } else if(path.includes('tv')){
          store.seriesArray = [...response.data.results];
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
