<template>
  <div class="header">
    <div class="iconfont icon-fanhui" @click="back"></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: "titleBar",
    props: {
      title: {
        type: String
      }
    },
    methods: {
      back() { // 返回上一页
        window.history.back();
        return false;
      }
    }
  }
</script>

<style scoped>

  .header {
    display:flex;
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:white;
    height:8vh;
    width:100vw
  }

  .title {
    flex: 1;
    text-align: center;
    font-size: 14pt;
    color: black;
  }
</style>
