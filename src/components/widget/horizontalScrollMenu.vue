<template>
  <div class="page-wrapper" >
    <div class="page-content" ref="content">
      <div class="page-item"
           ref="item"
           v-bind:style="{width: itemWidth}"
           v-for="item in list">
        <menu-pic v-if="isPic" :menuData="item"></menu-pic>
        <menu-data v-else :menuData="item"></menu-data>
      </div>
    </div>
  </div>
</template>

<script>
  // import BScroll from 'better-scroll';
  import menuPic from '../widget/menuPic.vue';
  import menuData from '../widget/menuData.vue';

  export default {
    name: "horizontalScrollMenu",
    props: {
      itemWidth: {
        type: String
      },
      isPic: {
        type: Boolean
      },
      list: {
        type: Array
      }
    },
    components: {
      menuPic,
      menuData
    },
    created() {
      this.$nextTick(() => {
        this.initTabScroll();
      });
    },
    methods: {
      initTabScroll() {
/*        let width = 0;
        for (let i = 0; i < this.list.length; i++) {
          width += this.$refs.item[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
        }
        this.$refs.content.style.width = width + 'px';
        console.log('initTabScroll');
        console.log(this.list);
        console.log(width);
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh()
          }
        });*/
      }
    }
  }
</script>

<style scoped>
  .page-wrapper {
    width: 100vw;
    overflow: scroll;
  }

  /* 伪类隐藏滚动条 */
  .page-wrapper::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  .page-content {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    padding: 10px 15px;
  }

  .page-item {
    width: 60vw;
    flex: 0 0 auto;
    height: auto;
    padding-right: 15px;
  }

</style>
