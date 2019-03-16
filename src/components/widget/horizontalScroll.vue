<template>
  <scroll class="page-wrapper"
          :data="data"
          :scrollX="true">

    <div class="page-content">
      <menu-data class="page-item" :menuArr="item" v-for="item in data"></menu-data>
    </div>
  </scroll>
</template>

<script>
  import menuData from '../widget/menuData.vue';
  import scroll from './scrollView.vue';

  export default {
    name: "horizontalScrollMenu",
    props: {
      list: {
        type: Array
      }
    },
    components: {
      menuData,
      scroll
    },
    data() {
      return {
        data: []
      }
    },
    created() {
      this.$nextTick(() => {
        this.initTabScroll();
      });
    },
    methods: {
      initTabScroll() {
        let api = 'https://api.ecook.cn/public/getHomeData.shtml?version=15.4.5';
        this.$http.get(api)
          .then((response) => { // 响应处理
            this.data = response.data.data.recommendRecipes;
            this.data = this.data.concat(data);
            console.log(this.data);
          });
      }
    }
  }
</script>

<style scoped>
  .page-wrapper {
    width: 100vw;
    overflow: scroll;
  }

  /* 伪类隐藏滚动条 */
  .page-wrapper::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  .page-content {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    padding: 10px 15px;
  }

  .page-item {
    width: 60vw;
    flex: 0 0 auto;
    height: auto;
    padding-right: 15px;
  }
</style>
