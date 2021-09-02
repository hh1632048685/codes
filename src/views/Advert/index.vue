<template>
  <div class="advert">
    <!-- 1.左侧 tree树状图 -->
    <AdvertTree class="advert-left" />
    <!-- 2.右侧，内容 -->
    <AdvertContent class="advert-content" />
  </div>
</template>

<script>
import AdvertContent from "./AdvertContent";
import AdvertTree from "./AdvertTree";
export default {
  components: {
    AdvertContent,
    AdvertTree,
    
  },
  methods:{
  
  }
};
</script>

<style lang='scss' scope>
.advert {
  margin: 20px;
}
.advert-left {
  width: 350px;
  float: left;
}
.advert-content {
  float: left;
}
</style>