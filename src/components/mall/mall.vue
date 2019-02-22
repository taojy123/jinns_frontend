<template>
  <div class="mall">

    <swiper :list="product_imgs" height="300px" :auto="true" :show-dots="true" dots-position="center">
    </swiper>

    <img :src="hot_text_url" width="100%">

    <div class="product-list">

        <div v-for="product in products" :key="product.id">
          <router-link :to="{ path: '/products/' + product.id }">
            <div class="item">
              <img :src="product.hot_pic" width="100%">
            </div>
          </router-link>
        </div>

    </div>

    <mall-footer></mall-footer>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import mallFooter from "./footer";
import mallHeader from '../Header/Header'


export default {
  name: 'mall',
  components:{mallHeader, mallFooter},
  data () {
    return {
      products: [],
      filters: {is_hot: 1},
      hot_text_url: require('../../assets/imgs/hot_text.jpg')
    }
  },
  mounted() {
    document.title = '微商城'
    this.fetchList()
  },
  computed: {
    product_imgs(){
      return this.products.map((item) => ({img: item.pic}))
    }
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

