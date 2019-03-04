<template lang="html">

  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease"  v-show="food.count>0" @click.stop.prevent="decreaseCart()">
          <span class="el-icon-remove-outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="el-icon-circle-plus-outline"></i>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'

export default {
  name:"cartcontrol",
  props: {
    food: Object
  },
  methods: {
    addCart(event) {
      debugger
      console.log(event.target);
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 0)
      }
      this.food.count++;
     /*   this.$emit('cart.add', event.target) */
    },
    decreaseCart() {
      if (!event._constructed || !this.food.count) {
        return
      }
      this.food.count--;
    }
  }
}

</script>

<style>
.cartcontrol div{
    display: inline-block;
}
.cartcontrol .cart-decrease{
    margin-right: 10px;
}
.cartcontrol .cart-count{
    margin-right: 10px;
    font-size: 14px;
    color: #93999f;
   /*  vertical-align: top;
    line-height: 27px; *//* 不能加这两个，让动画有奇怪的变化 */
}
 .cartcontrol .fadeRotate-enter-active{
    transition: all .4s linear;    
} 
.cartcontrol .fadeRotate-leave-active{
    transition: all 0.4s linear;  
}

.cartcontrol .fadeRotate-enter,.fadeRotate-leave-to{
    transform:translate(30px,0) rotate(180deg);
    opacity: 0;
} 

</style>
