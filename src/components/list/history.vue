<template>
  <div>
    <menu-array :menu-list="historyList"/>
  </div>
</template>

<script>
  import menuArray from './menuList';
  import {getHistoryList} from '../../common/js/storage';

  export default {
    props: {
      menuList: {
        type: Object
      }
    },
    components: {
      menuArray
    },
    data() {
      return {
        historyList: getHistoryList()
      };
    }
  };
</script>
