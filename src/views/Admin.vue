<template lang="pug">
#admin
  Navbar
  b-breadcrumb.mt-5
      b-breadcrumb-item(to='/') 首頁
      b-breadcrumb-item(active) 管理者頁面
  b-button#sideBar(v-b-toggle.sidebar-1)
  #container
    b-sidebar#sidebar-1.d-flex.justify-content-center( shadow bg-variant="white")
      ul.nav.flex-column
        li.nav-item.mb-1.title(style="color:#785651")
          p.text-center 管理列表
        li.nav-item
          router-link.nav-link.cate.text-center.p-0.mt-2(to="/admin" @click="cate='所有商品'") 產品管理
        li.nav-item
          router-link.nav-link.cate.text-center.p-0.mt-2(to="/admin/orderManager" @click="cate='所有商品'") 訂單管理
    #right
      router-view
</template>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";
#top {
  width: 100%;
  height: 130px;
  background: #c5c4a6;
  position: relative;
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
.title {
  margin-bottom: 5%;
  line-height: 2rem;
  text-align: center;
  color: #785651;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: .15rem;
}
#container {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  padding-bottom: 15%;
  padding-top: 2%;
  position: relative;
  top: 0;
  left: 0;
}
#sideBar {
  width: 7rem;
  height: 10rem;
  background: #fff;
  border: 2px solid #c5c4a6;
  // filter: drop-shadow(0px 0px 5px #c5c4a6);
  position: fixed;
  border-radius: 0 .7rem .7rem 0;
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
  transition: 1s;
  box-shadow: none;
  &::after {
    width: 7rem;
    height: 10rem;
    padding: 0;
    content: '管理列表';
    text-align: center;
    color: #c5c4a6;
    letter-spacing: .15rem;
    writing-mode: vertical-rl;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(25%,-50%);
    opacity: 1;
    transition: 1s;
    z-index: 2;
  }
  &:hover {
    transform: translate(0, -50%);
    &::after {
    }
  }
}
.btn {
  background: transparent;
  padding: 0;
  border-radius: 0;
}
#left ul li:first-child {
  font-weight: 500;
  font-size: 1.05rem;
  letter-spacing: .05rem;
}
.cate {
  color: #967f7a;
  cursor: pointer;
  font-size: 103%;
  font-weight: 400;
  letter-spacing: .05rem;
  transition: transform .3s;
}
.cate:hover {
  transform: translateY(-8%);
  color: #785651;
}
#right {
  width: 70%;
}
.flexColumn {
  line-height: 1.3rem;
  display: flex;
  flex-direction: column;
}
</style>

<script>
import Navbar from '../components/navbar.vue'
export default {
  name: 'Admin',
  data () {
    return {
      cate: '產品管理'
    }
  },
  components: {
    Navbar
  }
}
</script>
