<template lang="pug">
  #Home
    Navbar
    #section01
      #sec01box
        img.logo(:src="'./Home/logo05.png'")
        img.sec01main(:src="'./Home/main02.png'")
    #section02.mt-3
      #sec02Img
        img.aboutbg(:src="'./Home/illusbg-03.png'")
      .aboutus
        span.title 關於呷胖胖
        p.text(data-aos="fade" data-aos-offset="100").
          呷胖胖為大家提供健康美味的麵包<br>
          使用多種自製酵母並精心挑選材料，添增獨特的香氣與口感<br>
          在溫度與濕度上嚴格的管控，穩定麵包品質<br>
          每日將新鮮出爐的麵包以外送的方式送到顧客手中<br>
          希望大家可以每天都吃到美味健康的麵包
    #section03
      <b-carousel id="carousel-1" v-model="slide" :interval="4000" fade @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
        b-carousel-slide.img(img-src="@/assets/images/carousel01.png")
        b-carousel-slide.img(img-src="@/assets/images/carousel02.png")
      </b-carousel>
      .tagtext
        p.title 美味麵包
        p(data-aos="fade" data-aos-offset="100").
            呷胖胖提供多種類麵包<br>
            歐式麵包簡單純樸，口感扎實香氣足夠<br>
            吐司柔軟美味，適合搭配果醬、配料一同食用<br>
            限量的糕點隨季節的變換而改變
      #section03Tag.d-flex.justify-content-center.align-items-center
        p.p-0.m-0.position-absolute 查看商品詳情
          font-awesome-icon.ml-3(:icon="['fas', 'shopping-cart']")
        img(:src="'./Home/tag.png'" @click="topro")
    #section04.flex-column.align-items-center.justify-content-center
      .aboutstep.mb-5.pb-4
        span.title 網路購買流程
        //- p.text.mb-3(data-aos="fade" data-aos-offset="100").
        //-   使用呷胖胖網路購物功能，麵包簡單輕鬆購
      b-row#step.w-75.mx-auto
        b-col.d-flex.justify-content-center.align-items-center.flex-column(cols="4")
          .d-flex.justify-content-center.align-items-center
            img.step1(:src="'./Home/circle.png'")
            span.steptext 1
          #stepDes
            p.p-0.m-0 選擇要購買的麵包
          #stepImg
            img(:src="'./Home/fox04.png'")
        b-col.d-flex.justify-content-center.align-items-center.flex-column(cols="4")
          .d-flex.justify-content-center.align-items-center
            img.step2(:src="'./Home/circle.png'")
            span.steptext 2
          #stepDes
            p.p-o.m-0 確認商品並寫資訊
          #stepImg
            img(:src="'./Home/fox04.png'")
        b-col.d-flex.justify-content-center.align-items-center.flex-column(cols="4")
          .d-flex.justify-content-center.align-items-center
            img.step3(:src="'./Home/circle.png'")
            span.steptext 3
          #stepDes
            p.p-o.m-0 等待收取商品
          #stepImg
            img(:src="'./Home/fox04.png'")
    .mapbox.mt-5
      Map.map
    #footer.d-flex.flex-column.justify-content-center
      b-row.w-100
        b-col(cols="3")
          img(:src="'./Home/logo05.png'")
        b-col.pt-3.d-flex.align-items-center(cols="9")
          b-row.w-100.h-100.flex-column
            b-col.h-50.w-100.d-flex.align-items-end
              font-awesome-icon.icon.mr-4(:icon="['fab', 'instagram']")
              font-awesome-icon.icon(:icon="['fab', 'facebook-square']")
            b-col.h-50.w-100.d-flex.align-items-center.justify-content-between
              span 關於我們
              span 美味麵包
              span 收藏清單
              span 購物車
              span 登入/ 註冊
    ToCart
</template>

<style scoped lang="scss">
@import "../assets/scss/home.scss";
</style>

<script>
import Map from '../components/Map.vue'
import ToCart from '../components/toCart.vue'
import Navbar from '../components/homeTop.vue'

export default {
  name: 'Home',
  components: {
    Map,
    ToCart,
    Navbar
  },
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    topro () {
      this.$router.push('/allProducts')
    }
  }
}
</script>
