<template>
  <div class="sw">
    <!-- tab切换栏 -->
    <div class="sw-tab">
      <ul>
        <li class="tabs-title" @click="toggleTab('history')"><a
          :class="currentTab ==='history'? 'red-class':'default-class'">历史</a></li>
        <li class="tabs-title" @click="toggleTab('collection')"><a
          :class="currentTab !=='history'? 'red-class':'default-class'">收藏</a></li>
      </ul>
    </div>


    <!-- 数据内容 -->
    <div class="sw-content">
      <history v-if="currentTab ==='history'"></history>
      <collection v-else></collection>
        <!-- is 特性动态绑定子组件, 让多个组件可以使用同一个挂载点，并动态切换 -->
        <!--<div :is="currentTab"></div>-->
    </div>

  </div>
</template>

<script>
  import history from '../list/history';
  import collection from '../list/collection';

  export default {
    name: 'my',
    data() {
      return {
        currentTab: 'history'  // currentTab 用于标识当前触发的子组件
      };
    },
    components: {  // 声明子组件
      history, // 历史
      collection // 收藏
    },
    methods: {
      toggleTab: function (tab) {
        this.currentTab = tab;  // tab 为当前触发标签页的组件名
      }
    }
  };
</script>

<style scoped>
  .default-class {
    color: black;
    display: block;
    padding-bottom: 4px;
    border-bottom: 2px solid transparent;
  }

  .red-class {
    color: orange;
    display: block;
    border-bottom: 2px solid orange;
    padding-bottom: 4px;
  }

  .sw {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    height:100vh;
  }

  .sw-tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 8vh;
    background-color: #ffffff;
  }

  ul {
    display: flex;
    width: 100%;
    height: 100%;
  }

  ul li {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .active {
    color: red;
  }

  .router-link-active,
  .router-link-exact-active {
    color: red;
  }

  .sw-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
  }
  .sw-content::-webkit-scrollbar{
    width: 0 !important;
    height: 0 !important;
  }
</style>
