<template lang='pug'>
  #navbar.mt-3.d-flex.align-items-center
    b-row.w-90.mx-auto
      b-col.d-flex.align-iems-start.pl-0(cols="3")
        img.logo(:src="'./Home/logo08.png'" @click="toHome")
      b-col.d-flex.flex-column.justify-content-around.px-0(cols="9")
        #icons.d-flex.justify-content-end.h-10
          font-awesome-icon.icon.ml-auto.mr-4(:icon="['fab', 'instagram']")
          font-awesome-icon.icon(:icon="['fab', 'facebook-square']")
        #items.d-flex.justify-content-end.h-90
          b-row.justify-content-end
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="toAll" v-if="admin.id.length === 0")
              p.p-0.m-0.text-center 美味麵包
              p.p-0.m-0.text-center.tosmall.topSmall Delicious
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="toFav" v-if="admin.id.length === 0")
              .favItem(v-if="favItemsLength !== 0") {{ favItemsLength }}
              p.p-0.m-0.text-center 收藏
              p.p-0.m-0.text-center.tosmall.topSmall Fav
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="toCart" v-if="admin.id.length === 0")
              .cartItem(v-if="cartItemsLength !== 0") {{ cartItemsLength }}
              p.p-0.m-0.text-center 購物車
              p.p-0.m-0.text-center.tosmall.topSmall Cart
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="toMember" v-if="(user.id.length !== 0) && (admin.id.length === 0)")
              p.p-0.m-0.text-center 會員專區
              p.p-0.m-0.text-center.tosmall.topSmall Member
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="toAdmin" v-if="(admin.id.length !== 0) && (user.id.length === 0)")
              p.p-0.m-0.text-center 後台管理
              p.p-0.m-0.text-center.tosmall.topSmall Admin
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="toLogin" v-if="(user.id.length === 0) && (admin.id.length === 0)")
              p.p-0.m-0.text-center 登入 / 註冊
              p.p-0.m-0.text-center.tosmall.topSmall Sign In / Sign Up
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="adminLogout" v-if="(admin.id.length !== 0) && (user.id.length === 0)")
              p.p-0.m-0.text-center 登出
              p.p-0.m-0.text-center.tosmall.topSmall Log Out
            b-col.dec.d-flex.flex-column.align-items-center.justify-content-center(cols="auto" @click="logout" v-if="(user.id.length !== 0) && (admin.id.length === 0)")
              p.p-0.m-0.text-center 登出
              p.p-0.m-0.text-center.tosmall.topSmall Log Out
</template>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";
#navbar {
  width: 100%;
  height: 9rem;
  top: 0;
  left: 0;
  // background: #c5c4a6;
  // box-shadow: 0 0 3px #c5c4a6;
  background: #fff;
  position: relative;
  // color: #fff;
  color: #967f7a;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: .01rem;
  &::after {
    content: '';
    width: 85%;
    height: 9rem;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    border-top: 3px solid #c5c4a69e;
    border-bottom: 3px solid #c5c4a69e;
    pointer-events: none;
  }
}
// #items {
//   margin-right: 1.2rem;
// }
.dec {
  margin: 0 1.2rem 0 4rem;
  padding: 0;
  position: relative;
  transition: .5s;
  &:hover {
    color: #785651;
    &::after {
      color: #785651;
    }
    &::before {
      color: #785651;
    }
  }
  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   left: -1.2rem;
  //   width: .7rem;
  //   height: 1px;
  //   transition: .8s;
  //   border-top: 2px solid #967f7a;
  // }
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   right: -1.2rem;
  //   width: .7rem;
  //   height: 1px;
  //   transition: .8s;
  //   border-top: 2px solid #967f7a;
  // }
}
.cartItem {
  position: absolute;
  right: -30%;
  top: -25%;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #c5c4a69e;
  color: #967f7ac4;
  font-size: .5rem;
  font-weight: 500;
  // opacity: .5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
.favItem {
  position: absolute;
  right: -50%;
  top: -25%;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #c5c4a69e;
  color: #967f7ac4;
  font-size: .5rem;
  font-weight: 500;
  // opacity: .5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.icon {
  font-size: 1.7rem;
  cursor: pointer;
  transition: .5s;
  &:hover {
    color: #785651;
  }
}
.tosmall {
  font-size: 0.8rem;
}
.w-90 {
  width: 80%;
}
.logo {
  height: 7rem;
  cursor: pointer;
  padding-top: .7rem;
  padding-bottom: .7rem;
}
p {
  cursor: pointer;
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
