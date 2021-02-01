<template lang='pug'>
  #cart(:class='{\'cartOverFlow\': cartItems.length <= 0}')
    Navbar
    b-breadcrumb.mt-5
      b-breadcrumb-item(to='/') 首頁
      b-breadcrumb-item(active) 購物車
    form-wizard.form-wizard.my-3(v-if="cartItems.length > 0" error-color="#a94442" color=" #c5c4a6" @on-complete="orderComplete" back-button-text="上一步" next-button-text="下一步" finish-button-text="送出訂單")
      #title(slot='title')
      tab-content.mt-3.mb-4(title='確認商品' :before-change="islogin")
        //- b-row.row.mt-5
        //-   b-col.col.py-0
        //-     #proImg
        //-     b-row#proInfo
        //-       b-col.proTop(cols="12" md="3").
        //-         商品
        //-       b-col(cols="0" md="1")
        //-       b-col.proTop(cols="12" md="3").
        //-         數量
        //-       b-col.proTop(cols="12" md="3").
        //-         價格
        //-       b-col.proTop(cols="12" md="2").
        //-         刪除
        b-row.row
          b-col.col.colBorder(cols="12" v-for='(cartItem, index) in cartItems' :key='cartItem.productId')
            .proImg
              img.image(:src='cartItem.imageUrl')
            b-row#proInfo
              b-col#proName(cols="12" md="3")
                span.proBig {{ cartItem.name }}
                span.proSmall 單價 NT$ {{ cartItem.price }}
              b-col(cols="0" md="2")
              b-col#proAmout(cols="12" md="3")
                b-form-spinbutton#amountInput.spinbutton(v-model='cartItem.amount' @change='updateCount(cartItem.amount)' min='1' max='100')
              b-col.proPrice(cols="12" md="3").
                NT$ {{ cartItem.amount*cartItem.price }}
              b-col#proDel(cols="12" md="1")
                b-button.delbtn(@click="delCart(cartItem)")
                  span x
          p.totalPrice 總金額
            span.pl-3 NT$ {{ cartTotalPrice }}
      tab-content.my-3.mb-5(title='填寫資料' :before-change="beforeConfirm")
        b-row.w-50
          b-col.form-group(cols="12")
            label(for='username')
              | 收件人姓名
              span.text-danger *
            input.form-control#username(type='text' name='name' :class='{\'is-invalid\':errors.has(\'name\')}' v-model='orderInfo.userName' placeholder='輸入姓名' v-validate='\'required\'')
            span.text-danger(v-if='errors.has(\'name\')') 須輸入姓名
          b-col.form-group(cols="12")
            label(for='usertel')
              | 收件人電話
              span.text-danger *
            input.form-control#usertel(type='tel' name='tel' :class='{\'is-invalid\':errors.has(\'tel\')}' v-model='orderInfo.userTel' placeholder='輸入電話' v-validate='\'required\'')
            span.text-danger(v-if='errors.has(\'tel\')') 須輸入電話
          b-col.form-group(cols="12")
            label(for='useremail')
              | 收件人電子信箱
              span.text-danger *
            input.form-control#useremail(type='email' name='email' :class='{\'is-invalid\':errors.has(\'email\')}' v-model='orderInfo.userEmail' placeholder='請輸入 Email' v-validate='\'required|email\'')
            span.text-danger(v-if='errors.has(\'email\')') {{ errors.first('email') }}
          b-col.form-group(cols="12")
            label(for='useraddress')
              | 收件人地址
              span.text-danger *
            input.form-control#useraddress(type='text' name='address' :class='{\'is-invalid\':errors.has(\'address\')}' v-model='orderInfo.userAddress' placeholder='輸入姓名' v-validate='\'required\'')
            span.text-danger(v-if='errors.has(\'address\')') 須輸入地址
          b-col.form-group(cols="12")
            label(for='arriveDate')
              | 送達日
              span.text-danger *
            b-form-input#arriveDate(v-model='arriveDate' type="date")
          hr.w-100
          b-col.form-group(cols="12")
            label(for='payment')
              | 付款方式
            b-form-radio#payment(v-model='orderInfo.payment' name='some-radios' value='貨到付款' checked) 貨到付款
          b-col.form-group(cols="12")
            label(for='textarea')
              | 備註
            b-form-textarea#textarea(v-model='orderInfo.other' placeholder='有任何特殊需求可以寫在這裡' rows='1' max-rows='6')
      tab-content.mt-3.mb-5(title='送出訂單')
        b-row.row
          b-col#left(cols="12" md="5")
            p.title 商品資料
            b-row.flexColumn
                b-col#finalPro.d-flex.align-items-center.justify-content-center(v-for='(cartItem, index) in cartItems' :key='cartItem.id')
                  #finalImg.mr-2.w-50
                    img.image(:src='cartItem.imageUrl')
                  .flexColumn.w-50
                    p.m-0 {{ cartItem.name }}
                    p.proSmall.m-0.pt-1.pb-3 單價 NT$ {{ cartItem.price }}
                    p.m-0.d-flex.justify-content-between.align-items-center
                      span x{{ cartItem.amount }}
                      span.proPrice NT$ {{ cartItem.amount*cartItem.price }}
                p.totalPrice.mt-3 總金額
                  span.pl-3 NT$ {{ cartTotalPrice }}
          b-col#right.flexColumn(cols="12" md="7")
            p.title 基本資料
            #finalInfo
              b-row
                b-col(cols="5")
                  p 姓名
                b-col(cols="7")
                  p {{ orderInfo.userName }}
              b-row
                b-col(cols="5")
                  p 電話
                b-col(cols="7")
                  p {{ orderInfo.userTel }}
              b-row
                b-col(cols="5")
                  p 信箱
                b-col(cols="7")
                  p {{ orderInfo.userEmail }}
              b-row
                b-col(cols="5")
                  p 地址
                b-col(cols="7")
                  p {{ orderInfo.userAddress }}
              b-row
                b-col(cols="5")
                  p 送達日期
                b-col(cols="7")
                  p {{ arriveDate }}
              b-row
                b-col(cols="5")
                  p 付款方式
                b-col(cols="7")
                  p {{ orderInfo.payment }}
              b-row
                b-col(cols="5")
                  p 備註
                b-col(cols="7")
                  p {{ orderInfo.other }}
    #container.mt-2.mt-md-3(v-if="cartItems.length == 0")
      h4.text-center.mb-4 購物車裡目前沒有任何商品喔，可以來這裡看看~
      .proImg.mb-4
          img.image(:src="'./Home/fox03.png'")
      b-button.proBtn(variant="danger" to='/allProducts') 商品頁
</template>

<style scoped lang="scss">
@import "../assets/scss/cart.scss";
.cartOverFlow {
  height: 100vh;
  overflow-y: hidden;
}
#container {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 15%;
  align-items: center;
  color: #785651;
  letter-spacing: .2rem;
  .proBtn {
    background: #c5c4a6;
    border: none;
    font-weight: 300;
    margin-top: 3%;
    width: 30%;
    padding: 1% 0;
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
.form-wizard {
  width: 80%;
  margin: auto;
  line-height: 3rem;
  font-weight: 400;
  font-size: .9rem;
  letter-spacing: .15rem;
  border: none;
  box-shadow: none;
}
#title,
.title {
    color: #785651;
    font-weight: 400;
    font-size: 1.2rem;
    margin: 0;
  }
.title {
  margin-bottom: 3%;
  line-height: 3rem;
  text-align: center;
}
.vue-form-wizard .navbar .navbar-nav>li>a.wizard-btn {
  font-size: 5rem !important;
  font-weight: 200 !important;
}
.row {
  width: 90%;
  margin: auto;
  color: #785651;
}
.col {
  width: 100%;
  display: flex;
  padding: 2% 0 2% 0;
}
.colBorder {
  height: 12rem;
  border-bottom: 3px solid rgba(198,197,166,0.2);
  transition: .7s;
  &:hover{
    border-bottom: 3px solid rgba(198,197,166,0.8);
  }
}
.proImg {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.pro {
  padding-left: 1rem;
}
#proInfo {
  width: calc(100% - 12rem);
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
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
#proDel {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  cursor: pointer;
  .delbtn {
    background: transparent;
    border: none;
    color: #785651;
    transition: .6s;
    &:focus {
      border: none;
      box-shadow: none;
    }
    &:active {
    transform: scale(.7);
    }
    &:hover {
      transform: scale(1.2);
    }
  }
}
#proAmout {
  display: flex;
  justify-content: center;
  .b-form-spinbutton{
  width: 100%;
  border: none !important;
  color: #785651 !important;
  }
}
.totalPrice {
  width: 100%;
  padding-top: 2%;
  padding-left: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: .06rem;
  span {
    font-size: 1.2rem;
    letter-spacing: 0rem;
    color: #af5b4e;
  }
}
@media (min-width: 768px) {
  .totalPrice {
    padding-left: 2%;
    text-align: left;
  }
}
hr {
  width: 80%;
  border-top: 3px solid #a8a57c;
  opacity: .3;
}
.form-group {
  line-height: 1.2rem;
  margin-bottom: 1.2rem;
}
.flexColumn {
  line-height: 1.3rem;
  display: flex;
  flex-direction: column;
}
#textarea::placeholder,
#username::placeholder,
#usertel::placeholder,
#useremail::placeholder,
#useraddress::placeholder,
#arriveDate::placeholder,
#payment label {
  font-size: .8rem;
  color: #7856515d;
}
#textarea,
#username,
#usertel,
#useremail,
#useraddress,
#arriveDate,
#textarea:focus,
#username:focus,
#usertel:focus,
#useremail:focus,
#useraddress:focus,
#arriveDate:focus {
  display: flex;
  padding-left: .2rem;
  align-items: center;
  color: #785651;
  border:1px solid #7856519c;
  box-shadow: none;
}
label {
  font-size: 1rem;
}
.custom-radio {
  font-size: .95rem;
}
#finalImg {
  width: 8rem;
  height: 8rem;
}
#finalPro {
  font-size: 1rem;
  padding: 5% 0%;
  border-bottom: 3px solid rgba(198,197,166,0.2);
  transition: .7s;
  &:hover{
    border-bottom: 3px solid rgba(198,197,166,0.8);
  }
}
#right {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
}
#finalInfo {
  display: flex;
  width: auto;
  line-height: 2rem;
  margin: 0 auto;
  font-size: 1rem;
  align-items: center;
  flex-direction: column;
  padding: 0;
}
</style>

<script>
import Navbar from '../components/navbar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      orderInfo: {
        userName: '',
        userTel: '',
        userEmail: '',
        userAddress: '',
        payment: '貨到付款',
        other: ''
      },
      arriveDate: '',
      orderStatus: '未付款'
    }
  },
  components: {
    Navbar
  },
  computed: {
    ...mapGetters([
      'cartTotalPrice',
      'cartItems'
    ]),
    user () {
      return this.$store.getters.user
    },
    todayDate () {
      const oridate = new Date()
      return (oridate.getFullYear() + '-' + (oridate.getMonth() + 1) + '-' + oridate.getDate())
    }
  },
  methods: {
    islogin () {
      if (this.user.id.length === 0) {
        this.$swal({
          icon: 'warning',
          title: '未登入',
          text: '請先登入喔'
        })
        this.$router.push('/regandlogin')
      } else {
        return true
      }
    },
    updateCount (val) {
      this.$store.commit('updateProduct', val)
    },
    uppdateItem (cartItem) {
      this.$store.commit('uppdateItem', cartItem)
    },
    delCart (cartItem) {
      this.$store.commit('delCartProduct', cartItem)
    },
    orderComplete () {
      const identification = Date.now()
      let arriveDate = this.arriveDate.split('-')
      toString(parseInt(arriveDate[0]))
      arriveDate = parseInt(arriveDate[0]) + '-' + parseInt(arriveDate[1]) + '-' + parseInt(arriveDate[2])
      const fd = {
        userId: this.user.id,
        identification: identification,
        date: this.todayDate,
        arriveDate: arriveDate,
        orderInfo: this.orderInfo,
        cartInfo: this.cartItems,
        orderStatus: this.orderStatus
      }
      console.log(fd)

      this.axios.post(process.env.VUE_APP_API + '/orders', fd)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('clearCart')
            this.$swal({
              icon: 'success',
              title: '已成功送出訂單，可至會員專區查看訂單',
              text: `訂單編號為 ${identification}`,
              timer: 4000,
              showConfirmButton: false
            })
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
    beforeConfirm () {
      const todaySplit = this.todayDate.split('-')
      const arriveDateSplit = this.arriveDate.split('-')
      const todayY = parseInt(todaySplit[0])
      const arriveY = parseInt(arriveDateSplit[0])
      const todayM = parseInt(todaySplit[1])
      const arriveM = parseInt(arriveDateSplit[1])
      const todayD = parseInt(todaySplit[2])
      const arriveD = parseInt(arriveDateSplit[2])
      if (!this.orderInfo.userName || !this.orderInfo.userTel || !this.orderInfo.userEmail || !this.orderInfo.userAddress || !this.orderInfo.payment || !this.arriveDate) {
        this.$validator.validate()
        return false
      } else {
        if (todayY > arriveY) {
          this.$swal({
            toast: true,
            position: 'top-end',
            icon: 'error',
            text: '請選擇今天之後的日期',
            timer: 2000,
            showConfirmButton: false
          })
          return false
        } else if ((todayY <= arriveY) && (todayM > arriveM)) {
          this.$swal({
            toast: true,
            position: 'top-end',
            icon: 'error',
            text: '請選擇今天之後的日期',
            timer: 2000,
            showConfirmButton: false
          })
          return false
        } else if ((todayY <= arriveY) && (todayM === arriveM) && (todayD >= arriveD)) {
          this.$swal({
            toast: true,
            position: 'top-end',
            icon: 'error',
            text: '請選擇今天之後的日期',
            timer: 2000,
            showConfirmButton: false
          })
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>
