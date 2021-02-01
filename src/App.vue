<template lang="pug">
  div#app
    transition(name='slide' mode='out-in')
      router-view(:key="$route.fullPath")
</template>

<style>
  #app{
    overflow: hidden;
  }
  .wizard-progress-with-circle {
    display: none;
  }
  /*producy.vue-------------------------*/
  .form-control.focus {
    box-shadow: none !important;
  }
  .b-form-spinbutton .btn {
    color: #785651 !important;
    transition: .4s;
  }
  .b-form-spinbutton .btn:hover {
    transform: scale(1.2);
  }
  .b-form-spinbutton .btn:active {
    transform: scale(.8);
  }
  #amountInput {
    border: none !important ;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.5s;
  }

  .slide-enter,
  .slide-leave-to {
    opacity: 0;
  }
</style>

<script>
export default {
  name: 'App',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '登出成功'
            })

            // 清除 vuex
            this.$store.commit('logout')

            // 導回首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    },
    heartbeat () {
      this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.user.id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: '登入時效已過'
              })
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '發生錯誤'
          })
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>
