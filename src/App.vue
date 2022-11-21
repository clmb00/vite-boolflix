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
    callApi(){
      axios.get(store.apiUrl + '/search/movie', {
        params: {
          api_key: store.apiKey,
          language: store.apiLang,
          query: store.querySearch
        }
      })
       .then((response) => {
        store.moviesArray = [...response.data.results]
        console.log(store.moviesArray)
       })
       .catch((error) => {
        console.log(error)
       })
    }
  }
}

</script>

<template>

  <AppHeader @newSearch="callApi"/>
  <AppMain/>

</template>

<style lang="scss">

@import './styles/general.scss';

</style>
