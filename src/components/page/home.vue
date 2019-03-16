<template>
  <div>
    <!-- 轮播图 -->
    <!--<banners :list="banners"></banners>-->

    <!-- 兴趣列表 -->
    <div v-for="(item, index) in interests">
      <interest-view :is-pic="index % 2 === 1"
                     :item-width="index % 2 === 1 ? '75vw' : '60vw'"
                     :id="item.id"
                     :key="item.id"
                     :title="item.title"
                     :list="item.list">
      </interest-view>
    </div>

    <!-- 推荐列表 -->
    <horizontal-scroll title="菜谱推荐" :list="recommendRecipes"></horizontal-scroll>

    <!-- 菜谱集合 -->
    <collection-list></collection-list>
  </div>
</template>

<script>
  // import banners from '../list/banners.vue';
  import interestView from '../list/interest.vue';
  import horizontalScroll from '../list/doubleRecipes.vue';
  import collectionList from '../list/collectionList.vue';

  export default {
    data() {
      return {
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0, // 起始页面
        menuList: [], // 数据列表
        swipeList: [], // 轮播图
        categories: [], // 分类列表
        homeData: {}, // 数据
        recommendRecipes: [], // 推荐
        interests: [], // 兴趣
        banners: [], // 横幅
        collectionList: [] // 菜谱集合
      };
    },
    components: {
      // banners,
      interestView,
      horizontalScroll,
      collectionList
    },
    mounted() {
      this.getHomeData();
    },
    methods: {
      getHomeData() {
        let api = 'https://api.ecook.cn/public/getHomeData.shtml?version=15.4.5';
        this.$http.get(api)
          .then((response) => { // 响应处理
            this.homeData = response.data.data;
            this.recommendRecipes = this.homeData.recommendRecipes;
            this.interests = this.homeData.interests;
            this.banners = this.homeData.banners;
            console.log(this.homeData);
            console.log(this.banners);
          });
      }
    }
  };
</script>

<style>

</style>
