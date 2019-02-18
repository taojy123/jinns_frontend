<template>
  <div class="">
    <!--<son-header center-mes="微商城"></son-header>-->

    <div class="product-list">

      <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="6" v-for="product in products" :key="product.id">
            <router-link :to="{ path: '/products/' + product.id }">
              <div class="item">
                <div class="product-img">
                  <img :src="product.pic">
                </div>
                <div class="product-name"><span>{{product.name}}</span></div>
                <div class="product-price"><span>¥ {{product.price}}</span></div>
              </div>
            </router-link>
          </flexbox-item>
      </flexbox>
    </div>

  </div>
</template>

<script>
import SonHeader from '../SonHeader/SonHeader'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'productPay',
  components:{SonHeader},
  data () {
    return {
      tabIndex: 0,
      products: [],
      filters: {},
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList(){
      this.$axios.get(`/api/mall/products/`, {params: this.filters}).then(res => {
        console.log(res.data)
        this.products = res.data.results || res.data
      })
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .paddingtop {
    padding-top: 50px;
  }

  .product-list a {
    color: black;
  }

  .product-list {
    min-height: calc(100vh - 100px);
    padding: 5px;
  }

  .item{
    padding: 5px;
  }

  .product-img {
    position:relative;
    width:100%;
    height:0;
    padding-top:100%;
  }

  .product-img img {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    border-radius: 10px;
  }

  .product-name {
    text-align: center;
    margin: 5px;
    color: #999999;
  }

  .product-price {
    text-align: center;
    margin: 10px 0 20px 0;
  }


  @media screen and (max-width: 768px){

  }
  @media screen and (max-width: 375px){

  }
  @media screen and (max-width: 360px){

  }
  @media screen and (max-width: 320px){

  }

</style>

