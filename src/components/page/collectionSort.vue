<template>
  <!-- 包裹一层div,防止连续加载-->
  <div class="page-content">
    <!-- 顶部bar -->
    <div class="header">
      <div class="iconfont icon-fanhui" @click="back"></div>
      <div class="title">{{details.name}}</div>
    </div>

    <!-- 列表数据 -->
    <div class="menu-page">
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
    name: 'collectionSort',
    data() {
      return {
        details: {}, // 详细数据
        menuList: [], // 菜谱列表
        name: ''
      };
    },
    components: {
      menuBigData
    },
    onLoad(query) {
      let id = query.id;
      this.loadData(id);
    },
    methods: {
      loadData(id) { // 加载数据
        let api = `https://api.ecook.cn/public/getCollectionSortDetailById.shtml`;
        let body = `machine=3be1dc70dd5acab297c9e33596920275&version=15.4.5&terminal=2&device=Lenovo+K30-TM&id=${id}&appid=cn.ecook`;
        this.$http.post(api, body) // get请求数据
          .then((response) => { // 响应处理
            this.details =response.data.details;
            this.menuList = this.details.recipeList;
            console.log(this.details);
          });
      },
      back() { // 返回上一页
        window.history.back();
        return false;
      }
    }
  }
</script>

<style scoped>

  .page-content {
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    width: 100vw;
    padding: 1.5rem 15px;
    background-color: white;
  }

  .title {
    flex: 1;
    text-align: center;
    font-size: 14pt;
    color: black;
  }

  .menu-page {
    flex: 1;
    width: 100vw;
    overflow-y: scroll;
    background-color: #fafafa;
  }

  /* 伪类隐藏滚动条 */
  .menu-page::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  .item {
    margin: 15px;
  }
</style>
