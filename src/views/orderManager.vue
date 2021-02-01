<template lang='pug'>
  #orderManager
    .title 訂單管理
    b-row.mb-5
      b-col(cols="3")
        b-form-select(v-model='selected' :options='filteroptions')
      b-col(cols="9")
    b-row.firstcolborder
      b-col.d-flex.justify-content-center(cols="2").
        編輯
      b-col.d-flex.justify-content-center(cols="3").
        訂單編號
      b-col.d-flex.justify-content-center(cols="3").
        訂單日期
      b-col.d-flex.justify-content-center(cols="3").
        狀態
      b-col.d-flex.justify-content-center(cols="1").
        刪除
    b-row.colBorder(v-for='(order, index) in filterorders')
      b-col.d-flex.justify-content-center(cols="2")
        b-btn.editbtn(variant="success" @click="showModel(order)")
          font-awesome-icon(:icon="['fas', 'edit']")
      b-col.d-flex.justify-content-center(cols="3").
        {{ order.identification }}
      b-col.d-flex.justify-content-center(cols="3").
        {{ order.date }}
      b-col.d-flex.justify-content-center(cols="3")
        span.sellColorNormal(:class='{\'sellColor\': order.orderStatus === "已付款"}') {{ order.orderStatus }}
      b-col.d-flex.justify-content-center(cols="1")
        b-btn.delbtn.d-flex.justify-content-center(variant="danger" @click="delOrder(order, index)")
          span x
    b-modal#modal(size='lg' v-model="show" ref="my-modal" title='訂單資料' hide-header hide-footer)
      form.w-75.mx-auto(@submit.prevent='submit')
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
                label.mr-3(for='payment') 付款方式
                b-form-radio#payment(v-model='orderInfoTemp.payment' value='貨到付款' checked) 貨到付款
          b-col#orderStatus(cols="auto")
            b-form-select#status(v-model='orderStatus' :options='options' :class='{\'sellColor\': orderStatus === "已付款"}')
        hr
        .title 訂購人資料
        b-row.flex-column
          b-col.d-flex.mb-2
            label.w-auto.mr-3(for='name') 姓名
            input#name.input.w-75(type='text' placeholder='輸入' v-model='orderInfoTemp.userName')
          b-col.d-flex.mb-2
            label.w-auto.mr-3(for='email') 信箱
            input#email.input.w-75(type='text' placeholder='輸入' v-model='orderInfoTemp.userEmail')
          b-col.d-flex.mb-2
            label.w-auto.mr-3(for='tel') 電話
            input#tel.input.w-75(type='text' placeholder='輸入' v-model='orderInfoTemp.userTel')
          b-col.d-flex.mb-2
            label.w-auto.mr-3(for='address') 地址
            input#address.input.w-75(type='text' placeholder='輸入' v-model='orderInfoTemp.userAddress')
          b-col.d-flex.mb-4
            label.w-auto.mr-3(for='other') 備註
            b-form-textarea#other.input.w-75(type='text' placeholder='輸入' v-model='orderInfoTemp.other')
        hr
        .title 訂購商品資料
        b-row.mb-2(v-for='(orderCartTemp, index) in orderCartTemps')
          b-col(cols="3")
            span.proBig {{ orderCartTemp.name }}
            span.proSmall NT$ {{ orderCartTemp.price }}
          b-col.text-center(cols="2")
            span x {{ orderCartTemp.amount }}
          b-col(cols="3")
          b-col.text-center(cols="3")
            span.price NT$ {{ orderCartTemp.price*orderCartTemp.amount }}
          b-col.text-right(cols="1")
            b-button.delbtn(id="show-btn" variant='danger' @click="delOrderPro(index)")
              span x
        #modal-footer.d-flex.justify-content-center.my-4
          b-button.confirmBtn.mr-5(id="show-btn" variant='success' @click="updateOrder") 確認
          b-button.cancelBtn(id="show-btn" variant='primary' @click="closeModel") 取消
</template>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";
#orderManager {
  color: #785651;
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
#status {
  width: 100px;
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
  transition: .6s;
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
.colBorder {
  align-items: center;
  height: auto;
  padding: .5rem 0rem;
  border-bottom: 3px solid rgba(198,197,166,0.2);
  transition: .6s;
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
.flexColumn {
  line-height: 1.3rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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
.confirmBtn,
.cancelBtn {
  width: 30%;
  height: 3rem;
}
.cancelBtn {
  background: #785651;
  border: none;
  font-weight: 300;
  transition: .8s;
  &:hover {
    background: #7856519c !important;
  }
  &:active {
    transform: scale(.9);
  }
  &:focus {
    box-shadow: none !important;
  }
}
.confirmBtn {
  background: #a8a57c;
  border: none;
  font-weight: 300;
  transition: .8s;
  &:hover {
    background: #c5c4a6 !important;
  }
  &:active {
    transform: scale(.9);
  }
  &:focus {
    box-shadow: none !important;
  }
}
hr {
  width: 100%;
  border-top: 3px solid #a8a57c;
  opacity: .3;
}
.col,
.input,
span {
  color: #785651
}
label,
#radio {
  font-size: 1rem;
  color: #785651
}
#name::placeholder,
#tel::placeholder,
#email::placeholder,
#address::placeholder,
#other::placeholder {
  font-size: .8rem;
  color: #7856515d;
}

#name,
#email,
#tel,
#address,
#other,
#textarea:focus,
#email:focus,
#name:focus,
#tel:focus,
#address:focus,
#other:focus {
  padding-left: .2rem;
  color: #785651;
  border:1px solid #7856519c;
  border-radius: .2rem;
  box-shadow: none;
}
label {
  font-size: 1rem;
}
.custom-radio {
  font-size: .95rem;
}
.input {
  line-height: 1.2rem;
}
</style>

<script>
export default {
  name: 'orderManager',
  data () {
    return {
      orders: [],
      show: false,
      orderTemp: {},
      orderInfoTemp: {},
      orderCartTemps: [],
      orderStatus: '',
      selected: '全部',
      filteroptions: [
        { value: '全部', text: '全部' },
        { value: '未付款', text: '未付款' },
        { value: '已付款', text: '已付款' }
      ],
      options: [
        { value: '未付款', text: '未付款' },
        { value: '已付款', text: '已付款' }
      ]
    }
  },
  methods: {
    showModel (order) {
      this.show = true
      this.orderTemp = order
      this.orderInfoTemp = Object.assign({}, order.orderInfo[0])
      this.orderCartTemps = Object.assign([], order.cartInfo)
      this.orderStatus = order.orderStatus
    },
    closeModel () {
      this.show = false
    },
    delOrderPro (index) {
      this.orderCartTemps.splice(index, 1)
    },
    delOrder (order, index) {
      this.axios.delete(process.env.VUE_APP_API + '/orders/' + order._id)
        .then(res => {
          if (res.data.success) {
            this.orders.splice(index, 1)
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    },
    updateOrder () {
      const fd = {
        userId: this.orderTemp.userId,
        date: this.orderTemp.todayDate,
        arriveDate: this.orderTemp.arriveDate,
        orderInfo: this.orderInfoTemp,
        cartInfo: this.orderCartTemps,
        orderStatus: this.orderStatus
      }
      this.axios.patch(process.env.VUE_APP_API + '/orders/' + this.orderTemp._id, fd)
        .then(res => {
          if (res.data.success) {
            const order = this.filterorders.find((item) => {
              return item._id === this.orderTemp._id
            })
            order.orderInfo[0] = this.orderInfoTemp
            order.cartInfo = this.orderCartTemps
            order.orderStatus = this.orderStatus
            this.show = false
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/orders/')
      .then(res => {
        this.orders = res.data.result.reverse()
      })
  },
  computed: {
    filterorders () {
      return this.orders.filter((item) => {
        if (this.selected === '全部') {
          return item
        } else {
          return item.orderStatus === this.selected
        }
      })
    }
  }
}
</script>
