<script setup lang="ts">
import { computed, ref } from 'vue'

import { GButton, GTablePagination } from '@/components'
import TableRowControl from '@/components/shared/table/TableRowControl.vue'
import TableHeader from '@/components/shared/table/TableHeader.vue'
import TableFooter from '@/components/shared/table/TableFooter.vue'

export interface ApprovalRequest {
  requestorName: string
  requestorId: string
  transactionHash: string
  type: string
  receiverName: string
  receiverId: string
  amount: string
  fiatValue: string
  status: string
}

const props = defineProps<{
  requests: ApprovalRequest[]
}>()

const emit = defineEmits<{
  'edit-request': [row: ApprovalRequest]
  'delete-request': [row: ApprovalRequest]
}>()

const rowsPerPage = ref(10)
const searchQuery = ref('')
const currentPage = ref(1)
const lastUpdated = ref('10/03/2026, 10.00 AM')

const typeVariant = (type: string): { bg: string; color: string } => {
  const t = type.toLowerCase()
  if (t === 'minting') return { bg: 'var(--g-kit-lime-10)', color: 'var(--g-kit-lime-50)' }
  if (t === 'burning') return { bg: 'var(--g-kit-red-10)', color: 'var(--g-kit-red-50)' }
  return { bg: 'var(--g-kit-blue-10)', color: 'var(--g-kit-blue-50)' }
}

const filteredRequests = computed(() => {
  if (!searchQuery.value) return props.requests
  const q = searchQuery.value.toLowerCase()
  return props.requests.filter(
    (r) =>
      r.requestorName.toLowerCase().includes(q) ||
      r.requestorId.toLowerCase().includes(q) ||
      r.transactionHash.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.receiverName.toLowerCase().includes(q) ||
      r.receiverId.toLowerCase().includes(q),
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRequests.value.length / rowsPerPage.value)))

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return filteredRequests.value.slice(start, start + rowsPerPage.value)
})

const displayStart = computed(() => (currentPage.value - 1) * rowsPerPage.value + 1)
const displayEnd = computed(() => Math.min(currentPage.value * rowsPerPage.value, filteredRequests.value.length))

function refreshData() {
  lastUpdated.value = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }).format(new Date())
}

function onSearchQueryChange(val: string) {
  searchQuery.value = val
  currentPage.value = 1
}

function onRowLimitChange(val: number) {
  rowsPerPage.value = val
  currentPage.value = 1
}
</script>

<template>
  <section class="approval-table-card" aria-labelledby="approval-table-title">
    <TableHeader
      title="Request Approval Multisignature"
      :last-updated="`Last updated on ${lastUpdated}`"
      @refresh="refreshData"
    >
      <template #actions>
        <GButton
          id="approval-new-transaction"
          label="New Transaction"
          type="primary"
          size="md"
          style="min-width: 200px;"
        />
      </template>
    </TableHeader>

    <TableRowControl
      :row-limit="rowsPerPage"
      :search-query="searchQuery"
      @update:row-limit="onRowLimitChange"
      @update:search-query="onSearchQueryChange"
    />

    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th class="col-requestor">Requestor</th>
            <th class="col-hash">Tran Hash</th>
            <th class="col-type">Type</th>
            <th class="col-receiver">Receiver</th>
            <th class="col-amount">Amount</th>
            <th class="col-status">Status</th>
            <th class="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedRequests" :key="`${row.transactionHash}-${index}`">
            <td class="col-no">{{ displayStart + index }}</td>
            <td class="col-requestor">
              <strong>{{ row.requestorName }}</strong>
              <span>{{ row.requestorId }}</span>
            </td>
            <td class="col-hash">
              <span class="hash-text">{{ row.transactionHash }}</span>
            </td>
            <td class="col-type">
              <span
                class="type-badge"
                :style="{
                  background: typeVariant(row.type).bg,
                  color: typeVariant(row.type).color,
                }"
              >
                {{ row.type }}
              </span>
            </td>
            <td class="col-receiver">
              <strong>{{ row.receiverName }}</strong>
              <span>{{ row.receiverId }}</span>
            </td>
            <td class="col-amount">
              <strong>{{ row.amount }}</strong>
              <span>{{ row.fiatValue }}</span>
            </td>
            <td class="col-status">
              <span class="status-badge">{{ row.status }}</span>
            </td>
            <td class="col-action">
              <div class="action-buttons">
                <GButton
                  :id="`approval-edit-${index}`"
                  label="Edit"
                  type="neutral"
                  size="sm"
                  @click="emit('edit-request', row)"
                />
                <GButton
                  :id="`approval-delete-${index}`"
                  label="Delete"
                  type="neutral"
                  size="sm"
                  @click="emit('delete-request', row)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableFooter
      :display-start="displayStart"
      :display-end="displayEnd"
      :total-rows="filteredRequests.length"
    >
      <GTablePagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :total-rows="filteredRequests.length"
        :per-page="rowsPerPage"
      />
    </TableFooter>
  </section>
</template>

<style scoped>
.approval-table-card {
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 6px;
}

table {
  width: 100%;
  min-width: 1540px;
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
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
  white-space: nowrap;
}

td {
  height: 80px;
  padding: 16px;
  background: var(--g-kit-white);
  vertical-align: top;
}

tbody tr:nth-child(even) td {
  background: var(--g-kit-black-10);
}

.col-no {
  width: 67px;
  text-align: center;
}

.col-requestor {
  width: 280px;
}

.col-hash {
  width: 280px;
}

.col-type {
  width: 150px;
}

.col-receiver {
  width: 280px;
}

.col-amount {
  width: 200px;
}

.col-status {
  width: 100px;
}

.col-action {
  width: 150px;
}

td strong {
  display: block;
  margin-bottom: 4px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

td span {
  display: block;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.hash-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omega);
  white-space: nowrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border-radius: 4px;
  background: var(--g-kit-blue-10);
  color: var(--g-kit-blue-50);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omega);
  white-space: nowrap;
}

.action-buttons {
  display: inline-flex;
  gap: 8px;
}

/* Mobile responsive */
@media (max-width: 760px) {
  .approval-table-card {
    padding: 16px;
  }

  .table-scroll {
    border: 0;
    overflow: visible;
  }

  table,
  thead,
  tbody,
  tr,
  th,
  td {
    display: block;
  }

  table {
    min-width: 0;
  }

  thead {
    display: none;
  }

  tr {
    padding: 16px;
    border: 1px solid var(--g-kit-black-20);
    border-radius: 8px;
    background: var(--g-kit-white);
  }

  tr + tr {
    margin-top: 12px;
  }

  td,
  tbody tr:nth-child(even) td {
    height: auto;
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 12px;
    padding: 8px 0;
    border: 0;
    background: transparent;
  }

  td::before {
    color: var(--g-kit-black-60);
    font-weight: var(--g-kit-font-weight-bold);
  }

  td:nth-child(1)::before { content: 'No'; }
  td:nth-child(2)::before { content: 'Requestor'; }
  td:nth-child(3)::before { content: 'Tran Hash'; }
  td:nth-child(4)::before { content: 'Type'; }
  td:nth-child(5)::before { content: 'Receiver'; }
  td:nth-child(6)::before { content: 'Amount'; }
  td:nth-child(7)::before { content: 'Status'; }
  td:nth-child(8)::before { content: 'Action'; }

  .col-no {
    width: auto;
    text-align: left;
  }
}
</style>
