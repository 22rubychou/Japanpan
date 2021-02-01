<template lang="pug">
  #login
    #container
      b-row
        b-col(cols="12")
          b-form(@submit.prevent="onSubmit" @reset="onReset")
            .inputBox
              b-form-group#input-group-1.label.m-0(
                label="帳號"
                label-for="loginAccount"
                :state="accountState"
                invalid-feedback="帳號格式不符"
              )
              b-form-input#loginAccount.input(
                v-model="account"
                type="text"
                required
                placeholder="帳號長度為 4 ~ 20 個字"
                :state="accountState"
              )
            .inputBox
              b-form-group#input-group-2(
                label="密碼"
                label-for="loginPassword"
                :state="passwordState"
                description="密碼長度為 4 ~ 20 個字"
                invalid-feedback="密碼格式不符"
              )
                b-form-input#loginPassword.input(
                  v-model="password"
                  type="password"
                  required
                  placeholder="請輸入密碼..."
                  :state="passwordState"
                )
            div.text-center
              b-btn.loginBtn.mx-1(variant="success" type="submit") 登入
</template>
<style lang="scss" scoped>
#container {
  width: 80%;
  height: auto;
  margin: auto;
}
.label {
  width: 20%;
  margin: 0;
  color: #7c7a4e;
}
.input{
  width: 80%;
  height: 45px;
  border: 1px solid #c5c4a6;
  background: #fff;
  border-radius: 15rem;
}
.input::placeholder {
  color: #c5c4a6;
  font-size: .8rem;
}
#container .input .text-muted{
  position: absolute;
  color: #c5c4a6 !important;
  opacity: .5;
}
.inputBox {
  display: flex;
  align-items: center;
  label#input-group-1__BV_label_ {
    margin: 0 !important;
  }
}
.loginBtn {
  width: 100%;
  height: 50px;
  border-radius: 15rem;
  background:#c5c4a6;
  border: none;
}
</style>

<script>
export default {
  name: 'Reg',
  data () {
    return {
      account: '',
      password: ''
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
    },
    onReset () {
      this.account = ''
      this.password = ''
    }
  }
}
</script>
