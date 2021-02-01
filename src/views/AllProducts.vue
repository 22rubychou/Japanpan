<template lang='pug'>
  #allProducts
    Navbar
    #bread.mt-5
      b-breadcrumb
        b-breadcrumb-item(to='/') 首頁
        b-breadcrumb-item(to='/allProducts') 美味麵包
        b-breadcrumb-item(active) {{ this.cate }}
    #container
      #left
        ul.nav.flex-column
          li.nav-item.mb-1(style="color:#785651").
            商品分類
          li.nav-item
            a.nav-link.p-0.mt-2.cate(@click="cate='所有商品'") 所有商品
          li.nav-item
            a.nav-link.p-0.mt-2.cate(@click="cate='新品上市類'") 新品上市
          li.nav-item
            a.nav-link.p-0.mt-2.cate(@click="cate='歐式麵包類'") 歐式麵包
          li.nav-item
            a.nav-link.p-0.mt-2.cate(@click="cate='吐司類'") 吐司
          li.nav-item
            a.nav-link.p-0.mt-2.cate(@click="cate='其他'") 其他
      #right
        #cardGroup
          b-row.row.m-0
              b-col.p-0.col.mb-5(cols="12" lg="4" md="6" v-for='product in filterproducts' v-if="product.sell === '上架'" :key='product._id')
                #colBig
                  #colBox
                    font-awesome-icon#icon(:icon="['fas', 'heart']" @click="addFav(product)" :class='{\'favColor\': favItems.some((value)=>value._id === product._id)}')
                    .proBl
                    .proImg
                      img(:src='product.imageUrl')
                    .proInfo
                      b-button.showMore(href='#' :to='`/AllProducts/${product._id}`') Show More
                      font-awesome-icon.toCartIcon.mt-2(:icon="['fas', 'shopping-cart']" @click="addCart(product)")
                  #colBox2
                    span.bigText
                      | {{ product.name }}
                    span.smallText
                      | NT$ {{ product.price }}
    Footer
</template>

<style scoped lang="scss">
@import "../assets/scss/AllProducts.scss";

#allProducts {
  width: 100%;
  height: auto;
}
#top {
  width: 100%;
  height: 130px;
  background: #c5c4a6;
  position: relative;
  z-index: -1;
}
#bread {
  width: 80%;
  margin: auto;
  .breadcrumb {
    background: transparent;
    letter-spacing: .15rem;
    font-size: .95rem;
    display: none;
    a {
      color: #785651;
      &:hover {
        text-decoration: none;
      }
    }
    .active {
      color: #af5b4e;
    }
    .breadcrumb-item::before {
      color: #785651;
    }
  }
}
@media (min-width: 768px) {
  #container {
    margin-top: 3rem !important;
  }
  #bread {
    .breadcrumb {
      background: transparent;
      display: flex;
    }
  }
  #colBig {
    width: 12rem !important;
    height: 12rem !important;
  }
}
#container {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  padding-bottom: 8%;
  padding-top: 3%;
  position: relative;
  top: 0;
  left: 0;
}
#left {
  width: 13%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  padding-left: 3rem;
}
#left ul li:first-child {
  font-weight: 500;
  font-size: 1.05rem;
  letter-spacing: .05rem;
}
.cate {
  color: #967f7a;
  cursor: pointer;
  font-size: 103%;
  font-weight: 400;
  letter-spacing: .05rem;
  transition: transform .3s;
}
.cate:hover {
  transform: translateY(-8%);
  color: #785651;
}
#right {
  width: 82%;
  padding-left: 5%;
}
.title {
  letter-spacing: .15rem;
  text-align: center;
  color: #785651;
  font-weight: 500;
  font-size: 1.1rem;
}
.col {
  display: flex;
  justify-content: center;
}
#colBig {
  margin-bottom: 18%;
  width: 15rem;
  height: 15rem;
  background: #fff;
  position: relative;
}
#colBox {
  position: relative;
  width: 100%;
  height: 90%;
}
#icon {
  position: absolute;
  right: 7%;
  top: 7%;
  transform: scale(1.5);
  z-index: 5;
  color: #e6e2cc;
}
#colBox2 {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bigText {
  letter-spacing: 0.15rem;
  font-weight: 400;
  color: #785651;
}
.smallText {
  font-weight: 300;
  font-size: 0.9rem;
  color: #af5b4e;
  padding-top: 1%;
}
.proBl {
  width: 100%;
  height: 0px;
  position: absolute;
  bottom: 0;
  transition: .6s;
}
.proImg {
  width: 100%;
  height: 100%;
  margin:0;
}
.col:hover .proBl {
  height: 100%;
  background: #d1b8b3;
  opacity: .6;
}
.proImg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.proInfo {
  opacity: 0;
  transition: 1s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.col:hover .proInfo {
  opacity: 1;
}
.showMore,
.toCartIcon {
  color: #fff;
  border: none;
  text-align: center;
  background: transparent;
  margin-top: 5%;
  cursor: pointer;
  transition: .4s;
}
.showMore {
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
    background: transparent !important;
    box-shadow: none !important;
  }
  &:focus {
    background: transparent !important;
    box-shadow: none !important;
  }
}
.toCartIcon {
  transform: scale(1.2);
  &:hover {
    transform: scale(1.4);
  }
  &:active {
    transform: scale(.95);
  }
}
</style>

<script>
import MyButtom from '../components/myButtom.vue'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
export default {
  name: 'AllProducts',
  components: {
    MyButtom,
    Navbar,
    Footer
  },
  data () {
    return {
      file: null,
      name: '',
      products: [],
      cate: '所有商品',
      count: 0
    }
  },
  methods: {
    addFav (product) {
      const inAllFav = this.favItems.findIndex(item => {
        return item._id === product._id
      })
      if (inAllFav === -1) {
        this.$store.commit('addFav', product)
        this.$swal({
          toast: true,
          position: 'top-end',
          icon: 'success',
          text: `已將 ${product.name} 加入收藏`,
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        this.$store.commit('delFav', product)
      }
    },
    addCart (product) {
      const cartItem = {
        productId: product._id,
        name: product.name,
        images: product.images,
        imageUrl: product.imageUrl,
        price: product.price,
        amount: 1
      }
      this.$store.commit('addCart', cartItem)
      this.$swal({
        toast: true,
        position: 'top-end',
        icon: 'success',
        text: `已將 ${product.name}x1 加入收藏`,
        timer: 2000,
        showConfirmButton: false
      })
    }
  },
  computed: {
    favItems () {
      return this.$store.getters.favItems
    },
    filterproducts () {
      return this.products.filter((item) => {
        if (this.cate === '所有商品') {
          return item
        } else {
          return item.category === this.cate
        }
      })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/products')
      .then(res => {
        this.products = res.data.result
        for (const p of this.products) {
          const productSrc = `${process.env.VUE_APP_API}/products/images/${p.images}`
          p.imageUrl = productSrc
        }
      })
  }
}
</script>
