<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: 'Copyright © 2026 PT. Pegadaian. All Rights Reserved.',
  },
)
</script>

<template>
  <footer class="admin-footer">
    <slot>{{ text }}</slot>
  </footer>
</template>

<style scoped>
.admin-footer {
  grid-column: 2;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--g-kit-black-20);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
  text-align: center;
}

@media (max-width: 900px) {
  .admin-footer {
    grid-column: 1;
    padding: 12px 16px;
    font-size: var(--g-kit-font-size-sigma);
    line-height: var(--g-kit-line-height-sigma);
  }
}
</style>
