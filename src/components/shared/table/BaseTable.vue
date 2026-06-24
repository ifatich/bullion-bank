<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    columns: { key: string; label: string; width?: string }[]
    rows: Record<string, unknown>[]
    rowLimit?: boolean
    searchable?: boolean
    paginated?: boolean
    pageSize?: number
    totalRows?: number
    loading?: boolean
  }>(),
  {
    rowLimit: false,
    searchable: false,
    paginated: false,
    pageSize: 10,
    totalRows: 0,
    loading: false,
  },
)

const emit = defineEmits<{
  'update:pageSize': [value: number]
  'update:search': [value: string]
}>()

const searchValue = computed({
  get: () => '',
  set: (value: string) => emit('update:search', value),
})

const pageSizeValue = computed({
  get: () => props.pageSize,
  set: (value: number) => emit('update:pageSize', value),
})
</script>

<template>
  <section class="base-table-card">
    <!-- Top controls -->
    <div v-if="rowLimit || searchable || $slots.controls" class="base-table-controls">
      <div v-if="rowLimit || $slots['controls-left']" class="base-table-controls-left">
        <label v-if="rowLimit" class="row-limit-label">
          <span>Lihat</span>
          <select
            id="base-table-row-limit"
            v-model.number="pageSizeValue"
            name="rowLimit"
            aria-label="Jumlah baris"
          >
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          <span>baris</span>
        </label>
        <slot name="controls-left" />
      </div>

      <div v-if="searchable || $slots['controls-right']" class="base-table-controls-right">
        <label v-if="searchable" class="search-label">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85-.017.016ZM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" fill="currentColor"/>
          </svg>
          <input
            id="base-table-search"
            v-model="searchValue"
            type="text"
            placeholder="Cari data"
            aria-label="Cari data"
          />
        </label>
        <slot name="controls-right" />
      </div>
    </div>

    <!-- Desktop table -->
    <div class="base-table-scroll">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" :style="col.width ? { width: col.width } : undefined">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading && rows.length">
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :row="row" :index="rowIndex">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="!loading">
          <tr>
            <td class="empty-cell" :colspan="columns.length">Tidak ada data yang ditampilkan</td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="base-table-loading">
        <span>Memuat data...</span>
      </div>
    </div>

    <!-- Mobile card layout -->
    <div v-if="$slots['mobile-card'] && rows.length" class="base-table-mobile">
      <slot name="mobile-card" />
    </div>
    <div v-else-if="!loading && !rows.length" class="base-table-mobile-empty">
      Tidak ada data yang ditampilkan
    </div>

    <!-- Footer -->
    <div v-if="paginated || $slots.footer" class="base-table-footer">
      <slot name="footer" />
      <slot name="pagination" />
    </div>
  </section>
</template>

<style scoped>
.base-table-card {
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

/* Controls */
.base-table-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.base-table-controls-left,
.base-table-controls-right {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.row-limit-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.row-limit-label select {
  height: 24px;
  padding: 0 24px 0 8px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 4px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font: inherit;
}

.search-label {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--g-kit-black-40);
  pointer-events: none;
}

.search-label input {
  height: 44px;
  width: 328px;
  padding: 0 16px 0 36px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 8px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  outline: none;
  transition: border-color 0.15s ease;
}

.search-label input::placeholder {
  color: var(--g-kit-black-50);
}

.search-label input:focus {
  border-color: var(--g-kit-lime-50);
}

/* Table scroll wrapper */
.base-table-scroll {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 4px;
  position: relative;
}

.base-table-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
}

/* Table base styles */
table {
  width: 100%;
  min-width: 920px;
  border-collapse: separate;
  border-spacing: 0;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

th,
td {
  border-right: 1px solid var(--g-kit-black-20);
  border-bottom: 1px solid var(--g-kit-black-20);
  text-align: left;
}

th:last-child,
td:last-child {
  border-right: 0;
}

tbody tr:last-child td {
  border-bottom: 0;
}

th {
  height: 56px;
  padding: 18px 16px;
  background: var(--g-kit-lime-50);
  color: var(--g-kit-white);
  font-weight: var(--g-kit-font-weight-bold);
}

td {
  height: 80px;
  padding: 16px;
  background: var(--g-kit-white);
  vertical-align: top;
}

tbody tr:nth-child(even) td {
  background: color-mix(in srgb, var(--g-kit-black-10) 70%, var(--g-kit-white));
}

td :deep(strong),
td :deep(span) {
  display: block;
}

td :deep(strong) {
  margin-bottom: 4px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

.empty-cell {
  text-align: center;
  color: var(--g-kit-black-50);
  padding: 48px 16px;
}

/* Mobile - hide table, show cards */
.base-table-mobile {
  display: none;
}

.base-table-mobile-empty {
  display: none;
  padding: 48px 16px;
  text-align: center;
  color: var(--g-kit-black-50);
  font-size: var(--g-kit-font-size-sigma);
}

/* Footer */
.base-table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

@media (max-width: 760px) {
  .base-table-card {
    padding: 16px;
  }

  .base-table-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-label input {
    width: 100%;
  }

  .base-table-scroll {
    border: 0;
    overflow: visible;
  }

  table,
  thead,
  tbody,
  tr,
  th,
  td {
    display: none;
  }

  .base-table-mobile {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .base-table-mobile-empty {
    display: block;
  }

  .base-table-footer {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}
</style>
