<script>

import { store } from '../data/store'

export default{
  name: 'AppHeader',
  data(){
    return{
      store
    }
  }
}

</script>

<template>

  <header>
    <input type="text" v-model="store.querySearch" placeholder="Cerca qualcosa">
    <button @click="$emit('newSearch')">Cerca</button>
  </header>


</template>

<style lang="scss" scoped>

header{
  padding: 30px 20px;
}

</style>