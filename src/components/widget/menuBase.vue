<template>
  <div></div>
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
      this.menuData.userAvatarUrl = this.getAvatarUrl(this.menuData.user.imageid);
    },
    methods: {
      gotoMenuDetail() {
        addIntoHistoryList(this.menuData); //添加到历史列表
        const id = this.menuData.id;
        const info = JSON.stringify(this.menuData);
        const url = `/pages/detail/main?id=${id}&info=${info}`;
        wx.navigateTo({url});
      },
      getImageUrl: function (imageId) {
        // return `http://pic.ecook.cn/web/${imageId}.jpg!s2`;
        return `http://pic.ecook.cn/web/${imageId}.jpg!m4`;
      },
      getAvatarUrl: function (imageId) {
        return `http://pic.ecook.cn/web/${imageId}.jpg!s1`;
      },
      addIntoHistory(menuArr) { // 添加至数组
        addIntoHistoryList(menuArr);
      }
    }
  };
</script>

<style>
  .text-overflow-hide {
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
