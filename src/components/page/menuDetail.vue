<template>
  <div class="menuDetail" v-show="show">
    <!-- 图片 -->
    <img class="wrap detailPic" :src="img" alt=""/>

    <div class="menu-content">

      <!-- 菜式信息 -->
      <div>
        <div class="row title">{{title}}</div>
        <div class="row row-des">{{healthStr}}</div>
        <span class="stuff">用料</span>
        <div class="item item-stuff"
             v-show="materialList.length > 0"
             v-for="(item,index) in materialList" :class="{first:index === 0}">
          <span class="row row-stuff row-name">{{item.name}}</span>
          <span class="row row-stuff row-bur">{{item.dosage}}</span>
        </div>
        <div class="row">{{detail.imtro}}</div>
      </div>

      <!-- 步骤内容数据 -->
      <div class="wrap greenColor grayBg explain">烹饪步骤</div>
      <div class="wrap content " v-for="item in steps">
        <div class="row stepsRow">
          <p style="margin-bottom: 20rpx;">{{item.stepInfo}}</p>
          <div class="stepsPic">
            <img :src="item.imgUrl"/>
          </div>
          <p style="margin-bottom: 1rem;">{{item.details}}</p>
        </div>
      </div>
    </div>

    <!-- 收藏按钮 -->
    <div @click="toggleCollectedState()"
         :class="isCollected ? 'collection-check':'collection-img'">
    </div>
  </div>

</template>

<script>
  import * as storage from '../../common/js/storage';
  export default {
    name: 'menuDetail',
    props: {
      id: {
        type: String
      },
      info: {
        type: Object
      }
    },
    data() {
      return {
        title: '',
        healthStr: '',
        detail: {},
        steps: [],
        materialList: [],
        show: false,
        img: {},
        isCollected: false,
        menuItem: {},
        collectIcon: require('../../assets/menu_collect_true.png'),
        unCollectIcon: require('../../assets/menu_collect_false.png')
      };
    },
    components: {},
    computed: {
      getPic(imageId) {
        const url = `http://pic.ecook.cn/web/${imageId}.jpg!m4`;
        console.log(url);
        return url;
      }
    },
    onLoad(query) {    //微信自带的生命周期
      const id = query.id;
      this.menuItem = JSON.parse(query.info); // 获取菜谱数据   json字符转为对象
      this.isCollected = storage.hasCollected(id);
      this.loadData(id);
      console.log(this.menuItem);
    },
    methods: {
      // 切换菜式收藏的状态
      toggleCollectedState() {
        // 判断是否已经收藏了改菜式
        if (storage.hasCollected(this.menuItem.id)) { // 根据id进行判断
          this.isCollected = false; // 状态置为未收藏
          storage.deleteFromCollectionList(this.menuItem); // 移除收藏记录
          console.log('delete');
        } else { // 未收藏的情况
          this.isCollected = true; // 状态置为已收藏
          storage.addIntoCollectionList(this.menuItem); // 记录收藏数据
          console.log('add');
        }
      },
      loadData(id) { // 加载数据
        let api = `https://api.ecook.cn/public/getRecipeListByIds.shtml?version=15.4.5&ids=${id}`;
        this.$http.get(api) // get获取
          .then((response) => { // 获取数据成功
            console.log(response);
            if (response.status === 200) { // 200表示成功获取数据
              let data = response.data.list[0]; // json数据
              this.title = data.name; // 菜式名
              this.img = this.getImageUrl(data.imageid); // 图片url
              this.healthStr = data.description; // 材料功效
              // this.steps = data.stepList; // 菜式步骤
              this.steps = this.dealWithImage(data.stepList); // 菜式步骤
              this.materialList = data.materialList; // 所需材料
              this.show = true; // 拿到数据才显示

              // 设置标题
              this.setupTitle(data.name);
            }
          })
          .catch((error) => {
            console.warn(error);
          });
      },
      setupTitle(title) {
        wx.setNavigationBarTitle({
          title: title
        });
      },
      dealWithImage(list) {
        for (let i = 0; i < list.length; i++) {
          let data = list[i];
          data.imgUrl = this.getImageUrl(data.imageid);
          data.stepInfo = `步骤 ${data.ordernum + 1}/${list.length}`;
        }
        return list;
      },
      getImageUrl: function (imageId) {
        return `http://pic.ecook.cn/web/${imageId}.jpg!m4`;
      }
    }
  };
</script>


<style scoped>
  .menuDetail {
  }

  .detailPic {
    width: 100vw;
    height: 38vh;
  }

  .menu-content {
    display: flex;
    flex-direction: column;
    padding: 0 20 rpx 0 20 rpx;
  }

  .menu-content span {
    color: #3c4a55;
  }

  menu-content::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  .title {
    width: 80%;
    font-size: 14pt;
    font-weight: bold;
    padding-left: 20rpx;
    margin-top: 20rpx;
  }
  .row-des{
    font-size: 12pt;
    padding-left: 20rpx;
    margin-top: 20rpx;
  }
  .stuff {
    font-weight: bold;
    font-size: 12pt;
    padding-left: 20rpx;
    margin-top: 70rpx;
    margin-bottom: 70rpx;
    display: block;
  }

  .item {
    border-bottom: 1px dashed #c0c0c0;
    background-color: inherit;
  }

  .item-stuff {
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-left:30rpx;
    margin-right:30rpx;
    font-size:10pt;
    line-height:70rpx;

  }

  .row-stuff {
    flex-direction: row;
    display: flex;
    flex: 1;
  }

  .content {
    display: inline-block;
    width: inherit;
    padding-left: 20rpx;
    padding-right: 20rpx;
  }

  .explain {
    padding-left: 20rpx;
    font-weight: bold;
    margin-top: 50rpx;
    margin-bottom: 40rpx;
    font-size: 12pt;
  }

  .stepsPic {
    margin-bottom: 10rpx;
  }

  .stepsPic img {
    border-radius: 10rpx;
    width: 100%;
  }

  .collection-btn {
    position: fixed;
    width: 80 rpx;
    height: 80 rpx;
    bottom: 50 rpx;
    right: 50 rpx;
    padding: 20 rpx;
    z-index: 999;
    background-color: ghostwhite;
    border-radius: 80 rpx;
    box-shadow: 10 rpx 10 rpx 10 rpx #9999;
    border: 1rpx solid #9999;
  }
  .row-bur{
    justify-content: flex-end;
    padding-right: 0px;

  }
  .stepsRow{
    font-size: 10pt;
  }
  .collection-img{
    background: url("../../assets/menu_collect_false.png") no-repeat;
    background-size: 100%;
    position:fixed;
    width:50rpx;
    height:50rpx;
    bottom:30rpx;
    right:30rpx;
    padding:20rpx;
    z-index:999;
    border-radius:50rpx;
    box-shadow:10rpx 10rpx 10rpx #9999;
    border:1rpx solid #9999;
  }

  .collection-check{
    width: 50rpx;
    height: 50rpx;
    background: url("../../assets/menu_collect_true.png") no-repeat;
    position:fixed;
    background-size: 100%;
    bottom:30rpx;
    right:30rpx;
    padding:20rpx;
    z-index:999;
    border-radius:50rpx;
    box-shadow:10rpx 10rpx 10rpx #9999;
    border:1rpx solid #9999;
  }
</style>
