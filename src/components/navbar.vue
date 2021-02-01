<template lang='pug'>
  #navbar
    #top.mt-4
      b-row.w-87.h-100.mx-auto
        b-col.d-flex.align-items-center.justify-content-center(cols="auto")
          img.logo(:src="'./Home/logo08.png'" @click="toHome")
        //- b-col(cols="2" v-if="(user.id.length !== 0) && (admin.id.length === 0)")
        //- b-col(cols="6" v-if="(user.id.length === 0) && (admin.id.length !== 0)")
        //- b-col(cols="4" v-if="(user.id.length === 0) && (admin.id.length === 0)")
        b-col.d-flex.flex-column.align-items-center.justify-content-center.mr-4.ml-auto(cols="auto" @click="toAll" v-if="admin.id.length === 0")
          p.p-0.m-0.text-center 美味麵包
          p.p-0.m-0.text-center.tosmall.topSmall Delicious
        b-col.d-flex.flex-column.align-items-center.justify-content-center.mr-4(cols="auto" @click="toFav" v-if="admin.id.length === 0")
          p.p-0.m-0.text-center 收藏 ({{ favItemsLength }})
          p.p-0.m-0.text-center.tosmall.topSmall Fav
        b-col.d-flex.flex-column.align-items-center.justify-content-center.mr-4(cols="auto" @click="toCart" v-if="admin.id.length === 0")
          p.p-0.m-0.text-center 購物車 ({{ cartItemsLength }})
          p.p-0.m-0.text-center.tosmall.topSmall Cart
        b-col.d-flex.flex-column.align-items-center.justify-content-center.mr-4(cols="auto" @click="toMember" v-if="(user.id.length !== 0) && (admin.id.length === 0)")
          p.p-0.m-0.text-center 會員專區
          p.p-0.m-0.text-center.tosmall.topSmall Member
        b-col.d-flex.flex-column.align-items-center.justify-content-center.ml-auto.mr-4(cols="auto" @click="toAdmin" v-if="(admin.id.length !== 0) && (user.id.length === 0)")
          p.p-0.m-0.text-center 後台管理
          p.p-0.m-0.text-center.tosmall.topSmall Admin
        b-col.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="toLogin" v-if="(user.id.length === 0) && (admin.id.length === 0)")
          p.p-0.m-0.text-center 登入 / 註冊
          p.p-0.m-0.text-center.tosmall.topSmall Sing In / Sing Up
        b-col.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="adminLogout" v-if="(admin.id.length !== 0) && (user.id.length === 0)")
          p.p-0.m-0.text-center 登出
          p.p-0.m-0.text-center.tosmall.topSmall Log Out
        b-col.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="logout" v-if="(user.id.length !== 0) && (admin.id.length === 0)")
          p.p-0.m-0.text-center 登出
          p.p-0.m-0.text-center.tosmall.topSmall Log Out
</template>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";
#top {
  width: 100%;
  height: 10rem;
  // background: #c5c4a6;
  // box-shadow: 0 0 3px #c5c4a6;
  background: #fff;
  position: relative;
  // color: #fff;
  color: #c5c4a6;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: .03rem;
  &:after {
    content: '';
    width: 90%;
    height: 9.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-top:3.5px solid #c5c4a6;
    border-bottom:3.5px solid #c5c4a6;
    pointer-events: none;
    opacity: .5;
  }
}
.flex-column {
  position: relative;
  transition: .8s;
  // &::after {
  //     content: '';
  //     width: 0%;
  //     height: 60px;
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%,-50%);
  //     border-bottom:2px solid #fff;
  //     pointer-events: none;
  //     transition: .8s;
  //     opacity: 0;
  //   }
  &:hover {
    transform: scale(1.05);
    // &::after {
    //   width: 100%;
    //   opacity: 1;
    // }
  }
  &:active {
    transform: scale(.95);
  }
}
.tosmall {
  font-size: 0.8rem;
}
.w-87 {
  width: 87%;
}
.logo {
  height: 7.5rem;
  cursor: pointer;
}
p {
  cursor: pointer;
  // span {
  //   width: 10px;
  //   height: 10px;
  //   background: orange;
  //   border-radius: 50%;
  //   top: 0;
  //   left: 0;
  // }
}
.topSmall {
  font-size: 0.8rem;
  font-weight: lighter;
  margin: 0;
}
</style>

<script>
export default {
  name: 'navbar',
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    admin () {
      return this.$store.state.admin
    },
    favItemsLength () {
      return this.$store.getters.favItemsLength
    },
    cartItemsLength () {
      return this.$store.getters.cartTotalAmount
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/regandlogin')
    },
    toAll () {
      this.$router.push('/allProducts')
    },
    toAdmin () {
      this.$router.push('/admin')
    },
    toFav () {
      this.$router.push('/fav')
    },
    toCart () {
      this.$router.push('/cart')
    },
    toMember () {
      this.$router.push('/member')
    },
    toHome () {
      this.$router.push('/')
    },
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

            this.$store.commit('logout')

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
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    },
    adminLogout () {
      this.axios.delete(process.env.VUE_APP_API + '/admins/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '登出成功'
            })
            this.$store.commit('adminLogout')
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
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        })
    }
  }
}
</script>
