<script>

import { store } from '../data/store';

export default{
  name: 'AppHeader',
  data(){
    return{
      store,
      showInput: false,
      isUnder50vh: false
    }
  },
  methods:{
    handleScroll(){
      if (window.scrollY > window.innerHeight * 0.5) this.isUnder50vh = true;
      else this.isUnder50vh = false;
    },
    search(){
      this.$emit('newSearch');
      store.movies.array = [];
      store.series.array = [];
      store.lastSearch = store.querySearch;
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll);
  }
}

</script>

<template>

  <header :class="{'dark' : isUnder50vh || store.currentPage != 'Home'}">
    <div class="container">
      <div class="logo" @click="store.currentPage = 'Home'">
        <img src="../assets/img/logo-boolflix.png" alt="Boolflix">
      </div>
      <nav>
        <ul>
          <li><a href="#" @click="store.currentPage = 'Home'">Home</a></li>
          <li><a href="#" @click="store.currentPage = 'Series'">TV Shows</a></li>
          <li><a href="#" @click="store.currentPage = 'Movies'">Movies</a></li>
        </ul>
      </nav>
      <div class="inputbox" :class="{hide: !showInput}">
        <input @keyup.enter="search" type="text" v-model.trim="store.querySearch" placeholder="Cerca qualcosa">
        <button @click="showInput = !showInput; store.querySearch = ''" class="x_btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <button @click="search" v-show="showInput"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button @click="showInput = !showInput" v-show="!showInput"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button><i class="fa-solid fa-bell"></i></button>
      <button><i class="fa-solid fa-circle-user"></i></button>
      <button><i class="fa-solid fa-caret-down"></i></button>
    </div>
  </header>


</template>

<style lang="scss" scoped>

header{
  background: linear-gradient(black, rgba(0,0,0,0));
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition: all 1s ease;
  &.dark{
    background: #000000;
  }
}
.container{
  height: 100px;
  display: flex;
  align-items: center;

  .logo{
    width: 140px;
    margin-right: 50px;
    cursor: pointer;
  }

  nav{
    // margin-right: auto;
    flex-grow: 1;
    li{
      display: inline-block;
      font-weight: bold;
      padding-inline: 15px;
      a{
        color: #c7c7c7;
      }
      a:hover, a.active{
        color: white;
      }
    }
  }

  button{
    cursor: pointer;
    background: none;
    border: none;
    color: white;
    font-size: 1.6rem;
    margin-inline: 15px;
    height: 35px;
    &:last-of-type{
      font-size: 1.2rem;
      margin-left: -5px;
    }
    &.x_btn{
      font-size: 1rem;
      margin: 0;
      height: 100%;
      border-bottom: 2px solid white;
      padding-inline: 3px;
      background-color: rgba($color: #000000, $alpha: .5);
    }
  }

  input{
    background-color: rgba($color: #000000, $alpha: .5);
    padding: 8px 2px;
    min-width: 250px;
    height: 100%;
    color: white;
    border: none;
    outline: none;
    font-weight: bold;
    border-bottom: 2px solid white;
    &::placeholder{
      color: #c7c7c7;
    }
  }

  .inputbox{
    height: 40px;
    transition: all .2s ease;
    background: transparent;
    box-shadow: 0px -10px 5px rgba($color: #000000, $alpha: .5);
    display: flex;
    align-items: center;
    &.hide{
      transform: translate(50%, 0) scaleX(0);
    }
  }
  
}

</style>