<template>
  <div class="whole">
    <div class="page-header">
      <div class="page-logo">
        <img :src="searchLogo">
      </div>
      <search-bar></search-bar>
    </div>
    <div class="page">
      <!-- 加载动画 -->
      <loading :show="loadingShow"></loading>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div class="page-foot">
      <v-tabs></v-tabs>
    </div>
  </div>
</template>

<script>
  import loading from './components/widget/loading.vue';
  import vTabs from './components/widget/tabs.vue';
  import searchBar from './components/widget/searchbar';
  import {mapState} from 'vuex';

  export default {
    components: {
      loading,
      vTabs,
      searchBar
    },
    created() {
      // 调用API从本地缓存中获取数据
      /*
       * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
       * 微信：mpvue === wx, mpvuePlatform === 'wx'
       * 头条：mpvue === tt, mpvuePlatform === 'tt'
       * 百度：mpvue === swan, mpvuePlatform === 'swan'
       * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
       */

      let logs;
      if (mpvuePlatform === 'my') {
        logs = mpvue.getStorageSync({key: 'logs'}).data || [];
        logs.unshift(Date.now());
        mpvue.setStorageSync({
          key: 'logs',
          data: logs
        })
      } else {
        logs = mpvue.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        mpvue.setStorageSync('logs', logs)
      }
    },
    log() {
      console.log(`log at:${Date.now()}`)
    },
    // 数据
    data() {
      return {
        logoSrc: require('./assets/logo_home.png'),
        firstShow: true,
        show: false,
        searchLogo: require('./assets/logo_search.png')
      };
    },
    // 计算属性
    computed: {
      ...mapState([
        'loadingShow'
      ])
    },
    // 方法
    methods: {
      // 是否显示加载view
      isShow() {
        this.show = !this.show;
      }
    }
  };
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  .logo {
    width: 100px;
    height: 50px;
    align-self: center;
  }

  .whole {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .page-header {
    display: flex;
    flex-direction: row;
    height: 8vh;
    background-color: orange;
    justify-content: center;
    align-items: center;

  }

  .page-foot {
    display: flex;
    flex-direction: row;
  }

  .content {
    height: 100%;
    width: 100%;
    display: flex;
  }

  #app {
    color: #2c3e50;
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  #app .show {
    transform: translateX(250px);
  }

  .page {
    overflow-y: scroll;
    height: 86vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .page::-webkit-scrollbar {
    width: 0 !important
  }

  .router-container {
    background-color: #f9f9f9;
    padding-bottom: 50px;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
  }

  .page-logo {
    height: 6vh;
    width: 24%;
  }

  .page-logo img {
    width: 70px;
  }
</style>
