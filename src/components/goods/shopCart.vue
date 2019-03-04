<template lang="html">
  <div class="shopCart">
    <div class="shopCart-wrapper">
        <div class="content">
            <div class="content-left" @click="listToggle">
                <div class="logo-wrapper">
                    <div class="badge" v-show="totalCount">
                        {{totalCount}}
                    </div>
                    <div class="logo" :class="{'active':totalPrice}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="price" :class="{'active':totalPrice}">
                    ￥{{totalPrice}}
                </div>
                <div class="desc">
                    另需要配送费￥{{deliveryPrice}}元
                </div>
            </div>
            <div class="content-right" :class="{'enough':totalPrice>=minPrice}" @click="pay($event)">
                    {{payDesc}}
            </div>
        </div>    
        <transition name="transHeight" >
            <div class="shopcart-list" v-show="listShow && selectFoods.length>0" ref="shopcartList">
                <div class="list-header">
                <div class="title">购物车</div>
                <span class="empty" @click="setEmpty()">清空</span>
                </div>
                <div class="list-content" ref="foodlist">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                        <span>￥{{food.price * food.count}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <Cartcontrol :food="food"></Cartcontrol>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        </transition>
    </div>
    <div class="backdrop" v-show="listShow && selectFoods.length>0 "></div>
  </div>
</template>

<script>
import Cartcontrol from "./cartcontrol.vue";
/* import backdrop from "components/backdrop/backdrop"; */
import BScroll from "better-scroll";
import 'velocity-animate';


export default {
  props: {
    selectFoods: {
      type: Array,
      default: []
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {  
      listShow: false
    };
  },
  created() {
    this.$on("cart.add", this.drop); 
  },
  computed: {
    showBackdrop() {
      if (this.listShow && this.totalPrice) {
        return true;
      }
      this.listShow = false;
      return false;
    },
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        if (food.count) {
          total += food.price * food.count;
        }
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    leftAmount() {
      if (this.minPrice - this.totalPrice > 0 && totalPrice) {
        return true;
      }
      return false;
    },
    payDesc() {
      let diff = this.minPrice - this.totalPrice;
      if (!this.totalPrice) {
        return `￥${this.totalPrice}起送`;
      } else if (diff > 0) {
        return `还差￥${diff}元`;
      } else {
        return "去结算";
      }
    }
  },
  methods: {
      
    pay(event) {
        swal({
            title: "没错!",
            text: "别吃外卖了,您吃得起吗？",
            type: "error",
            confirmButtonText: "确认"
        }); 
    },
    setEmpty() {
      this.selectFoods.forEach(food => {
         food.count = 0;
      });
     this.listShow= false;
    },
    hideBackdrop() {
      this.listShow = false;
    },
    listToggle() {
      if (!this.selectFoods.length) {
        return;
      }
      this.listShow = !this.listShow;
     /*  if (this.listShow) {
        this.$nextTick(() => {
          if (!this.foodlistScroll) {
            this._initScroll();
          } else {
            this.foodlistScroll.refresh();
          }
        });
      } */
    } 
  },
  mounted(){
    this.$nextTick(()=>{//这里虽然不需要滚动效果，但是用了组件cartcontrol，里面判定了是啥类型的单击事件
        this.shopcartListScroll = new BScroll(this.$refs.shopcartList, {
            click: true/* 阻止浏览器的原生 click 事件，better-scroll 会派发一个 click 事件 */
        });
    })         
  },
  components: {
    Cartcontrol
    /* backdrop */
  }
};
</script>

<style scoped>
.shopCart-wrapper {
  display: inline-block;
  position: fixed;
  width: 100%;
  height: 50px;
  left: 0px;
  bottom: 0;
  background-color: #141d27;
  color: #fff;
  z-index: 50; 

}
.shopCart .logo-wrapper {
  display: inline-block;
  position: relative;
  height: 56px;
  line-height: 56px;
  border-radius: 50%;
  width: 56px;
  top: -10px;
  background: #141d27;
  margin: 0 12px;
  padding: 6px;
  box-sizing: border-box;
  text-align: center;
}
.shopCart .logo-wrapper .logo {
  width: 100%;
  height: 100%; /* heighe:100%的高度，在文档流中，就等于父元素的content的高度 */
  border-radius: 50%;
  font-size: 24px;
  color: #80858a;
  line-height: 44px;
  font-weight: 700;
  background: #6d747b url("../../assets/fonts/offActive.png") no-repeat;
  background-size: 60%;
  background-position: 40% 50%;
}
.shopCart .logo-wrapper .active {
  background: #00a0dc url("../../assets/fonts/active.png") no-repeat;
  background-size: 60%;
  background-position: 40% 50%;
}
.shopCart .logo-wrapper .badge {
  position: absolute;
  right: 0;
  top: 0;
  background: #f01414;
  color: #fff;
  width: 24px;
  height: 16px;
  line-height: 16px;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
}

.shopCart .content {
    display: flex;
    background: #141d27;
}
.shopCart .content-left{
    flex: 1;
    height: 50px;
}
.shopCart .content-left .price {
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    margin-top: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    line-height: 24px;
    border-right: 1px solid rgba(255,255,255,0.1);
}
.shopCart .content-left .desc {
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    font-size: 10px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    line-height: 24px;
}
.shopCart .content-right {
    font-size: 12px;
    font-weight: 700;
    background: #2b343c;
    color: rgba(255,255,255,0.4);
    line-height: 50px;
    text-align: center;
    flex: 0 0 105px;
}
.shopCart .enough {
    background: #00b43c;
    color: #fff;
}
.shopCart .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    transform:translate(0,-95%);
    z-index: -1;
}
.shopCart .shopcart-list .list-header{
    height: 40px;
    line-height: 40px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    position: relative;
}
.shopCart .shopcart-list .list-header .title{
    display: inline-block;
    font-size: 14px;
    font-weight: 200;
    color: #07111b;
    padding-left: 18px;
}
.shopCart .shopcart-list .list-header .empty{
    position: absolute;
    right: 8px;
    top: 0;
    font-size: 12px;
    color: #00a0dc;
    padding: 0 10px;
}
.shopCart .shopcart-list .list-content{
    max-height: 217px;
    overflow: hidden;
}
.shopCart .shopcart-list .list-content ul{
    display: block;
    list-style-type: none;
    padding: 0;
}
.shopCart .shopcart-list .list-content .food{
    position: relative;
    display: flex;
    height: 48px;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopCart .shopcart-list .list-content .food .name{
    flex: 1;
    font-size: 14px;
    color: #07111b;
    line-height: 48px;
    font-weight: 700;
}
.shopCart .shopcart-list .list-content .food .price{
    font-size: 14px;
    font-weight: 700;
    color: #f01414;
    padding: 0 12px 0 18px;
    line-height: 48px;
}

.shopCart .cartcontrol-wrapper{
    margin-top: 6px;
    display: inline-block;
    font-size: 20px;
    color: #00a0dc;
  
}
.shopCart .transHeight-enter-active{
    transition:all 0.3s linear;

}
.shopCart .transHeight-leave-active{
    transition:all 0.9s linear;

}
.shopCart .transHeight-enter{
    transform:translate(0,95%)
} 
.shopCart .transHeight-leave-to{
    transform:translate(0,95%)
} 

.shopCart .backdrop {
    position: fixed;
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
    background: rgba(7,17,27,0.6);
    backdrop-filter: blur(10px);
    z-index: 40;
}

</style>
