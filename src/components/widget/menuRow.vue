<template>
  <div>
    <div class="menuRow" @click="gotoMenuDetail">
      <img class="img-card" :src="menuData.imgUrl"/>
      <div class="content">
        <div class="name text-wrapper">{{menuData.name}}</div>
        <div class="desc text-wrapper">{{ menuData.description}}</div>
        <div class="browse-info">
          <div class="favorite-count">{{ menuData.infos.collectionCount }}人收藏</div>
          <div class="favorite-like">{{ menuData.infos.likeCount }}人点赞</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addIntoHistoryList} from '../../common/js/storage';

  export default {
    name: 'menuRow',
    props: {
      menuData: {
        type: Object
      }
    },
    created() {
      this.menuData.imgUrl = this.getImageUrl(this.menuData.imageid);
    },
    methods: {
      gotoMenuDetail(){
        addIntoHistoryList(this.menuData);
        const id = this.menuData.id;
        const info = JSON.stringify(this.menuData);  //转成json字符串
        const url = `/pages/detail/main?id=${id}&info=${info}`;  //路由
        wx.navigateTo({ url });  //执行跳转操作
      },
      getImageUrl: function (imageId) {
        return `http://pic.ecook.cn/web/${imageId}.jpg!s2`;
      },
      addIntoHistory(menuData) { // 添加浏览记录
        addIntoHistoryList(menuData);
      }
    }
  };
</script>

<style scoped>

  .menuRow {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #dddddd;
    border: 1px solid #dddddd;
  }

  .img-card {
    height: 196rpx;
    max-width: 30%;
    max-height: 100%;
    border-radius: 5px 0 0 5px;
  }

  .content {
    display: flex;
    flex-direction: column;
    display: -webkit-flex;
    width: 100%;
    padding: 0 10px;
    overflow: hidden;
  }

  .name {
    flex: 1;
    align-self: flex-start;
    padding-top: 5px;
    font-size: 12pt;
    color: black;
  }

  .desc {
    flex: 2;
    padding-top: 10px;
    padding-bottom: 10px;
    color: gray;
    font-size: 10pt;
    overflow: hidden;
    text-overflow: ellipsis;
    /*white-space: nowrap;*/
  }

  .text-wrapper {
    width: 500rpx;
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }

  .browse-info {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    margin-right: 20px;
    padding-bottom: 5px;
    color: gray;
  }

  .favorite-count {
    font-size: 10pt;
  }

  .favorite-like {
    font-size: 10pt;
    margin-left: 10px;
  }
  .page-div{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
</style>
