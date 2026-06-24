<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminAppShell from '@/components/modules/admin/layout/AdminAppShell.vue'

const route = useRoute()
const activeNav = computed(() => (route.meta?.activeNav as string) ?? 'Dashboard')
</script>

<template>
  <AdminAppShell :active-nav="activeNav">
    <router-view />
  </AdminAppShell>
</template>
