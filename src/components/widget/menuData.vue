<template>
  <div>
      <div class="menuRow" @click="gotoMenuDetail">
        <img class="img-card" :src="menuData.imgUrl"/>
        <div class="title">{{menuData.name}}</div>
        <div class="name">{{menuData.user.nickname}}</div>
      </div>
  </div>
</template>

<script>
  import menuBase from './menuBase';

  export default {
    name: 'menuRow',
    extends: menuBase
  };
</script>

<style scoped>
  .menuRow {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #dddddd;
    border: 1px solid #dddddd;
  }

  .img-card {
    width: 100%;
    height: 25vh;
    border-radius: 5px 5px 0 0;
  }

  .title {
    width: 100%;
    margin: 10px 0 0 10px;
    font-size: 13pt;
    font-weight: bold;
    color: black;
    /*text-align: center;*/
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }

  .name {
    width: 100%;
    margin: 5px 0 10px 10px;
    font-size: 11pt;
    color: #c0c0c0;
  }
</style>
