<template>
  <div>
    <div class="navbar">
      <block v-for="(item,index) in tabs" :key="index">
        <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
          <div class="navbar_title">{{item.name}}</div>
        </div>
      </block>
      <div class="navbar_slider" :class="navbarSliderClass"></div>
    </div>
    <swiper class="content" :duration="50" :style="'height:'+contentHeight" @change="swiperChange" :current="currentTab" @animationfinish="onAnimationfinish">
      <swiper-item  v-for="(item,index) in tabs" :key="index">
        <div>{{item.name}}</div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
    export default {
        name: "tabBar",
      data() {
        return {
          tabs: [
            {
              name: "历史",
              type: "1",
              checked: true
            },
            {
              name: "收藏",
              type: "2",
              checked: true
            },
            {
              name: "其他",
              type: "3",
              checked: true
            }
          ],
          activeIndex: 0,
          currentTab: 0,
          winWidth: 0,
          winHeight: 0,
        };
      },
      computed: {
        navbarSliderClass() {
          if (this.activeIndex == 0) {
            return "navbar_slider_0";
          }
          if (this.activeIndex == 1) {
            return "navbar_slider_1";
          }
          if (this.activeIndex == 2) {
            return "navbar_slider_2";
          }
        },
        contentHeight() {
          return this.winHeight + "px";
        }
      },
      methods: {
        tabClick(e) {
          this.activeIndex = e.currentTarget.id;
          this.currentTab =this.activeIndex;
        },
        swiperChange(e) {
          this.currentTab = e.mp.detail.current;
          this.activeIndex = this.currentTab;
        },
        onAnimationfinish() {
          console.log("滑动完成.....")
        }
      },
      onLoad() {
        var res = wx.getSystemInfoSync();
        this.winWidth = res.windowWidth;
        this.winHeight = res.windowHeight;
      }
    }
</script>

<style scoped>
  .content {
    box-sizing: border-box;
    height: 100%;
    padding-top: 50px;
    /* overflow: auto; */
    -webkit-overflow-scrolling: touch;
  }

  .swiper-item {
    height: 100%;
    text-align: center;
  }

  .navbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 500;
    top: 0;
    height: 50px;
    width: 100%;
    background-color: #298de5;
    border-bottom: 1rpx solid #ccc;
  }

  .navbar_item {
    position: relative;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 13px 0;
    text-align: center;
    font-size: 0;
  }

  .navbar_item .navbar_item_on {
    color: white;
  }

  .navbar_title {
    color: white;
    font-weight: 500;
    display: inline-block;
    font-size: 15px;
    max-width: 8em;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  .navbar_slider {
    position: absolute;
    content: " ";
    left: 0;
    bottom: 0;
    width: 6em;
    height: 3px;
    background-color: white;
    -webkit-transition: -webkit-transform 0.1s;
    transition: -webkit-transform 0.1s;
    transition: transform 0.1s;
    transition: transform 0.1s, -webkit-transform 0.1s;
  }

  .navbar_slider_0 {
    left: 29rpx;
    transform: translateX(0);
  }

  .navbar_slider_1 {
    left: 29rpx;
    transform: translateX(250rpx);
  }

  .navbar_slider_2 {
    left: 29rpx;
    transform: translateX(500rpx);
  }
  .controls {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    z-index: 8888;
    top: 80;
    height: 50px;
    width: 100%;
    background-color: #298de5;
  }
</style>
