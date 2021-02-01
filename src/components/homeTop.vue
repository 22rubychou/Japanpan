<template lang='pug'>
  #homeTop
    #top
      b-navbar.navbar(toggleable='lg' type="dark" :class="{ 'navbar--hidden': !showNavbar, 'navBg': showNavbarBg }")
        .con
          b-navbar-brand.topLogo(to='/')
            img(:src="'./Home/logo02.png'" :class="{ 'topLogohide': !showNavbarBg, 'topLogoShow': showNavbarBg }")
          b-navbar-toggle(target='nav-collapse')
          b-collapse#nav-collapse(is-nav)
            b-navbar-nav.mr-auto(:class="{ 'textShadow': !showNavbarBg }")
              b-nav-item.nav-item.mr-4
                a(href='#section01' v-smooth-scroll) 首頁
                  p.topSmall.text-center Home
              b-nav-item.nav-item.mr-4
                a(href='#section02' v-smooth-scroll='{ duration: 1000, offset: -50 }') 關於我們
                  p.topSmall.text-center About Us
              b-nav-item.nav-item.mr-4(to='/allProducts') 美味麵包
                  p.topSmall.text-center Delicious
            b-navbar-nav.ml-auto(v-if="(user.id.length === 0) && (admin.id.length === 0)" :class="{ 'textShadow': !showNavbarBg }")
              b-nav-item.nav-item.mr-4(to='/fav').text-center 收藏({{ favItemsLength }})
                p.topSmall.text-center Fav
              b-nav-item.nav-item.mr-4(to='/cart').text-center 購物車({{ cartItemsLength }})
                p.topSmall.text-center Cart
              b-nav-item.nav-item.text-center(to='/regandlogin') 登入 / 註冊
                p.topSmall.text-center Sing In / Sing Up
            b-navbar-nav.ml-auto(v-if="(user.id.length !== 0) && (admin.id.length === 0)")
              b-nav-item.nav-item.mr-4(to='/fav').text-center 收藏({{ favItemsLength }})
                p.topSmall.text-center Fav
              b-nav-item.nav-item.ml-sm-4.text-center.mr-4(to='/cart') 購物車
                p.topSmall.text-center Cart
              b-nav-item.nav-item(to='/member').text-center.mr-4 會員專區
                p.topSmall.text-center.text-center Member
              b-nav-item.nav-item.ml-sm-4.text-center(@click="logout") 登出
                p.topSmall.text-center Log Out
            b-navbar-nav.ml-auto(v-if="(admin.id.length !== 0) && (user.id.length === 0)")
              b-nav-item.nav-item.text-center(to='/admin') 管理者頁面
                p.topSmall.text-center.text-center Admin
              b-nav-item.nav-item.ml-sm-4.text-center(@click="adminLogout") 登出
                p.topSmall.text-center Log Out
</template>

<style lang="scss" scoped>
.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
.navBg {
  background: #c5c4a6 !important;
}
.topLogohide {
  opacity: 0;
  transition: 1s;
}
.topLogoShow {
  opacity: 1;
  transition: 1s;
}
#top {
  width: 100%;
  z-index: 2000;
  position: absolute;
  .navbar {
    color: white;
    font-weight: 500;
    letter-spacing: .03rem;
    background: transparent;
    position: absolute;
    height: 15%;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: none;
    transition: .8s;
    .con {
      width: 90%;
      margin: 0;
      a {
        color: white;
      }
    }
  }
}
.textShadow {
  text-shadow: 0 0 3px #785651;
  transition: .8s;
}

.navbar-nav {
  align-items: center;
}

.nav-item a {
  font-size: 1.1rem;
  text-shadow: 1px 1px 5xp #333;
  :hover {
    text-decoration: none;
  }
}

.topSmall {
  font-size: 0.8rem;
  font-weight: lighter;
  margin: 0;
}

.topLogo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  transition: 2s;
  width: 10rem;
  img {
    width: 100%;
    object-fit: contain;
  }
}

@media (max-width: 768px) {
  .topSmall {
    display: none;
  }
  p {
    text-align: left;
  }
  .navbar {
    margin-left: auto;
  }
  .nav-item a {
    text-decoration: none;
    text-align: left;
  }
  #totop {
    width: 10px;
  }
}
</style>

<script>
export default {
  name: 'homeTop',
  data () {
    return {
      showNavbar: true,
      showNavbarBg: false,
      lastScrollPosition: 0
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
    },
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      if (currentScrollPosition > 300) {
        this.showNavbarBg = true
      } else {
        this.showNavbarBg = false
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
