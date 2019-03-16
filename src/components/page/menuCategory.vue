<template>
  <div class="page-div">

    <!-- 列表数据 -->
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
  // import vBackBar from '../widget/backbar.vue';

  export default {
    data() {
      return {
        categoryId: '',
        categoryName: '',
        menuList: [], // 列表数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0 // 起始页面
      };
    },
    components: {
      menuRow,
      // vBackBar
    },
/*    onLoad(query) { // 小程序生命周期
      this.categoryId = query.id; // 从url路径参数中获取id
      this.categoryName = query.name; // 从url路径参数中获取name
      this.setupTitle(this.categoryName);
    },*/
    mounted() {
      this.categoryId = this.$root.$mp.query.id; // 从url路径参数中获取id
      this.categoryName = this.$root.$mp.query.name; // 从url路径参数中获取name
      this.setupTitle(this.categoryName);
      this.loadData(this.categoryId);
    },
    onReachBottom() {
      this.loadMore();
      console.log("onReachBottom");
    },
    methods: {
      loadData() { // 加载数据
        let api = `https://api.ecook.cn/public/getContentsBySubClassid.shtml?version=15.4.5&id=${this.categoryId}&page=${this.page}`;
        console.log(api);
        this.$http.get(api) // get请求数据
          .then((response) => { // 响应处理
            let data = response.data.list; // 获取数据列表
            this.menuList = this.menuList.concat(data); // 设置数据
            console.log(data);

            // 没有更多数据的处理
            if (data.length <= 0) {
              this.noMore = true;
            }
          });
      },
      loadMore() { // 加载更多数据
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
        }, 1000);
      },
      setupTitle(title) {
        wx.setNavigationBarTitle({
          title: title
        });
      }
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

</style>
