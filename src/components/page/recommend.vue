<template>
  <div>
    <!-- title -->
    <title-bar :title="title"></title-bar>

    <div class="page"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="2">

      <!-- 列表数据 -->
      <div class="page-container">
        <div class="menu-item"
             v-show="menuList.length > 0"
             v-for="item in menuList">
          <menuRow :menuData="item"></menuRow>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import menuRow from '../widget/menuRow.vue';
  import titleBar from '../widget/titleBar.vue';

  export default {
    name: 'recommend',
    data() {
      return {
        menuList: [], // 右列数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0, // 起始页面
        lastId: 0,
        type: 'latest',
        title: '菜谱推荐'
      };
    },
    components: {
      menuRow,
      titleBar
    },
    onLoad(query) {
      this.title = query.title;
      let type = query.type;
      if (type) {
        this.type = type;
      }
      this.loadData(0);
    },
    onReachBottom() {
      this.loadMore();
      console.log("onReachBottom");
    },
    methods: {
      loadData(id) { // 加载数据
        let api = `https://api.ecook.cn/public/getRecipeListByType.shtml?version=15.4.5&id=${id}&type=${this.type}`;
        this.$http.get(api) // get请求数据
          .then((response) => { // 响应处理
            let data = response.data.list; // 获取数据列表
            this.menuList = this.menuList.concat(data); // 设置数据
            this.lastId = this.menuList[this.menuList.length - 1].id;
            console.log(data);
            console.log(this.lastId);

            // 没有更多数据的处理
            if (data.length <= 0) {
              this.noMore = true;
            }
          }).catch((error) => {
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
            this.loadData(this.lastId); // 加载数据
          });
        }, 2000);
      }
    }
  };
</script>

<style scoped>
  .page {
    height: 100vh;
  }

  .page-container {
    width: 97vw;
    margin-left: 1.36vw;
  }

  .menu-item {
    padding-top: 10px;
    background-color: rgba(250, 250, 250, 0.80);
  }

  .page-container::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
</style>
