<template>
  <div @click="gotoMenuSort">
    <div class="menuRow">
      <div class="cover">
        <div class="menu-count">共{{menuData.recipeCount}}道菜</div>
        <img class="img-card" :src="menuData.imgUrl"/>
      </div>
      <div class="info">
        <div class="title text-overflow-hide">{{menuData.name}}</div>
        <div class="user">
          <img class="avatar" :src="menuData.userAvatarUrl"/>
          <div class="name">{{menuData.user.nickname}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import menuBase from './menuBase';

  export default {
    name: 'menuBigData',
    extends: menuBase,
    methods: {
      gotoMenuSort: function () {
        const url = `/pages/collectionSort/main?id=${this.menuData.id}`;
        wx.navigateTo({ url });
        // TODO 集合列表
        // this.$router.push({name: 'collectionSort', query: {id: this.menuData.id}});
      },
      getMenuSize() {
        return this.menuData.recipeList.length;
      }
    }
  };
</script>

<style scoped>
  .menuRow {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #dddddd;
    border: 1px solid #dddddd;
  }

  .cover {
    position: relative;
  }

  .menu-count {
    position: absolute;
    right: 0;
    margin-right: 10px;
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    background-color: rgba(100, 100, 100, 0.5);
    color: white;
  }

  .img-card {
    width: 100%;
    height: 30vh;
    border-radius: 5px 5px 0 0;
  }

  .info {
    padding: 10px;
  }

  .title {
    width: 100%;
    font-size: 14pt;
    font-weight: bold;
    color: black;
  }

  .desc {
    width: 100%;
    margin-top: 15px;
    font-size: 14pt;
    color: black;
  }

  .user {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }

  .name {
    width: 100%;
    font-size: 12pt;
    margin-left: 10px;
  }
</style>
