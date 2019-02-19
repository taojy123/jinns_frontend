<template>
  <div class="products">

    <divider>{{title}}</divider>

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


    <mall-footer></mall-footer>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import mallFooter from "./footer";


export default {
  name: 'products',
  components:{mallFooter},
  data () {
    let title = '全部商品'
    const filters = {}
    if (this.$route.query.hot) {
      title = '本月热卖'
      filters.is_hot = 1
    }
    return {
      products: [],
      filters,
      title,
    }
  },
  mounted() {
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

