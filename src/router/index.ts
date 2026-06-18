import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/components/layouts/MainLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardAdminView from '@/views/dashboard-admin/DashboardAdminView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import TransactionHistoryView from '@/views/transaction-history/TransactionHistoryView.vue'
import TokenRedemptionView from '@/views/token/TokenRedemptionView.vue'
import TokenSwapView from '@/views/token/TokenSwapView.vue'
import TokenTransferView from '@/views/token/TokenTransferView.vue'

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
          path: 'dashboard-admin',
          name: 'DashboardAdmin',
          component: DashboardAdminView,
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
