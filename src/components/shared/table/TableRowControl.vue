<script setup lang="ts">
import { GInputText } from '@/components';

withDefaults(
  defineProps<{
    rowLimit?: number
    searchQuery?: string
    searchPlaceholder?: string
  }>(),
  {
    rowLimit: 10,
    searchQuery: '',
    searchPlaceholder: 'Cari data',
  },
)

const emit = defineEmits<{
  'update:rowLimit': [value: number]
  'update:searchQuery': [value: string]
}>()

function onRowLimitChange(event: Event) {
  emit('update:rowLimit', Number((event.target as HTMLSelectElement).value))
}

function onSearchInput(event: Event) {
  emit('update:searchQuery', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="admin-row-control">
    <label class="admin-row-control__limit">
      <span>Lihat</span>
      <select
        :value="rowLimit"
        aria-label="Jumlah baris"
        @change="onRowLimitChange"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
      </select>
      <span>baris</span>
    </label>

    <label class="admin-row-control__search">
      <GInputText
        :value="searchQuery"
        class="mb-0"
        type="search"
        :placeholder="searchPlaceholder"
        autocomplete="off"
        aria-label="Cari data"
        @input="onSearchInput"
      />
    </label>
  </div>
</template>

<style scoped>
.admin-row-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.admin-row-control__limit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  white-space: nowrap;
}

.admin-row-control__limit select {
  height: 24px;
  padding: 0 24px 0 8px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 4px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font: inherit;
  cursor: pointer;
}

.admin-row-control__search {
  width: 320px;
}

.admin-row-control__search input::placeholder {
  color: var(--g-kit-black-50);
}

.admin-row-control__search input:focus {
  border-color: var(--g-kit-lime-50);
}

@media (max-width: 760px) {
  .admin-row-control {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-row-control__search {
    width: 100%;
  }
}
</style>
