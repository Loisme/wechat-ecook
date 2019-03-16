<template>
  <div>
    <menu-array :menu-list="collectionList"/>
  </div>
</template>

<script>
  import menuArray from './menuList';
  import {getCollectionList} from '../../common/js/storage';

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
        collectionList: getCollectionList()
      };
    }
  };
</script>
