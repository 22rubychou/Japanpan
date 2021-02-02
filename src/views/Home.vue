<template lang="pug">
  #Home
    Navbar
    #section01
      //- b-carousel.h-100(v-model='slide' :interval='5000' background='#ababab' @sliding-start='onSlideStart' @sliding-end='onSlideEnd')
      //-   b-carousel-slide.img(img-src="@/assets/images/main01.png")
      //-   b-carousel-slide.img(img-src="@/assets/images/main02.jpg")
      //-   b-carousel-slide.img(img-src="@/assets/images/main03.jpg")
      #sec01box
        img.logo(:src="'./Home/logo05.png'")
        img.sec01main(:src="'./Home/main02.png'")
    #section02
      #sec02Img
        //- img.titleImg(:src="'./Home/aboutus.png'")
        img.decImg.decImg01(:src="'./Home/bread04.png'")
        img.decImg.decImg02(:src="'./Home/fox04.png'")
        img.decImg.decImg04(:src="'./Home/bread08.png'")
        img.decImg03(:src="'./Home/bread05.png'")
      //- img.decImg.decImg02(:src="'./Home/bread05.png'")
      //- b-row
      //-   b-col(cols="4")
      //-     .homeImg(data-aos="fade" data-aos-offset="300")
      //-       img(:src="'./Home/gre01.jpg'")
      //-   b-col(cols="4")
      //-     .homeImg(data-aos="fade" data-aos-offset="300" data-aos-delay="300")
      //-       img(:src="'./Home/gre02.jpg'")
      //-   b-col(cols="4")
      //-     .homeImg(data-aos="fade" data-aos-offset="300" data-aos-delay="600")
      //-       img(:src="'./Home/gre03.jpg'")
      .aboutus
        span.title(data-aos="fade" data-aos-offset="100") 關於呷胖胖
        p.text(data-aos="fade" data-aos-offset="100").
          呷胖胖為大家提供健康美味的麵包<br>
          使用多種自製酵母並精心挑選材料，添增獨特的香氣與口感<br>
          在溫度與濕度上嚴格的管控，穩定麵包品質<br>
          每日將新鮮出爐的麵包以外送的方式送到顧客手中<br>
          希望大家可以每天都吃到美味健康的麵包
    #section03
      .aboutpro(data-aos="fade" data-aos-offset="100")
        span.title 美味麵包
      <b-carousel id="carousel-1" v-model="slide" :interval="4000" fade @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
        b-carousel-slide.img(img-src="@/assets/images/carousel01.png")
        b-carousel-slide.img(img-src="@/assets/images/carousel02.png")
      </b-carousel>
      img#section03Tag(:src="'./Home/tag.png'")
    #section04.flex-column.align-items-center
      .aboutus.mb-5.mt-0
        span.title 網購流程
      p.text.mb-5(data-aos="fade" data-aos-offset="100").
          使用呷胖胖網路購物功能，麵包簡單輕鬆購
      b-row.w-75.mx-auto
        b-col.d-flex.justify-content-center.align-items-center.flex-column(cols="4")
          .step1
        b-col.d-flex.justify-content-center.align-items-center.flex-column(cols="4")
          .step2
        b-col.d-flex.justify-content-center.align-items-center.flex-column(cols="4")
          .step3
    #section05
      .aboutus(data-aos="fade" data-aos-offset="300")
        span.title 關於本店
        b-row
          b-col(cols="3")
          b-col(cols="9")
            .mapbox
              Map.map
    #footer
      .footerbox
        .footerinfo
    //- #totop(href='#section01' v-smooth-scroll='{ duration: 1000, offset: 0 }')
    //-   img.main(:src="'./Home/test02.png'")
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
    }
  }
}
</script>
