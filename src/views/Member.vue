<template lang='pug'>
  #member
    Navbar
    b-breadcrumb.mt-5
      b-breadcrumb-item(to='/') 首頁
      b-breadcrumb-item(active) 會員專區
    #container
      .title 訂單詳情
      .w-70
        b-row.mb-4
          b-col(cols="3")
            b-form-select(v-model='selected' :options='filteroptions')
          b-col(cols="9")
        b-row.firstcolborder
          b-col.d-flex.justify-content-center(cols="3").
            訂單編號
          b-col.d-flex.justify-content-center(cols="3").
            訂單日期
          b-col.d-flex.justify-content-center(cols="3").
            狀態
          b-col.d-flex.justify-content-center(cols="3").
            詳細資料
        b-row.colBorder(v-for='memberOrder in filterorders')
          b-col.d-flex.justify-content-center(cols="3").
            {{ memberOrder.identification }}
          b-col.d-flex.justify-content-center(cols="3").
            {{ memberOrder.date }}
          b-col.d-flex.justify-content-center(cols="3")
            span.sellColorNormal(:class='{\'sellColor\': memberOrder.orderStatus === "已付款"}') {{ memberOrder.orderStatus }}
          b-col.d-flex.justify-content-center(cols="3")
            b-btn.editbtn(variant="success" @click="showModel(memberOrder)")
              font-awesome-icon(:icon="['fas', 'search-plus']")
    b-modal#my-modal(size='lg' v-model="show" ref="my-modal" hide-header hide-footer)
      .w-70.mx-auto.my-5
        .title 訂單資料
        b-row.justify-content-between
          b-col#orderInfo(cols="auto")
            b-row.flex-column
              b-col.d-flex.mb-2
                span.mr-3 訂單編號
                span {{ orderTemp.identification }}
              b-col.d-flex.mb-2
                span.mr-3 下訂日期
                span {{ orderTemp.date }}
              b-col.d-flex.mb-2
                span.mr-3 預定日期
                span {{ orderTemp.arriveDate }}
              b-col.d-flex.mb-2
                span.mr-3 付款方式
                span {{ orderInfoTemp.payment }}
          b-col#orderStatus.sellColorNormal(cols="auto" :class='{\'sellColor\': orderTemp.orderStatus === "已付款"}').
            {{ orderTemp.orderStatus }}
        hr
        .title 訂購人資料
        b-row.flex-column
          b-col.d-flex.mb-2
            span.mr-3 姓名
            span {{ orderInfoTemp.userName }}
          b-col.d-flex.mb-2
            span.mr-3 信箱
            span {{ orderInfoTemp.userEmail }}
          b-col.d-flex.mb-2
            span.mr-3 電話
            span {{ orderInfoTemp.userTel }}
          b-col.d-flex.mb-2
            span.mr-3 地址
            span {{ orderInfoTemp.userAddress }}
          b-col.d-flex.mb-4
            span.mr-3 備註
            span {{ orderInfoTemp.other }}
        hr
        .title 訂購商品資料
        b-row.mb-2(v-for='(orderCartTemp, index) in orderCartTemps' :key="orderCartTemp.id")
            b-col(cols="4")
              span.proBig {{ orderCartTemp.name }}
              span.proSmall NT$ {{ orderCartTemp.price }}
            b-col.text-left(cols="2")
              span x {{ orderCartTemp.amount }} 個
            b-col(cols="3")
            b-col.text-right(cols="3")
              span.price NT$ {{ orderCartTemp.price*orderCartTemp.amount }}
        p.mt-4 總金額
          span.price  NT$ {{ orderTotalPrice }}
</template>

<style scoped lang="scss">
@import "../assets/scss/member.scss";
#member {
  color: #785651;
}
.title {
  margin-bottom: 5%;
  line-height: 1rem;
  text-align: center;
  color: #785651;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: .15rem;
}
.breadcrumb {
  background: transparent;
  letter-spacing: .15rem;
  font-size: .95rem;
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
  flex-direction: column;
  align-items: center;
  padding-bottom: 15%;
  padding-top: 2%;
  position: relative;
  top: 0;
  left: 0;
}
.w-70 {
  width: 70%;
}
.custom-select {
  border: none;
  color: #785651;
  &:focus {
    border: none;
    box-shadow: none;
  }
}
.input {
  border: none;
  background: rgb(248, 232, 212);
}
.custom-select {
  border: none;
  color: #785651;
  &:focus {
    border: none;
    box-shadow: none;
  }
}
.sellColorNormal {
  color: #af5b4e;
  font-weight: 500;
}
.sellColor {
  color: #a8a57c;
  font-weight: 500;
}
.addPro {
  background: #c5c4a6;
  border: none;
  font-weight: 400;
  height: 100%;
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
.col,
span,
p {
  color: #785651;
}
.colBorder {
  align-items: center;
  height: auto;
  padding: 1rem 0rem;
  border-bottom: 3px solid rgba(198,197,166,0.2);
  transition: .7s;
  &:hover{
    border-bottom: 3px solid rgba(198,197,166,0.8);
  }
}
.firstcolborder {
  align-items: center;
  font-size: .9rem;
  color: #785651;
  height: 3rem;
  border-bottom: 3px solid rgba(198,197,166,0.8);
}
.editbtn,
.delbtn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  background: transparent;
  color: #785651;
  border: none;
  transition: .6s;
  &:focus {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  &:active {
    color: #785651 !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  &:hover {
    transform: scale(1.2);
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
}
hr {
  width: 100%;
  border-top: 3px solid #a8a57c;
  opacity: .3;
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
.price {
  color: #af5b4e;
}
</style>

<script>
import Navbar from '../components/navbar.vue'
export default {
  name: 'Member',
  data () {
    return {
      memberOrders: [],
      show: false,
      orderTemp: {},
      orderInfoTemp: {},
      orderCartTemps: [],
      selected: '所有訂單',
      filteroptions: [
        { value: '所有訂單', text: '所有訂單' },
        { value: '未付款', text: '目前訂單' },
        { value: '已付款', text: '歷史訂單' }
      ]
    }
  },
  components: {
    Navbar
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    orderTotalPrice () {
      let total = 0
      this.orderCartTemps.forEach(item => {
        total += item.price * item.amount
      })
      return total
    },
    filterorders () {
      return this.memberOrders.filter((item) => {
        if (this.selected === '所有訂單') {
          return item
        } else {
          return item.orderStatus === this.selected
        }
      })
    }
  },
  methods: {
    showModel (memberOrder) {
      this.orderTemp = memberOrder
      this.orderInfoTemp = memberOrder.orderInfo[0]
      this.orderCartTemps = memberOrder.cartInfo
      console.log(this.orderCartTemps)
      this.show = true
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/orders/' + this.user.id)
      .then(res => {
        this.memberOrders = res.data.result.reverse()
      })
  }
}
</script>
