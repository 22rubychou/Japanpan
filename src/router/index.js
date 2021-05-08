import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'JAPANPAN',
      login: false,
      isAdmin: false
    }
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
    meta: {
      title: 'JAPANPAN | MEMBER',
      login: true,
      isAdmin: false
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue'),
    meta: {
      title: 'JAPANPAN | Cart',
      login: false,
      isAdmin: false
    }
  },
  {
    path: '/regandlogin',
    name: 'Regandlogin',
    component: () => import(/* webpackChunkName: "regandlogin" */ '../views/regandlogin.vue'),
    meta: {
      title: 'JAPANPAN | LOGIN',
      login: false,
      isAdmin: false
    }
  },
  {
    path: '/allProducts',
    name: 'AllProducts',
    component: () => import(/* webpackChunkName: "allProducts" */ '../views/AllProducts.vue'),
    meta: {
      title: 'JAPANPAN | PRODUCTS',
      login: false,
      isAdmin: false
    }
  },
  {
    path: '/allProducts/:productId',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/product.vue'),
    meta: {
      title: 'JAPANPAN | PRODUCTS',
      login: false,
      isAdmin: false
    }
  },
  {
    path: '/fav',
    name: 'Fav',
    component: () => import(/* webpackChunkName: "fav" */ '../views/Fav.vue'),
    meta: {
      title: 'JAPANPAN | Fav',
      login: false,
      isAdmin: false
    }
  },
  {
    path: '',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      title: 'JAPANPAN | ADMIN',
      login: false,
      isAdmin: true
    },
    children: [
      {
        path: '/admin',
        name: 'productManger',
        component: () => import(/* webpackChunkName: "productManager" */ '../views/productManager.vue'),
        meta: {
          title: 'JAPANPAN | PRODUCTMANAGER',
          login: false,
          isAdmin: true
        }
      },
      {
        path: '/admin/orderManager',
        name: 'orderManger',
        component: () => import(/* webpackChunkName: "orderManager" */ '../views/orderManager.vue'),
        meta: {
          title: 'JAPANPAN | ORDERMANAGER',
          login: false,
          isAdmin: true
        }
      }
    ]
  },
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '找不到頁面',
      login: false,
      isAdmin: false
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user.id) {
    next('/regandlogin')
  } else {
    next()
  }

  if (to.meta.isAdmin && !store.state.admin.id) {
    next('/regandlogin')
  } else {
    next()
  }

  if (to.path === '/section02' || to.path === '/section01' || to.path === '/section03' || to.path === '/section04' || to.path === '/footer') {
    next('/')
  }
})

//router.afterEach((to, from) => {
  //let title = ''
  //if (to.name === 'Album') {
    //title = store.state.user.name + '的相簿'
  //} else {
    //title = to.meta.title
  //}

  //document.title = title
//})

export default router
