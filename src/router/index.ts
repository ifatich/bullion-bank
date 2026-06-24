import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/components/layouts/MainLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/user/DashboardView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import TransactionHistoryView from '@/views/user/TransactionHistoryView.vue'
import TokenRedemptionView from '@/views/user/token/TokenRedemptionView.vue'
import TokenSwapView from '@/views/user/token/TokenSwapView.vue'
import TokenTransferView from '@/views/user/token/TokenTransferView.vue'

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
          component: LoginView,
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterView,
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardView,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: ProfileView,
        },
        {
          path: 'transaction-history',
          name: 'TransactionHistory',
          component: TransactionHistoryView,
        },
        {
          path: 'token/swap',
          name: 'TokenSwap',
          component: TokenSwapView,
        },
        {
          path: 'token/redemption',
          name: 'TokenRedemption',
          component: TokenRedemptionView,
        },
        {
          path: 'token/transfer',
          name: 'TokenTransfer',
          component: TokenTransferView,
        },
      ],
    },
  ],
})

export default router
