<template>
  <div>
      <div class="menuRow" @click="gotoMenuDetail">
        <img class="img-card" :src="menuData.imgUrl"/>
        <div class="title">{{menuData.name}}</div>
      </div>
  </div>
</template>

<script>
  import menuBase from './menuBase';

  export default {
    name: 'menuRow',
    extends: menuBase,
  };
</script>

<style scoped>
  .menuRow {
    position: relative;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #dddddd;
    border: 1px solid #dddddd;
    height: 25vh;
  }

  .img-card {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    opacity: 0.9; /* 透明度 */
    filter: alpha(opacity=90); /* 透明度 - IE8以及更早的版本 */
  }

  .title {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0 0 10px 10px;
    font-size: 13pt;
    font-weight: bold;
    color: white;
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }

</style>
