<template lang='pug'>
  #fav
    Navbar
    b-breadcrumb.mt-5
      b-breadcrumb-item(to='/') 首頁
      b-breadcrumb-item(active) 收藏清單
    #container
      p.title 收藏清單
      b-row.rowbox
        b-col.col.colBorder(cols="12" v-for='favItem in favItems' :key='favItem._id')
          .proImg
            .bg
              span +Show More
            img.image(:src='favItem.imageUrl' @click="toProduct(favItem._id)")
          b-row#proInfo.ml-1
            b-col#proName(cols="12" md="3")
              span.proBig {{ favItem.name }}
              span.proSmall NT$ {{ favItem.price }}
            b-col.proDel(cols="12" md="8")
              b-form-spinbutton#amountInput.mr-2(v-model='favItem.amount' min='1' max='100')
              b-button.addToCart(@click="addCart(favItem)")
                font-awesome-icon.cartIcon(:icon="['fas', 'cart-plus']")
            b-col.proDel(cols="12" md="1")
              b-button.delbtn(@click="delFav(favItem)") x
</template>

<style scoped lang="scss">
@import "../assets/scss/fav.scss";
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0%;
  position: absolute;
  bottom: 4%;
  left: 0;
  opacity: 0;
  transition: .6s;
  background: #d1b8b3;
  color: #fff;
  pointer-events: none;
}
.proImg:hover .bg {
  height: 92%;
  opacity: 1;
  background: rgba(209, 184, 179, 0.8)
}
#container {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15%;
  padding-top: 2%;
  color: #785651;
  letter-spacing: .2rem;
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
#top {
  width: 100%;
  height: 130px;
  background: #c5c4a6;
  position: relative;
}
.delbtn {
    height: auto;
    width: auto;
    background: transparent;
    border: none;
    margin-right: 2%;
    padding: 0;
    box-shadow: none;
    color: #785651;
    transition: .6s;
    &:focus {
      border: none;
      color: #785651 !important;
      box-shadow: none !important;
      background: transparent !important;
    }
    &:active {
      border: none;
      box-shadow: none;
      transform: scale(.7);
      background: transparent !important;
    }
    &:hover {
      transform: scale(1.2);
      background: transparent;
    }
  }
.b-form-spinbutton{
  width: 40%;
  border: none !important;
  color: #785651 !important;
}
.addToCart {
  background: transparent;
  border: none;
  font-weight: 300;
  width: auto;
  height: auto;
  color: #785651;
  &:hover {
    background: transparent !important;
  }
  &:active,
  &:focus {
    box-shadow: none !important;
    color: #785651 !important;
    background: transparent !important;
  }
  .cartIcon {
    transform: scale(1.4);
    transition: .4s;
    &:hover {
      transform: scale(1.5);
    }
    &:active {
      transform: scale(1.2);
    }
  }
}
.showMore {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  transition: .4s;
  color: #7856519c;
  font-size: 1rem;
  &:hover {
    font-size: 1.01rem;
    color: #785651;
  }
}
.rowbox {
  width: 100%;
  margin: auto;
  color: #785651;
}
.col {
  position: relative;
  width: 100%;
  display: flex;
  padding: 2% 0 2% 0;
}
.colBorder {
  padding: 0 3%;
  height: 12rem;
  border-bottom: 3px solid rgba(198,197,166,0.2);
  transition: .7s;
  &:hover{
    border-bottom: 3px solid rgba(198,197,166,0.8);
  }
}
.proImg {
  width: 12rem;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}
.pro {
  padding-left: 1rem;
}
#proInfo {
  width: calc(100% - 12rem);
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.proTop {
  text-align: center;
  font-size: .9rem;
  font-weight: 400;
}
#proName {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.3rem;
  span {
    margin: 0;
    letter-spacing: .2rem;
  }
  .proBig {
    font-weight: 400;
    letter-spacing: 0.15rem;
    font-size: 1rem;
  }
  .proSmall {
    font-size: .8em;
    padding-top: .3rem;
    color: #af5b4e;
    letter-spacing: 0rem;
  }
}
.proSmall {
    font-size: .8em;
    padding-top: .3rem;
    color: #af5b4e;
    letter-spacing: 0rem;
  }
.proPrice {
  display: flex;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 400;
  color: #af5b4e;
  letter-spacing: 0rem;
}
.proDel {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  cursor: pointer;
}
.title {
  margin-bottom: 5%;
  line-height: 2.5rem;
  text-align: center;
  color: #785651;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: .15rem;
  }
@media (min-width: 768px) {
  .breadcrumb {
    background: transparent;
    display: flex;
  }
  #container {
    width: 70%;
    margin-top: 0%;
    padding-bottom: 10%;
  }
}
</style>

<script>
import Navbar from '../components/navbar.vue'
export default {
  name: 'fav',
  data () {
    return {
      qunvalue: 1
    }
  },
  components: {
    Navbar
  },
  methods: {
    toProduct (id) {
      this.$router.push(`/AllProducts/${id}`)
    },
    delFav (favItem) {
      this.$store.commit('delFav', favItem)
    },
    addCart (favItem) {
      const cartItem = {
        productId: favItem._id,
        name: favItem.name,
        images: favItem.images,
        imageUrl: favItem.imageUrl,
        price: favItem.price,
        amount: favItem.amount
      }
      this.$store.commit('addCart', cartItem)
      this.$swal({
        toast: true,
        position: 'top-end',
        icon: 'success',
        text: `已將 ${favItem.name} x ${favItem.amount} 加入購物車`,
        timer: 2000,
        showConfirmButton: false
      })
      favItem.amount = 1
    }
  },
  computed: {
    favItems () {
      return this.$store.getters.favItems
    }
  },
  created () {
    for (const f of this.favItems) {
      const amount = 1
      f.amount = amount
    }
  }
}
</script>
