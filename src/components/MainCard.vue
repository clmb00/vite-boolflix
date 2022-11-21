<script>

import "/node_modules/flag-icons/css/flag-icons.min.css";

import supportedLanguages from '../data/languageTOcountry.js';

export default{
  name: 'MainCard',
  data(){
    return{
      supportedLanguages,
      correctCode: ""
    }
  },
  props:{
    title: String,
    originalTitle: String,
    lang: String,
    vote: Number
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
    }
  }
}

</script>

<template>

<li>
  {{title}}
  <ul>
    <li>{{originalTitle}}</li>
    <li>
      <span class="fi" :class="createFlag">{{displayName}}</span>
    </li>
    <li>{{vote}}</li>
  </ul>
</li>

</template>

<style lang="scss" scoped>

</style>