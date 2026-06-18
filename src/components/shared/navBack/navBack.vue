<script setup lang="ts">
import { useRouter } from 'vue-router'

import { GNavBackNavigator } from '@/components'

const props = withDefaults(
  defineProps<{
    label?: string
    to?: string
  }>(),
  {
    label: 'Dashboard',
    to: '/dashboard'
  }
)

const router = useRouter()

const navigateBack = () => {
  if (props.to) {
    router.push(props.to)
    return
  }

  router.back()
}
</script>

<template>
  <GNavBackNavigator :label="label" :action="navigateBack" />
</template>
