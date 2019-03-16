<template>
  <div class="option-content">
    <div class="option-wrap">
      <!-- 左侧导航栏 -->
      <div class="option-left">
        <a v-for="(item,index) in categories" :key="item.id" @click="goto(index)"
           :class="{selected: index === nowIndex}">{{item.name}}
        </a>
      </div>
      <!-- 标题 -->
      <div class="option-right">
        <div class="option-style">
          <div class="option-line">
            <div class="option-circle"></div>
          </div>
          <div class="option-title"><span>{{categories[nowIndex].name}}</span></div>
          <div class="option-line">
            <div class="option-circle2"></div>
          </div>
        </div>

        <!-- 子列表 -->
        <div class="op-content">
          <div class="list-div">
            <div class="title-div" v-for="(item,index) in categories[nowIndex].list" :key="item.id"
                 @click="gotoSubCategory(index)">
              <div class="title-img"><img :src="item.imgUrl"/></div>  <!--只能传属性，不能调用方法-->
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        categories: [], // 分类列表
        nowIndex: 0 // 当前索引值
      };
    },
    methods: {
      // 左侧导航栏切换
      goto(index) {
        this.nowIndex = index;
      },
      // 跳转到指定的菜谱分类页面
      gotoSubCategory(index) {
        let subCategory = this.getSubCategory()[index];
        const id = subCategory.id;
        const name = subCategory.name;
        const url = `/pages/menuList/main?id=${id}&name=${name}`;
        wx.navigateTo({ url });
      },
      // 获取子分类数据
      getSubCategory() {
        return this.categories[this.nowIndex].list;
      },
      // 获取菜谱类别的数据
      getCategory() {
        let url = 'https://api.ecook.cn/public/getRecipeHomeData.shtml'; // api
        this.$http.get(url)
          .then((response) => {
            // this.categories = response.data.list;
            this.categories = this.dealWithImage(response.data.list);
            console.log(this.categories);
          });
      },
      dealWithImage(categories) {
        for (let i = 0; i < categories.length; i++) {
          let subCategories = categories[i].list;
          for (let j = 0; j < subCategories.length;j++) {
            let data = subCategories[j];
            data.imgUrl = this.getImageUrl(data.icon);
          }
        }
        return categories;
      },
      getImageUrl: function (imageId) {
        return `http://pic.ecook.cn/web/${imageId}.jpg!s1`;  /*拼接图片url*/
      },
    },
    // 组件创建时候调用
    created() {
      this.getCategory();
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .option-content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .option-wrap {
    display: flex;
    flex-direction: row;
    flex: 1;
    background-color: whitesmoke;
    overflow: hidden;
  }

  .option-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: white;
    font-size: 12pt;
  }

  .option-right {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    flex: 3;
    padding-left: 2.36vw;
    padding-right: 2.36vw;
    margin-bottom: 1.36vh;
  }

  .option-left a {
    display: flex;
    line-height: 3vh;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: black;
  }

  .selected {
    color: orange;
    border-left: 2px solid orange;
    background-color: whitesmoke;
  }

  .option-style {
    display: flex;
    flex-direction: row;
    margin-top: 2.36vh;
    margin-right: 3.36vw;
    margin-left: 3.36vw;
  }

  .option-title {
    display: flex;
    flex-direction: column;
    flex: 1;
    color: orange;
    font-size: 12pt;

  }

  .option-title span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .option-line {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #ccc;
    height: 1px;
    margin-top: 1.36vh;
    position: relative;
  }

  .option-circle {
    position: absolute;
    width: 4px;
    height: 4px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    background-color: orange;
    bottom: -1px;
    right: 3px;
  }

  .option-circle2 {
    position: absolute;
    width: 4px;
    height: 4px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    background-color: orange;
    bottom: -1px;
    left: 3px;
  }

  .op-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1.36vh;
  }

  .content-list {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 4vh;
    margin-top: 1.36vh;
    margin-bottom: 0.36vh;
    flex-wrap: wrap;
    align-items: center;
  }

  .content-list a {
    /*flex: 0 0 25%;*/
    text-align: center;
    border: 1px solid grey;
    background-color: white;
    border-radius: 20px;
    margin: 5px 5px 0 0;
    font-size: 8pt;
    width: 25%;
    padding: 5px;
  }

  ::-webkit-scrollbar {
    width: 0;
  }
  .list-div{
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    border-radius: 10px;
    margin-left: 3.36vw;
    margin-right: 3.36vw;
    padding-top: 2.36vh;
    padding-bottom: 4.36vh;
    flex-wrap: wrap;
  }
  .title-div{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-bottom: 2.36vh;

  }
  .title-div p{
    text-align: center;
    display: block;
    font-size: 10pt;
  }

  .title-img img{
    width: 50%;
    height: 130rpx;
  }
  .title-img{
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
