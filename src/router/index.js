import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin/HomePage.vue'),
      meta:{requiredAuth:true},
      children: [
        {
          path:'',
          name:'dashboard',
          component: () => import('../views/Admin/Dashboard.vue'),
        },
        {
          path:'account',
          name:'account',
          component: () => import('../views/Admin/Account/Account.vue'),
        },
        {
          path:'add-account',
          name:'addaccount',
          component: () => import('../views/Admin/Account/AddAccount.vue'),
        },
        {
          path:'update-account/:id',
          name:'updateaccount',
          component: () => import('../views/Admin/Account/UpdateAccount.vue'),
        },
        {
          path:'product',
          name:'product',
          component: () => import('../views/Admin/Product/Product.vue'),
        },
        {
          path:'add-product',
          name:'addproduct',
          component: () => import('../views/Admin/Product/AddProduct.vue'),
        },
        {
          path:'update-product/:id',
          name:'updateproduct',
          component: () => import('../views/Admin/Product/UpdateProduct.vue'),
        },
        {
          path:'category',
          name:'category',
          component: () => import('../views/Admin/Category/Category.vue'),
        },
        {
          path:'add-category',
          name:'addcategory',
          component: () => import('../views/Admin/Category/AddCategory.vue'),
        },
        {
          path:'update-category/:id',
          name:'updatecategory',
          component: () => import('../views/Admin/Category/UpdateCategory.vue'),
        },
        {
          path:'order',
          name:'order',
          component: () => import('../views/Admin/Order/Order.vue'),
        },
        {
          path:'order-detail/:id',
          name:'detailOrder',
          component: () => import('../views/Admin/Order/Order_Detail.vue'),
        },
      ]
    },
    // User
    {
      path: '/',
      name: 'user',
      component: ()=>import('../views/User/HomePage.vue'),
      children: [
        {
          path:'',
          name:'dashboard',
          component: () => import('../views/User/Dashboard.vue'),
        },
        {
          path:'san-pham/:id',
          name:'sanpham',
          component: () => import('../views/User/Product.vue'),
        },
        {
          path:'detail/:id',
          name:'ctsanpham',
          component: () => import('../views/User/Deatail.vue'),
        },
        {
          path:'cart',
          name:'giohang',
          component: () => import('../views/User/Cart.vue'),
        },
        {
          path:'checkout',
          name:'checkout',
          component: () => import('../views/User/Checkout.vue'),
        },
        {
          path:'my-order',
          name:'myorder',
          component: () => import('../views/User/Order.vue'),
        },
        {
          path:'detail-order/:id',
          name:'detailorder',
          component: () => import('../views/User/DetailOrder.vue'),
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path:'/register',
      name:'register',
      component: () => import('../views/Register.vue'),
    },
  ],
})

router.beforeEach((to,from,next)=>{
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  if(to.meta.requiredAuth && userLogin == null ){
    next({path:'/login'})
  }else if(to.meta.requiredAuth && userLogin.role == 'user'){
    next({name:'dashboard'})
  }
  else{
    next()
  }
}
  
)

export default router
