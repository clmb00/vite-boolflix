<script>

export default {
  name: 'CompLoading',
  props:{
    scale: String
  }
}

</script>

<template>

<div class="lds-default" :class="{'small' : scale == 'small'}"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

</template>

<style lang="scss" scoped>

.lds-default {
  display: inline-block;
  position: relative;
  width: 160px;
  height: 160px;
  transform: scale(.8);
  &.small{
    transform: translateX(-50px) scale(.5);
  }
}
.lds-default div {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 74px;
  left: 132px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 44px;
  left: 124px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 22px;
  left: 104px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 14px;
  left: 74px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 22px;
  left: 44px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 44px;
  left: 22px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 74px;
  left: 14px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 104px;
  left: 22px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 124px;
  left: 44px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 132px;
  left: 74px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 124px;
  left: 104px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 104px;
  left: 124px;
}
@keyframes lds-default {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}

</style>