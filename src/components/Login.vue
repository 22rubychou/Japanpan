<template lang="pug">
  #login
    #container
      b-row
        b-col(cols="12")
          b-form(@submit.prevent="onSubmit" @reset="onReset")
            .inputBox.mb-4
              b-form-group#input-group-1.label(
                label="帳號"
                label-for="loginAccount"
                :state="accountState"
              )
              b-form-input#loginAccount.input(
                v-model="account"
                type="text"
                required
                placeholder="請輸入帳號..."
                :state="accountState"
              )
            .inputBox
              b-form-group#input-group-2.label(
                label="密碼"
                label-for="loginPassword"
                :state="passwordState"
              )
              b-form-input#loginPassword.input(
                v-model="password"
                type="password"
                required
                placeholder="請輸入密碼..."
                :state="passwordState"
              )
        b-col.mt-4(cols="12")
          b-form-checkbox#checkbox-1(v-model='status' name='checkbox-1' value='admin' unchecked-value='user').
            管理者登入
          b-btn.loginBtn(variant="success" type="submit" @click="onSubmit") 登入
        b-col.mt-1(cols="12")
          .smallText.text-center 帳號與密碼長度為 4 ~ 20 個字
</template>
<style lang="scss" scoped>
#container {
  width: 60%;
  position: relative;
  height: auto;
  color: #785651;
}
.label {
  width: 20%;
  margin: 0;
  color: #785651;
}
.input{
  width: 80%;
  height: 45px;
  background: #fff;
  border-top: none;
  border-right: none;
  border-left: none;
  border-radius: 0rem;
  border-bottom: 2px solid #7856517c;
}
.input::placeholder {
  color: #7856517c;
  font-size: .8rem;
}
#container .input .text-muted{
  position: absolute;
  color: #785651 !important;
  opacity: .5;
}
.inputBox {
  display: flex;
  align-items: center;
  label#input-group-1__BV_label_ ,
  label#input-group-2__BV_label_ {
    margin: 0 !important;
  }
}
.loginBtn {
  background: #c5c4a6;
  border: none;
  font-weight: 300;
  width: 100%;
  height: 50px;
  transition: .8s;
  &:hover {
    background: #a8a57c !important;
  }
  &:active {
    transform: scale(.9);
  }
  &:focus {
    border: none !important;
    box-shadow: none !important;
  }
}
.smallText {
  font-weight: 300;
  font-size: 0.5rem;
  color: #af5b4e;
  padding-top: 1%;
}
</style>

<script>
export default {
  name: 'Reg',
  data () {
    return {
      account: '',
      password: '',
      status: 'user'
    }
  },
  computed: {
    accountState () {
      if (this.account.length === 0) {
        return null
      } else if (this.account.length >= 4 && this.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState () {
      if (this.password.length === 0) {
        return null
      } else if (this.password.length >= 4 && this.password.length <= 20) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onSubmit () {
      // 如果帳號密碼驗證通過
      if (!this.accountState || !this.passwordState) {
        this.$swal({
          icon: 'error',
          title: '帳號或密碼格式錯誤'
        })
      }
      if (this.status === 'admin') {
        if (this.accountState && this.passwordState) {
          this.axios.post(process.env.VUE_APP_API + '/admins/login', this.$data)
            .then(res => {
              if (res.data.success) {
                this.$store.commit('adminLogin', res.data.result)
                this.$swal({
                  icon: 'success',
                  title: '登入成功'
                }).then(() => {
                  // sweet alert 對話框關掉後才跳到相簿頁
                  this.$router.push('/')
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: '發生錯誤',
                  text: res.data.message
                })
              }
            })
            .catch(err => {
              this.$swal({
                icon: 'error',
                title: '發生錯誤',
                text: err.response.data.message
              })
            })
        }
      }
      if (this.status === 'user') {
        if (this.accountState && this.passwordState) {
          this.axios.post(process.env.VUE_APP_API + '/users/login', this.$data)
            .then(res => {
              if (res.data.success) {
                this.$store.commit('login', res.data.result)
                this.$swal({
                  icon: 'success',
                  title: '登入成功'
                }).then(() => {
                  // sweet alert 對話框關掉後才跳到相簿頁
                  this.$router.push('/')
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: '發生錯誤',
                  text: res.data.message
                })
              }
            })
            .catch(err => {
              this.$swal({
                icon: 'error',
                title: '發生錯誤',
                text: err.response.data.message
              })
            })
        }
      }
    },
    onReset () {
      this.account = ''
      this.password = ''
    }
  }
}
</script>
