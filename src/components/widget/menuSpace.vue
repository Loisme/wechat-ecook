<template>
  <div @click="gotoMenuDetail" class="page-item">
    <img class="img-card" :src="menuData.imgUrl"/>
    <div class="title">{{menuData.name}}</div>
    <div class="name">{{menuData.user.nickname}}</div>
  </div>
</template>

<script>
  import menuBase from './menuBase.vue';

  export default {
    name: 'menuSpace',
    extends: menuBase,
  };
</script>

<style scoped>
  .img-card {
    width: 100%;
    height: 300rpx;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #dddddd;
    border: 1px solid #dddddd;
  }

  .title {
    width: 100%;
    margin: 10px 0 0 0;
    font-size: 13pt;
    font-weight: bold;
    color: black;
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }

  .name {
    width: 100%;
    margin: 10px 0 10px 0;
    font-size: 11pt;
    color: #c0c0c0;
  }

  .page-item {
    width: 45vw;
    flex: 0 0 auto;
    height: auto;
    padding-bottom: 15px;
  }
</style>
