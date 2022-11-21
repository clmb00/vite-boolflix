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
  }
}

</script>

<template>

  <AppHeader/>
  <AppMain/>

</template>

<style lang="scss">

@import './styles/general.scss';

</style>
