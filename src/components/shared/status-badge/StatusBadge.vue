<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'success' | 'pending' | 'failed' | 'active' | 'inactive'
    label: string
  }>(),
  { variant: 'active' },
)
</script>

<template>
  <span class="status-badge" :class="`status-badge--${variant}`">
    {{ label }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omega);
  white-space: nowrap;
  min-width: fit-content;
}

/* Active / Success */
.status-badge--active,
.status-badge--success {
  background: var(--g-kit-lime-10);
  color: var(--g-kit-lime-50);
}

/* Pending */
.status-badge--pending {
  background: var(--g-kit-orange-10);
  color: var(--g-kit-orange-50);
}

/* Failed / Inactive */
.status-badge--failed,
.status-badge--inactive {
  background: var(--g-kit-red-10);
  color: var(--g-kit-red-50);
}
</style>
