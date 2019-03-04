<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="initInfoSell.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{initInfoSell.name}}</span>
        </div>
        <div
          class="description"
        >{{initInfoSell.description + " / " + initInfoSell.deliveryTime}}分钟送达</div>
        <div class="supports">
          <div class="supports_desc">
            <span class="icon decrease"></span>
            <span class="text">{{initInfoSell.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="support-count" @click="showDetails()">
        <span class="count">{{initInfoSell.supports.length}}个</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{initInfoSell.bulletin}}</span>
      <i class="el-icon-arrow-right" @click="showDetails()"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="initInfoSell.avatar">
    </div>
    <transition name="fade">
        <Pop v-if="detailShow"  @sendShow="hideDetail"></Pop>
    </transition>
  </div>
</template>

<script>
import Pop from './Pop.vue'

export default {
  data() {
    return {
      detailShow: false
    };
  },
  props: {
    initInfoSell: {
      type:Object,
      required: true
    }
  },
  created() {},
  components: {
     Pop 
  },
  methods: {
    showDetails() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  }
};
</script>

<style>
.header {
  height: 138px;
  position: relative;
  background: rgba(7, 17, 27, 0.5);
  color: #fff;
}

.header .content-wrapper {
  position: relative;
  display: flex;
  padding: 24px 12px 18px 24px;
  font-size: 12px;
}

.header .bulletin-wrapper {
  position: relative;
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(7, 17, 27, 0.2);
  font-size: 0.2rem;
}

.header .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
}
.bulletin-title {
  display: inline-block;
  vertical-align: top;
  margin-top: 8px;
  width: 22px;
  height: 12px;
  background-image: url(../assets/gonggao.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bulletin-text {
  font-size: 0.2rem;
  margin: 0 4px;
}
.bulletin-wrapper .el-icon-arrow-right {
  position: absolute;
  right: 10px;
  top: 8px;
}

.header .content-wrapper .content {
  margin-left: 16px;
}
.header .content-wrapper .content .title {
  margin: 0px 0 7px 0;
  font-size: 16px;
}
.header .content-wrapper .content .description {
  font-size: 12px;
  margin-bottom: 6px;
}

.header .content-wrapper .support-count {
  position: absolute;
  right: 12px;
  bottom: 18px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
