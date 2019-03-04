<template>
  <div id="app">
    <Top :initInfoSell="initInfo.seller" v-if="initInfo.seller"/>
    <div v-if="initInfo.seller"><!-- 这里写initInfo无效，因为本来就有,也可以在子组件用watch来避免 -->
      <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal" active-text-color="#f01414">
        <el-menu-item index="/goods" >商品</el-menu-item>
        <el-menu-item index="/reviews">评论</el-menu-item> 
        <el-menu-item index="/shops" >商家</el-menu-item>    
      </el-menu>
      <keep-alive>
        <router-view :initInfo="initInfo"></router-view>
      </keep-alive>
    </div>  
  </div>
</template>



<script>
import { Top, Bottom } from "./view";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Top,
    Bottom
  },
  computed: {
    ...mapGetters(["initInfo"])
  },
  mounted() {
    this.$store.dispatch("getInitInfo" /* , "1" */);
  },
  methods: {
    ...mapActions(["getInitInfo"]) //dispatch代替
  }
};
</script>
<style src="./style.css"></style>

