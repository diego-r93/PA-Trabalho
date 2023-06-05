import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/scripts/auth'

const routes = [
  {
    path: '/',
    redirect: "/dashboard",
    meta: {},
  },
  {
    path: "/dashboard",
    meta: {
      requiresAuth: true,
      layout: "default",
    },
    component: () => import("@/views/DashBoard.vue"),
  },
  {
    path: "/device",
    meta: {
      requiresAuth: true,
      layout: "default",
    },
    component: () => import("@/views/DeviceConfiguration.vue"),
  },
  {
    path: "/database",
    meta: {
      requiresAuth: true,
      layout: "default",
    },
    component: () => import("@/views/DatabaseConfiguration.vue"),
  },
  {
    path: "/account",
    meta: {
      requiresAuth: true,
      layout: "default",
    },
    component: () => import("@/views/MyAccount.vue"),
  },
  {
    path: "/users",
    meta: {
      requiresAuth: true,
      layout: "default",
    },
    component: () => import("@/views/UsersConfiguration.vue"),
  },
  {
    path: "/configuration",
    meta: {
      requiresAuth: true,
      layout: "default",
    },
    component: () => import("@/views/PageConfiguration.vue"),
  },
  {
    path: "/help",
    meta: {
      requiresAuth: true,
      layout: "default",
    },
    component: () => import("@/views/HelpMenu.vue"),
  },
  {
    path: '/login',
    meta: {
      layout: "auth",
    },
    component: () => import("@/views/LoginPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
})

export default router