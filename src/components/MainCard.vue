<script>

export default{
  name: 'MainCard',
  props:{
    title: String,
    originalTitle: String,
    lang: String,
    vote: Number
  }
}

</script>

<template>

<li>
  {{title}}
  <ul>
    <li>{{originalTitle}}</li>
    <li>{{lang}}</li>
    <li>{{vote}}</li>
  </ul>
</li>

</template>

<style lang="scss" scoped>

</style>