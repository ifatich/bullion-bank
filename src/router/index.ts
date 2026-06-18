import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/components/layouts/MainLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import TokenSwapView from '@/views/token/TokenSwapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: LoginView
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardView
        },
        {
          path: 'token/swap',
          name: 'TokenSwap',
          component: TokenSwapView
        }
      ]
    }
  ]
})

export default router
