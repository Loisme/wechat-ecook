<template>
  <div class="page-div">
    <div class="container">
      <div class="item"
           v-show="menuList.length > 0"
           v-for="item in menuList">
        <menuRow :menuData="item"></menuRow>
      </div>
    </div>
  </div>
</template>

<script>
  import menuRow from '../widget/menuRow.vue';

  export default {
    props: {
      menuList: {
        type: Object
      }
    },
    components: {
      menuRow
    }
  };
</script>

<style scoped>
  .page-div{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .container {
    width: 96vw;
    height: 100vh;
  }

  .item {
    width: 100%;
    padding-top: 10px;
    background-color: rgba(250, 250, 250, 0.80);
  }

  .item::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
</style>
