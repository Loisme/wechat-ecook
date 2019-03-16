<template>
  <div>
    <div class="title-data">
      <div class="title-info">{{title}}</div>
      <div class="more" @click="gotoMoreData">更多></div>
    </div>
    <!-- 菜谱列表 -->
    <div class="page-content">
      <menu-data class="page-item" :menuData="item" v-for="item in list"></menu-data>
    </div>
  </div>
</template>

<script>
  import menuData from '../widget/menuSpace.vue';

  export default {
    name: 'interest',
    props: {
      title: {
        type: String
      },
      list: {
        type: Array
      }
    },
    components: {
      menuData
    },
    methods: {
      gotoMoreData() {
        const title = "菜谱推荐";
        const type = "latest";
        const url = `/pages/recommend/main?title=${title}&type=${type}`;
        wx.navigateTo({ url });
        //TODO 更多菜谱推荐
        // this.$router.push({name: 'recommend', query: {title: '菜谱推荐', type: 'latest'}});
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

  .page-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 15px;
  }

  .page-item {
    width: 45vw;
    flex: 0 0 auto;
    height: auto;
    padding-bottom: 15px;
  }
  .more{
    color: #7e8c8d;
  }
</style>
