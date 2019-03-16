<template>
  <!-- 包裹一层div,防止连续加载-->
  <div>
    <!-- 顶部bar -->
    <div class="header">
      <div class="iconfont icon-fanhui" @click="back"></div>
      <div class="title">{{name}}</div>
    </div>

    <div class="menu-page"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="2">

      <!-- 列表数据 -->
      <div class="item"
           v-show="menuList.length > 0"
           v-for="item in menuList">
        <menu-big-data :menuData="item"></menu-big-data>
      </div>
    </div>

  </div>

</template>

<script>
  import menuBigData from '../widget/menuBigData.vue';

  export default {
    data() {
      return {
        menuList: [], // 右列数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0, // 起始页面
        id: 0,
        name: ''
      };
    },
    components: {
      menuBigData
    },
    onLoad(query) {
      this.id = query.id; // 从url路径参数中获取id
      this.loadData();
    },
    onReachBottom() {
      this.loadMore();
      console.log("onReachBottom");
    },
    methods: {
      loadData() { // 加载数据
        let api = `https://api.ecook.cn/public/getContentsBySubClassid.shtml?version=15.4.5&id=${this.id}&page=${this.page}`;
        this.$http.get(api) // get请求数据
          .then((response) => { // 响应处理
            this.name =response.data.name;
            let data = response.data.list; // 获取数据列表
            this.menuList = this.menuList.concat(data); // 设置数据
            console.log(data);

            // 没有更多数据的处理
            if (data.length <= 0) {
              this.noMore = true;
            }
          })
          .catch((error) => {
            console.warn(error);
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
      back() { // 返回上一页
        window.history.back();
        return false;
      }
    }
  };
</script>

<style scoped>
  .header {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 8vh;
    width: 100vw;
  }

  .title {
    width: 90%;
    text-align: center;
    font-size: 14pt;
    color: black;
  }

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
