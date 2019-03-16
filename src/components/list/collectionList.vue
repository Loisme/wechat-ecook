<template>
    <div class="menu-page"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="2">

      <!-- 列表数据 -->
      <div class="item"
           v-show="menuList.length > 0"
           v-for="item in menuList">
        <menu-big-data v-if="item.type === 1 " :menuData="item.recipe"></menu-big-data>
        <menu-big-data v-if="item.type === 3" :menuData="item.recipe"></menu-big-data>
        <menu-sort-data v-if="item.type === 2" :menuData="item.collectionsort"></menu-sort-data>
      </div>
    </div>
</template>

<script>
  import menuBigData from '../widget/menuBigData.vue';
  import menuSortData from '../widget/menuSortData.vue';

  export default {
    props: {
      list: [] // 数据
    },
    data() {
      return {
        menuList: [], // 数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        lastId: '' // id
      }
    },
    components: {
      menuBigData,
      menuSortData
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() { // 加载数据
        let api = 'https://api.ecook.cn/public/getHomeList.shtml?version=15.4.5';
        if (this.lastId) { // id不为空才添加参数
          api = api + `&id=${this.lastId}`;
        }
        this.$http.get(api) // get请求数据
          .then((response) => { // 响应处理
            let data = response.data.data; // 获取数据
            console.log(data);

            let list = this.filterData(data.list); // 获取列表
            this.menuList = this.menuList.concat(list); // 设置数据
            this.lastId = data.id;

            // 没有更多数据的处理
            if (list.length <= 0) {
              this.noMore = true;
            }
          });
      },
      loadMore() { // 加载更多
        // 数据全部加载完成的话,不再进行加载
        if (this.noMore) {
          return;
        }

        this.busy = true; // 开启无限滚动
        this.$store.commit('UPDATE_LOADING', true); // 开启加载动画
        // 定时器处理(显示加载动画)
        setTimeout(() => {
          this.busy = false; // 关闭无限滚动
          this.$nextTick(() => { // 关闭加载动画(dom渲染完后执行)
            this.$store.commit('UPDATE_LOADING', false); // 关闭加载动画
            this.page++; // 页面+1
            this.loadData(); // 加载数据
          });
        }, 2000);
      },
      filterData(list) { // 过滤视频菜谱
        return list.filter(item => item.type !== 7)
      }
    }
  };
</script>

<style scoped>

  .menu-page {
    overflow-y: scroll;
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: #fafafa;
    flex-direction: column;
  }

  /* 伪类隐藏滚动条 */
  .menu-page::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  .item {
    /*width: 100%;*/
    margin: 15px;
  }
</style>
