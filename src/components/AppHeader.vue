<script>

import { store } from '../data/store';

export default{
  name: 'AppHeader',
  data(){
    return{
      store,
      showInput: false
    }
  }
}

</script>

<template>

  <header>
    <div class="container">
      <div class="logo">
        <img src="../assets/img/logo-boolflix.png" alt="Boolflix">
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
        </ul>
      </nav>
      <div class="inputbox" :class="{hide: !showInput}">
        <input @keyup.enter="$emit('newSearch')" type="text" v-model.trim="store.querySearch" placeholder="Cerca qualcosa">
        <button @click="showInput = !showInput" class="x_btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <button @click="showInput = !showInput" v-show="!showInput"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button @click="$emit('newSearch')" v-show="showInput"><i class="fa-solid fa-magnifying-glass"></i></button>
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
}
.container{
  height: 100px;
  display: flex;
  align-items: center;

  .logo{
    width: 140px;
    margin-right: 50px;
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
      border-bottom: 2px solid white;
      padding-inline: 3px;
      background-color: rgba($color: #000000, $alpha: .5);
    }
  }

  input{
    background-color: rgba($color: #000000, $alpha: .5);
    padding: 8px 2px;
    min-width: 200px;
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
    height: 35px;
    transition: all .2s ease;
    background: transparent;
    box-shadow: 0px -4px 2px 2px rgba($color: #000000, $alpha: .5);
    display: flex;
    align-items: center;
    &.hide{
      transform: translate(50%, 0) scaleX(0);
    }
  }
  
}

</style>