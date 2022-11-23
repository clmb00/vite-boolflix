<script>

import { store } from '../data/store';

export default {
  name: 'CompTag',
  data(){
    return{
      store,
      selectionOfColors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
    }
  },
  props:{
    type: String
  },
  methods:{
    randomIndex(){
      return Math.floor(Math.random() * this.selectionOfColors.length)
    },
    filterGenres(id){
      const tag = document.getElementById(id);
      if(tag.classList.contains('active')){
        tag.classList.remove('active');
        store.genreFilter = store.genreFilter.filter((elem) => elem != id);
      } else {
        tag.classList.add('active');
        store.genreFilter.push(id)
      }
    }
  }
}

</script>

<template>

  <h2>Filters</h2>

  <ul>
    <li class="tag" v-for="genre in store[type]" :id="genre.id" :class="selectionOfColors[randomIndex()]" @click="filterGenres(genre.id)">
      {{genre.name}}
    </li>
  </ul>

</template>

<style scoped lang="scss" >

h2{
  margin-bottom: 35px;
}

ul{
  display: flex;
  width: 100%;
  column-gap: 5px;
  row-gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 25px;
  li{
    user-select: none;
    color: white;
    cursor: pointer;
    padding: .5rem 1rem;
    border-radius: 50px;
    filter: brightness(.2);
    &:hover{
      filter: brightness(.4);
    }
    &.active{
      filter: brightness(.8);
    }
    &.red{
      background-color: #fc543a;
    }
    &.orange{
      background-color: #ff9566;
    }
    &.yellow{
      background-color: #ffd966;
    }
    &.green{
      background-color: #93c47d;
    }
    &.blue{
      background-color: #6fa8dc;
    }
    &.purple{
      background-color: #c36fdc;
    }
  }
}

</style>