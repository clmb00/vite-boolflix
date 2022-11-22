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
      sizeImg: 'w185'
    }
  },
  props:{
    title: String,
    originalTitle: String,
    lang: String,
    vote: Number,
    urlImg: String
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
    generateVote(){
      return Math.round(this.vote);
    }
  }
}

</script>

<template>

<li>
  <img :src="basicUrlImg + sizeImg + urlImg" :alt="title">
  <ul>
    <li>{{title}}</li>
    <li>{{originalTitle}}</li>
    <li>
      <span class="fi" :class="createFlag">{{displayName}}</span>
    </li>
    <li>
      <i v-for="n in Math.floor(generateVote/2)" :key="n" class="fa-solid fa-star"></i>
      <i v-for="n in generateVote%2" :key="n" class="fa-regular fa-star-half-stroke"></i>
      <i v-for="n in Math.floor((10 - generateVote)/2)" :key="n" class="fa-regular fa-star"></i>
    </li>
  </ul>
  <hr>
</li>

</template>

<style lang="scss" scoped>

img{
  vertical-align: middle;
}
ul{
  display: inline-block;
  padding-left: 40px;
}
hr{
  margin-block: 8px;
}

</style>