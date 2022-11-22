<script>

import "/node_modules/flag-icons/css/flag-icons.min.css";

import supportedLanguages from '../data/languageTOcountry.js';

export default{
  name: 'MainCard',
  data(){
    return{
      supportedLanguages,
      correctCode: "",
      basicUrlImg: 'https://image.tmdb.org/t/p/',
      sizeImg: 'w200',
      frontSide: true,
      onCard: false
    }
  },
  props:{
    title: String,
    originalTitle: String,
    lang: String,
    vote: Number,
    urlImg: String,
    overview: String
  },
  computed:{
    createFlag(){
      this.correctCode = "";
      this.correctCode = this.supportedLanguages.find((elem) => {return elem.l == this.lang});
      if(this.correctCode) {return 'fi-' + this.correctCode.c}
      else {return ''}
    },
    displayName(){
      if(this.correctCode){return ''}
      else {return this.lang.toUpperCase()}
    },
    fullStars(){
      return Math.floor(Math.round(this.vote)/2);
    },
    halfStars(){
      return Math.round(this.vote)%2;
    },
    whiteStars(){
      return Math.floor((10 - Math.round(this.vote))/2);
    },
    hideDesc(){
      console.log(this.frontSide);
      console.log(this.onCard);
      return (this.onCard && !this.frontSide) ? '' : 'hide'
    }
  }
}

</script>

<template>

<li class="card" @click="frontSide = !frontSide" @mouseover="onCard = true" @mouseleave="onCard = false; frontSide = true">
  <div>
    <img :src="basicUrlImg + sizeImg + urlImg" :alt="title">
    <div class="pointer" v-show="frontSide">
      <i class="fa-regular fa-circle-dot"></i>
    </div>
    <ul :class="hideDesc">
      <li class="title">{{title}}</li>
      <li class="title-two">{{originalTitle}}</li>
      <li class="flag">
        <span class="fi" :class="createFlag">{{displayName}}</span>
      </li>
      <li class="stars">
        <i v-for="n in fullStars" :key="n" class="fa-solid fa-star"></i>
        <i v-for="n in halfStars" :key="n" class="fa-regular fa-star-half-stroke"></i>
        <i v-for="n in whiteStars" :key="n" class="fa-regular fa-star"></i>
      </li>
      <li class="overview">
        {{overview}}
      </li>
    </ul>
  </div>
</li>

</template>

<style lang="scss" scoped>

@use "../styles/partials/variables.scss" as *;

img{
  vertical-align: middle;
}
.card{
  width: 200px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all .3s ease;
  &:hover{
    transform: scale(1.3);
    margin-inline: 50px;
  }
  &:hover .pointer i{
    display: inline-block;
  }
}

.pointer{
  i{
    width: 50px;
    text-align: center;
    display: none;
    font-size: 2rem;
    color: white;
    text-shadow: 0px 0px 5px black;
    position: absolute;
    bottom: 20px;
    left: calc(50% - 25px);
    animation-name: click;
    animation-duration: .6s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes click {
    0% {transform: scale(.5);}
    100% {transform: scale(1);}
  }
}

ul{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5px;
  background-color: rgba($color: #000, $alpha: .8);
  transition: all .8s ease;
  &.hide{
    transform: translate(0, 100%);
  }
  .title{
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .title-two{
    color: #ddd;
    font-style: italic;
    font-weight: bold;
    font-size: .9rem;
    margin-top: 5px;
  }
  .flag, .stars{
    display: inline-block;
    margin-top: 10px;
    margin-inline: 5px;
  }
  .stars{
    color: white;
  }
  .overview{
    flex-grow: 1;
    overflow-y: auto;
    margin-block: 5px;
    color: white;
    font-size: .8rem;
  }
}

</style>

