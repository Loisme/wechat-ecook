<template>
  <div @click="gotoMenuDetail">
      <div class="menuRow">
        <img class="img-card" :src="menuData.imgUrl"/>
        <div class="info">
          <div class="title text-overflow-hide">{{menuData.name}}</div>
          <div class="desc text-overflow-hide" v-show="menuData.description.length > 0">{{menuData.description}}</div>
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
    extends: menuBase
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
    font-size: 13pt;
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
    font-size: 11pt;
    margin-left: 10px;
    color: #c0c0c0;
  }
</style>
