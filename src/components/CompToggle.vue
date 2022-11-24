<script>

import { store } from '../data/store';

export default {
  name: 'CompToggle',
  data(){
    return{
      store
    }
  }
}

</script>

<template>

<input class="toggle" type="checkbox" :class="{'tgl-active': !store.adultContent}" />

</template>

<style scoped lang="scss" >

.toggle {
  appearance: none;
  width: 62px;
  height: 32px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #707070;
  transition: background-color ease 0.3s;
}

.toggle:before {
  content: "on off";
  display: block;
  position: absolute;
  z-index: 2;
  width: 28px;
  height: 28px;
  background: #fff;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -28px;
  word-spacing: 35px;
  line-height: 28px;
  color: #fff;
  text-shadow: -1px -1px rgba(0,0,0,0.15);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.toggle.tgl-active {
  background-color: #4CD964;
}

.toggle.tgl-active:before {
  left: 32px;
}

</style>