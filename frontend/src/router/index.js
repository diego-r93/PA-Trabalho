// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultView.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      },
      {
        path: "/dashboard",
        // meta: {
        //   requiresAuth: true,
        //   layout: "landing",
        // },
        component: () => import("@/views/DashBoard.vue"),
      },
      {
        path: "/device",
        // meta: {
        //   requiresAuth: true,
        //   layout: "landing",
        // },
        component: () => import("@/views/DeviceConfiguration.vue"),
      },
      {
        path: "/database",
        // meta: {
        //   requiresAuth: true,
        //   layout: "landing",
        // },
        component: () => import("@/views/DatabaseConfiguration.vue"),
      },
      {
        path: "/account",
        // meta: {
        //   requiresAuth: true,
        //   layout: "landing",
        // },
        component: () => import("@/views/MyAccount.vue"),
      },
      {
        path: "/users",
        // meta: {
        //   requiresAuth: true,
        //   layout: "landing",
        // },
        component: () => import("@/views/UsersConfiguration.vue"),
      },
      {
        path: "/configuration",
        // meta: {
        //   requiresAuth: true,
        //   layout: "landing",
        // },
        component: () => import("@/views/PageConfiguration.vue"),
      },
      {
        path: "/help",
        // meta: {
        //   requiresAuth: true,
        //   layout: "landing",
        // },
        component: () => import("@/views/HelpMenu.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router