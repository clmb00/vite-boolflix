<script>

import CompToggle from './CompToggle.vue';

import { store } from '../data/store';

export default{
  name: 'AppHeader',
  data(){
    return{
      store,
      showInput: false,
      isUnder50vh: false,
      activeFlag: 'it',
      showChangeLang: false,
      showUserMenu: false
    }
  },
  components:{
    CompToggle
  },
  methods:{
    handleScroll(){
      if (window.scrollY > window.innerHeight * 0.5) this.isUnder50vh = true;
      else this.isUnder50vh = false;
      this.showChangeLang = false;
      this.showUserMenu = false;
    },
    search(){
      this.$emit('newSearch');
      store.movies.array = [];
      store.series.array = [];
      store.lastSearch = store.querySearch;
    },
    changeLanguage(lang){
      store.apiLang = lang;
      this.activeFlag = lang;
      this.$emit('newLoad');
    }
  },
  computed:{
    activeFlagImg(){
      if (this.activeFlag == 'en') return 'fi-gb'
      else return 'fi-' + this.activeFlag
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
      <div class="logo" @click="store.currentPage = 'Home'; showInput = false">
        <img src="../assets/img/logo-boolflix.png" alt="Boolflix">
      </div>
      <nav>
        <ul>
          <li><a href="#" @click="store.currentPage = 'Home'; showInput = false">Home</a></li>
          <li><a href="#" @click="store.currentPage = 'Series'; showInput = false">TV Shows</a></li>
          <li><a href="#" @click="store.currentPage = 'Movies'; showInput = false">Movies</a></li>
        </ul>
      </nav>
      <div class="inputbox" :class="{hide: !showInput}">
        <input @keyup.enter="search" type="text" v-model.trim="store.querySearch" placeholder="Search">
        <button @click="showInput = !showInput; store.querySearch = ''" class="x_btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <button @click="search" v-show="showInput"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button @click="showInput = !showInput" v-show="!showInput"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button @click="showUserMenu = !showUserMenu; showChangeLang = false" class="menu">
        <i class="fa-solid fa-circle-user"></i>

        <div class="menu-container" v-if="showUserMenu">
          <p>Parental control: </p>
          <CompToggle @click.stop="store.adultContent = !store.adultContent" />
        </div>
      </button>
      <button @click="showUserMenu = !showUserMenu; showChangeLang = false" class="caret-down"><i class="fa-solid fa-caret-down"></i></button>
      <div class="flag active" @click="showChangeLang = !showChangeLang; showUserMenu = false">
        <span class="fi" :class="activeFlagImg"></span>

        <div class="change-flag-container" v-if="showChangeLang">
          <div class="flag" :class="{'active' : activeFlag == 'it'}" @click="changeLanguage('it')">
            <span class="fi" :class="'fi-it'"></span>
          </div>
          <div class="flag" :class="{'active' : activeFlag == 'en'}" @click="changeLanguage('en')">
            <span class="fi" :class="'fi-gb'"></span>
          </div>
          <div class="flag" :class="{'active' : activeFlag == 'es'}" @click="changeLanguage('es')">
            <span class="fi" :class="'fi-es'"></span>
          </div>
          <div class="flag" :class="{'active' : activeFlag == 'fr'}" @click="changeLanguage('fr')">
            <span class="fi" :class="'fi-fr'"></span>
          </div>
        </div>
      </div>
      <button class="caret-down lang" @click="showChangeLang = !showChangeLang"><i class="fa-solid fa-caret-down"></i></button>
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
    &.caret-down{
      font-size: 1.2rem;
      margin-left: -5px;
      &.lang{
        margin-left: 10px;
        margin-right: 0px;
      }
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

  input[type='text']{
    background-color: rgba($color: #000000, $alpha: .5);
    padding: 8px 5px;
    min-width: 250px;
    height: 100%;
    color: white;
    border: none;
    outline: none;
    font-size: 1.1rem;
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

.flag{
  cursor: pointer;
  filter: grayscale(.9);
  &.active{
    filter: none;
    position: relative;
  }
}

.change-flag-container{
  position: absolute;
  top: 30px;
  left: 25;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  width: 50px;
  padding-block: .5rem;
  padding-inline: .5rem;
  text-align: center;
  &>*{
    margin-bottom: 4px;
  }
}

.menu{
  position: relative;

  .menu-container{
    position: absolute;
    top: 50px;
    left: -75px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 1rem;
    width: 200px;
    // text-align: center;
    padding-block: .5rem;
    padding-inline: .5rem;
    p{
      font-size: 1rem;
      color: black;
      font-weight: bold;
      margin-block: 1rem;
    }
  }
}

</style>