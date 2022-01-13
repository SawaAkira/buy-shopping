import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/Home.vue'),
        meta: {
          keepAlive: true,
          title: "首页",
        }
      },
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('../views/classify/Classify.vue'),
        meta: {
          keepAlive: true,
          title: "分类",
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/cart/Cart.vue'),
        meta: {
          keepAlive: false,
          title: "购物车",
        }
      },
      {
        path: 'personal',
        name: 'Personal',
        component: () => import('../views/personal/Personal.vue'),
        meta: {
          keepAlive: false,
          title: "我的",
        }
      },
    ]
  },
  {
    path: '/user',
    redirect: '/personal',
    component: () => import('../views/User.vue'),
    children: [
      {
        path: 'info',
        name: 'UserInfo',
        component: () => import('../views/user/Info.vue'),
        meta: {
          title: "我的信息",
        }
      },
      {
        path: 'collect',
        name: 'UserCollect',
        component: () => import('../views/user/Collect.vue'),
        meta: {
          title: "我的收藏",
        }
      },
      {
        path: 'order',
        name: 'UserOrder',
        redirect: '/user/order/0',
        component: () => import('../views/user/Order.vue'),
        children: [
          {
            path: '0',
            name: 'Unpaid',
            component: () => import('../views/user/order/Unpaid.vue'),
            meta: {
              title: "我的订单",
            }
          },
          {
            path: '1',
            name: 'Unshipped',
            component: () => import('../views/user/order/Unshipped.vue'),
            meta: {
              title: "我的订单",
            }
          },
          {
            path: '2',
            name: 'Received',
            component: () => import('../views/user/order/Received.vue'),
            meta: {
              title: "我的订单",
            }
          },
          {
            path: '3',
            name: 'Evaluated',
            component: () => import('../views/user/order/Evaluated.vue'),
            meta: {
              title: "我的订单",
            }
          },
          {
            path: '4',
            name: 'Refund',
            component: () => import('../views/user/order/Refund.vue'),
            meta: {
              title: "我的订单",
            }
          },
          {
            path: '5',
            name: 'Total',
            component: () => import('../views/user/order/Total.vue'),
            meta: {
              title: "我的订单",
            }
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: "登录",
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      title: "搜索",
    }
  },
  {
    path: '/detail',
    redirect: '/home'
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
