<template lang="pug">
#product
  Navbar
  b-breadcrumb.mt-5
    b-breadcrumb-item(to='/') 首頁
    b-breadcrumb-item(to='/allProducts') 美味麵包
    b-breadcrumb-item(active) {{ product.name }}
  #container
    b-row.row
      b-col#proImg.p-0.mt-5.mb-3.mt-md-0.mb-md-0(cols="12" md="6")
        img(:src='product.imageUrl')
        font-awesome-icon#favTop(:icon="['fas', 'heart']" @click="addFav(product)" :class='{\'favColor\': favItems.some((item)=>item._id === product._id)}')
      b-col#proInfo(cols="12" md="6")
        .proNameBox.my-2
          .proNameLeft
            span.proBig {{ product.name }}
            span.proSmall NT$ {{ product.price }}
          font-awesome-icon#favIcon(:icon="['fas', 'heart']" @click="addFav(product)" :class='{\'favColor\': favItems.some((item)=>item._id === product._id)}')
        .proMore
          p.mt-3.mb-3 成分 | {{ product.ingredient }}
          p.m-0.proSmall(v-if="product.period") ※本產品保存期限為{{ product.period }}，請儘速食用<span class="noDot">。</span>
          p.mb-2.proSmall(v-if="product.allergy") ※本產品含{{ product.allergy }}等過敏食物<span class="noDot">。</span>
        b-form-spinbutton#amountInput.mt-4(v-model='qunvalue' min='1' max='100')
        b-button.addToCart.mt-4.py-3(href='#' @click="addCart(product)")
          font-awesome-icon.mr-3(:icon="['fas', 'shopping-cart']" @click="addCart(product)")
          span 加入購物車
    hr.my-2.mt-md-2.mb-md-5
    .proDes.my-3.my-md-2
      p.about.text-center 關於{{ product.name }}
      p.text-justify.mb-4.m-auto.proDes {{ product.description }}
    hr.my-3.mt-md-5.mb-md-5
    #samePro.mt-5.pt-md-4(v-if="samePro.length !== 0")
      p.about.text-center.mb-4 相關商品推薦
      carousel.carousel(:per-page="1" :per-page-custom="[[320, 2], [1199, 3]]")
        slide.slide(v-for="(p, index) in samePro" :key="index")
          b-card.carouselCard(overlay :img-src='p.imageUrl' text-variant='white')
            b-button.cardBtn(:to='`/AllProducts/${p._id}`').
              {{ p.name }}
  Footer
</template>

<style scoped lang="scss">
@import "../assets/scss/product.scss";
.carousel {
  display: flexbox;
  justify-content: center;
  .slide {
    display: flex;
    justify-content: center;
  }
}
.breadcrumb {
  background: transparent;
  letter-spacing: .15rem;
  font-size: .95rem;
  display: none;
  width: 80%;
  margin: auto;
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
#container {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 8%;
  position: relative;
  top: 0;
  left: 0;
  hr {
    width: 80%;
    border-top: 3px solid #a8a57c;
    opacity: .3;
  }
}
@media (min-width: 768px) {
  .breadcrumb {
    background: transparent;
    display: flex;
  }
  #container {
    width: 70%;
    margin-top: 3%;
    padding-bottom: 10%;
    #favTop {
      display: none;
    }
    #proInfo {
      padding-left: 3rem;
    }
    #proImg img {
      width: 95%;
    }
    .proNameBox {
      width: 70% !important;
      align-items: center;
      justify-content:space-between;
      padding-top: 5%;
      .proNameLeft {
        align-items: flex-start;
        flex-direction: column;
      }
      .proSmall {
        font-size: 1rem;
        margin-top: .3rem;
      }
    }
    .proMore {
      width: 70%;
      font-size: 1rem;
      line-height: 1.5rem;
    }
    .noDot {
      display: inline;
    }
    #favIcon {
      color: #e6e2cc;
      display: block;
      transform: translateX(-50%) scale(1.5);
    }
    .proDes {
      width: 70% !important;
      text-align: justify;
      font-size: 1rem;
      line-height: 1.7rem;
    }
    #samePro {
      width: 100%;
      margin: auto;
      display: block;
    }
  }
}
.row {
  margin-bottom: 15%;
}
#proImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
#proImg img {
  width: 80%;
  object-fit: cover;
}
#favTop {
  position: absolute;
  top: 8%;
  right: 8%;
  transform: translateX(-50%) scale(1.5);
  color: #e6e2cc;
}
#proInfo {
  margin:0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.proNameLeft {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.proNameBox {
  width: 65%;
  color: #785651;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.proMore {
  width: 65%;
  font-weight: 300;
  font-size: .95rem;
  letter-spacing: 0.1rem;
  line-height: 1.8rem;
  color: #785651;
}
.noDot {
  display: none;
}
.proBig {
  font-weight: 400;
  letter-spacing: 0.2rem;
  font-size: 1.2rem;
}
#favIcon {
  display: none;
}
.proSmall {
  font-size: .9em;
  color: #af5b4e;
}
.proDes {
  width: 80%;
  margin: auto;
  font-size: .9rem;
  text-align: justify;
  letter-spacing: 0.1rem;
  line-height: 1.8rem;
  font-weight: 300;
  color: #785651;
}
.b-form-spinbutton{
  width: 70%;
  border: none !important;
  color: #785651 !important;
}
.form-control.foucus :focus{
  box-shadow: none !important;
  border: none;
}
.addToCart {
  background: #c5c4a6;
  border: none;
  font-weight: 300;
  width: 70%;
  transition: .8s;
  &:hover {
    background: #a8a57c !important;
  }
  &:active {
    transform: scale(.9);
  }
  &:focus {
    box-shadow: none !important;
  }
}
.about {
  letter-spacing: 0.1rem;
  font-size: 1.1rem;
  font-weight: 400;
  color: #785651;
}
#samePro {
  display: none;
}
.favColor {
  color: #a8a57c !important;
  animation: favAni .5s ease-in-out;
}
.samePro {
  width: 15rem;
  height: 15rem;
  margin: 0;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
.carouselCard {
  width: 15rem;
  height: 15rem;
  .cardBtn {
    width: 15rem;
    height: 15rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 1s;
    background: rgba(199, 166, 160, 0.4);
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    letter-spacing: .3rem;
  }
  &:hover .cardBtn{
    opacity: 1;
    border: none;
    box-shadow: none;
  }
  .cardBtn:active {
    box-shadow: none;
    background: rgba(199, 166, 160, 0.8);
    border: none;
  }
  .cardBtn:visited,
  .cardBtn:hover {
    box-shadow: none;
    border: none;
  }
  .VueCarousel-pagination {
    .VueCarousel-dot-container {
      display: none;
      margin-top: 0 !important;
      .VueCarousel-dot {
        margin-top: 0 !important;
      }
    }
  }
}
@keyframes favAni {
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(2);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}
#footer {
  width: 100%;
  height: 300px;
  background: #c5c4a6;
  clear: both;
}
</style>

<script>
import Footer from '../components/footer.vue'
import Navbar from '../components/navbar.vue'
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'product',
  components: {
    Carousel,
    Slide,
    Navbar,
    Footer
  },
  data () {
    return {
      productId: '',
      product: [],
      samePro: [],
      qunvalue: 1,
      isFav: false,
      favPro: []
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
        amount: this.qunvalue
      }
      this.$swal({
        toast: true,
        position: 'top-end',
        icon: 'success',
        text: `已將 ${product.name} x ${this.qunvalue} 加入購物車`,
        timer: 2000,
        showConfirmButton: false
      })
      this.$store.commit('addCart', cartItem)
    }
  },
  computed: {
    favItems () {
      return this.$store.getters.favItems
    }
  },
  mounted () {
    this.productId = this.$route.params.productId
    this.axios.get(process.env.VUE_APP_API + '/products/' + this.productId)
      .then(res => {
        this.product = res.data.result
        const productSrc = `${process.env.VUE_APP_API}/products/images/${this.product.images}`
        this.product.imageUrl = productSrc
      })
      .then(() => {
        this.axios.get(process.env.VUE_APP_API + '/products')
          .then(res => {
            const products = res.data.result
            const samePro = products.filter((item) => {
              return ((item.category === this.product.category) && (item.name !== this.product.name))
            })
            const x = []
            if (samePro.length !== 0) {
              while (x.length < samePro.length) {
                const j = Math.floor(Math.random() * samePro.length)
                if (x.indexOf(samePro[j]) < 0) {
                  const productSrc = `${process.env.VUE_APP_API}/products/images/${samePro[j].images}`
                  samePro[j].imageUrl = productSrc
                  x.push(samePro[j])
                }
              }
            }
            this.samePro = x
          })
      })
  }
}
</script>
