<template>
  <div class="popHearder">  
      <div class="detail">
        <div class="detail-wrapper">
            <div class="detail-main">
              <div class="name">{{initInfo.seller.name}}</div>
              <div class="star-wrapper">
                <!-- <star :size="48" :score="initInfoSell.score"></star> -->
              </div>
              <div class="title">
                <div class="line"> </div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="initInfo.seller.supports" class="supports">
                <li class="support-item" v-for="item in initInfo.seller.supports" :key="item.type">
                  <span class="supports-icon"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"> </div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">{{initInfo.seller.bulletin}}</div>
            </div>
            <div class="detail-close">
                <i class="el-icon-close" @click="hideDetail()"></i>
            </div>
        </div>      
      </div>   
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
        
    }
  },
  computed:{
    ...mapGetters(['initInfo'])
  },
  props: {
  /*   detailShow: {
      type: Object,
      required: true
    } */
  },
  created() {
    
  },
  components: {
    /* star */
  }, 
  methods: { 
    hideDetail() {
        debugger
       this.$emit('sendShow');
    }
  }
};
</script>

<style>
.popHearder{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(7,17,27,0.8);
}
.popHearder .detail {
  height: 100%;
}
.popHearder .name {
     text-align: center;

}
.popHearder .detail-wrapper {
    min-height: 100%;
    width: 100%;
    font-size: 0.3rem;
    padding-top: 64px;
    box-sizing: border-box;
}

.popHearder .detail .detail-wrapper .detail-main .title {
    display: flex;
    width: 80%;
    margin: 0 auto 26px auto;
    font-size: 0.25rem;
    margin-top: 10px;
}

.popHearder .detail .detail-wrapper .detail-main .title .line {
    display: inline-block;
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.2);
    margin: auto;
}

.popHearder .detail .detail-wrapper .detail-main .supports {
    padding: 0 0 28px 36px;
    list-style: none;
    font-size: 0.25rem;
}

.popHearder .detail .detail-wrapper .detail-main .supports .support-item {
    color: #fff;
    padding: 0 6px 12px 16px;
}

.popHearder .detail .detail-wrapper .detail-main .supports .supports-icon {
    display: inline-block;
    /* vertical-align: top; */
    width: 16px;
    height: 16px;
    margin-right: 10px;
    background-image: url(../assets/ico.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    top: 2px;
}

.popHearder .detail .detail-wrapper .detail-main .bulletin {
    padding: 0 48px;
    font-size: 0.2rem;
    font-weight: 200;
    color: #fff;
    line-height: 24px;
}

.popHearder .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: 20px auto 0 auto;
    clear: both;
    font-size: 32px;
    color: rgba(255,255,255,0.5);
}

 
</style>
