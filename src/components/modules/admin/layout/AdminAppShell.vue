<script setup lang="ts">
import { computed } from 'vue'
import AdminShell from '@/components/shared/admin-layout/AdminShell.vue'
import type { AdminNavItem } from '@/components/shared/admin-layout/types'

const props = withDefaults(
  defineProps<{
    activeNav?: string
  }>(),
  {
    activeNav: 'Admin List',
  },
)

const navItems = computed<AdminNavItem[]>(() => [
  {
    label: 'Dashboard',
    icon: 'home',
    active: props.activeNav === 'Dashboard',
    route: '/admin/dashboard',
  },
  {
    label: 'User',
    icon: 'user',
    active: props.activeNav === 'User',
    route: '/admin/user',
  },
  {
    label: 'Transaction History',
    icon: 'document',
    active: props.activeNav === 'Transaction History',
    route: '/admin/transaction-history',
  },
  {
    label: 'Admin List',
    icon: 'admin',
    active: props.activeNav === 'Admin List',
    route: '/admin/admin-list',
  },
  {
    label: 'Profile',
    icon: 'profile',
    active: props.activeNav === 'Profile',
    route: '/admin/profile',
  },
  {
    label: 'Approval',
    icon: 'approval',
    active: props.activeNav === 'Approval',
    route: '/admin/approval',
  },
])
</script>

<template>
  <AdminShell :nav-items="navItems">
    <template v-if="$slots.brand" #brand>
      <slot name="brand" />
    </template>

    <template v-if="$slots['top-actions']" #top-actions>
      <slot name="top-actions" />
    </template>

    <template v-if="$slots['side-panel']" #side-panel="slotProps">
      <slot name="side-panel" v-bind="slotProps" />
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </AdminShell>
</template>
