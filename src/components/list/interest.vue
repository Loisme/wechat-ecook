<template>
  <div>
    <div class="title-data">
      <div class="title-info">{{title}}</div>
      <div class="more" @click="gotoCollectionPage">更多></div>
    </div>
    <scroll-menu :is-pic="isPic" :item-width="itemWidth" :list="list"></scroll-menu>
  </div>
</template>

<script>
  import scrollMenu from '../widget/horizontalScrollMenu.vue';

  export default {
    name: 'interest',
    props: {
      itemWidth: {
        type: String
      },
      isPic: {
        type: Boolean
      },
      id: {
        type: String
      },
      title: {
        type: String
      },
      list: {
        type: Array
      }
    },
    components: {
      scrollMenu
    }, methods: {
      // 跳转到指定的菜谱集合页面
      gotoCollectionPage() {
        const url = `/pages/menuCollection/main?id=${this.id}`;
        wx.navigateTo({ url });  //跳转
      }
    }
  }
</script>

<style scoped>
  .title-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 25px 25px 10px 15px;
  }

  .title-info {
    font-weight: bold;
    font-size: 14pt;
    color: black;
  }

  .more {
    color: #7e8c8d;
  }
</style>
