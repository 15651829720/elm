<template>
  <div class="goods" >
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goodsInfo" :key="index" @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
          <span class="text">
            <!-- <iconMap v-show="item.type>0" :iconType="item.type"></iconMap> -->
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goodsInfo" :key="index" class="food-list food-list-hook">
          <div class="goodsName">{{item.name}}</div>
          <ul>
            <li v-for="(item1,index1) in item.foods" :key="index1" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="item1.icon"/>
              </div>
              <div class="content">
                <div class="contentName">{{item1.name}}</div>
                <div class="description" v-show="item1.description">{{item1.description}}</div>
                <div class="sell-info">
                  <span class="sellCount">月售{{item1.sellCount}}份</span>
                  <span class="rating">好评率{{item1.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice"><span class="unit">￥</span>{{item1.price}}</span>
                  <span v-show="item1.oldPrice" class="oldPrice">￥{{item1.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="item1"></Cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :deliveryPrice="sellersInfo.deliveryPrice" :minPrice = "sellersInfo.minPrice" :selectFoods="selectFoods"></shopCart>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import BScroll from 'better-scroll'
import ShopCart from './shopCart.vue'
import Cartcontrol from './cartcontrol.vue'

export default {
    data() {
        return {
            listHeight:[],
            foodsScrollY:0
        }
    },
    props: {
       initInfo: {
            type: Object,
            required: true,
            default: _ => []
            /* default: [] */
        } 
    },
    computed:{  
        goodsInfo:function(){
            return this.initInfo.goods;
        },
        sellersInfo:function(){
            return this.initInfo.seller;
        },
        menuCurrentIndex() {
            for (let i = 0, l = this.listHeight.length; i < l; i++) {
                let topHeight = this.listHeight[i]
                let bottomHeight = this.listHeight[i + 1]
                if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
                return i
                }
            }
            return 0
        },
        selectFoods() {
            let foods = []
            this.initInfo.goods.forEach((good) => {
                good.foods.forEach((food) => {
                if (food.count) {
                    foods.push(food)
                }
                })
            })
            return foods
         }
    },   
    created() {
        
    },
    mounted(){
        this.$nextTick(()=>{
            this.calculateHeight() /* 计算高度 */
            this.initScroll();/* 绑定better-scroll插件 */
        })         
    },
    components: {
        Cartcontrol,
        ShopCart
    }, 
    methods: {
      
        menuClick(index, event) {
            if (!event._constructed) {
                return/* 如果不是插件派发的点击就返回 */
            }
            this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
        },
        calculateHeight() {
            /* let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook') */
            let foodList = document.getElementsByClassName('food-list-hook')
            let height = 0
            this.listHeight.push(height) 
            for (let i = 0, l = foodList.length; i < l; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
            console.log('this.listHeight',this.listHeight);
            
        },
        initScroll() {
            this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
                click: true/* 阻止浏览器的原生 click 事件，better-scroll 会派发一个 click 事件 */
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3/* 实时派发 scroll 事件不延迟 */
            });
            // 监控滚动事件
            this.foodsScroll.on('scroll', (pos) => {
                this.foodsScrollY = Math.abs(Math.round(pos.y))
            })
        },
    }
};
</script>

<style scoped>
.goods {
    position: absolute;
    top: 178px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    font-size: 0.2rem;
    display: flex;/* 三栏布局很好用 */
}
.goods .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 12px;
    z-index: 20;
    font-size: 20px;
    color: #00a0dc;
    display: inline-block;
}
.goods .menu-wrapper {
  
    width: 80px;
    background: #f3f5f7;
    margin-top: 2px;
}
.goods .menu-wrapper .menu-item-selected {
    background: #fff;
    height: 54px;
    /* line-height: 14px; */
    width: 56px;
     display: table; 
     padding: 0 12px;
}
.goods  ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.goods .menu-wrapper ul .menu-item{
    height: 54px;
    /* line-height: 14px; */
    width: 56px;
     display: table; 
     padding: 0 12px;
}
.goods .menu-wrapper ul .text{
    display: table-cell;
    vertical-align: middle;
}

.goods .foods-wrapper {
    margin-top: 2px;
    flex: 1;
}

.goods .goodsName{
    height: 26px;
    line-height: 26px;
    padding-left: 12px;
    color: #93999f;
    background: #f3f5f7;
    border-left: 2px solid #d9dde1;
    font-size: 0.25rem;
    margin: 0px;
}
.goods .foods-wrapper .food-item {
    position: relative;
    display: flex;
    margin: 0 18px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}

.goods .foods-wrapper .food-item .content {
    padding-left: 10px;
    flex: 1;
}
.goods .foods-wrapper .food-item .content .newPrice{
    font-size: 0.25rem;
    color: red;
}

.goods .foods-wrapper .food-item .contentName {
    margin: 2px 0 8px 0;
    font-size: 14px;
    line-height: 14px;
    height: 14px;
    font-weight: 700;
    color: #07111b;
}
.goods .foods-wrapper .food-item .content .description{
    font-size: 10px;
    margin-bottom: 8px;
    line-height: 12px;
}
.goods .foods-wrapper .food-item .content .sell-info .sellCount{
    margin-right: 4px;
}
.goods .food-item .icon{
    width: 0.9rem;
    
}
.goods .food-item .icon img{
    width: 100%;
    
}


</style>
