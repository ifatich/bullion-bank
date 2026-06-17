<script setup>
defineProps({
  loading: Boolean,
  disabled: Boolean,
})
</script>

<template>
  <button class="btn-primary" :disabled="loading || disabled">
    <span v-if="loading">Loading...</span>
    <slot v-else />
  </button>
</template>

<style scoped>
.btn-primary {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 8px;
  background: #00b140;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}
</style>
