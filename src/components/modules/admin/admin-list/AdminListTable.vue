<script setup lang="ts">
import { computed, ref } from 'vue'

import { GButton, GTablePagination } from '@/components'
import TableRowControl from '@/components/shared/table/TableRowControl.vue'
import TableHeader from '@/components/shared/table/TableHeader.vue'
import TableFooter from '@/components/shared/table/TableFooter.vue'
import StatusBadge from '@/components/shared/status-badge/StatusBadge.vue'

export interface AdminListUser {
  email: string
  name: string
  adminId: string
  segment: string
  registrationDate: string
  status: 'Active' | 'Pending Review' | 'Inactive'
}

const props = defineProps<{
  adminUsers: AdminListUser[]
}>()

const emit = defineEmits<{
  'edit-admin-user': [adminUser: AdminListUser]
  'delete-admin-user': [adminUser: AdminListUser]
  'add-admin': []
}>()

const adminUsersPerPage = ref(5)
const adminUserSearchQuery = ref('')
const currentPage = ref(1)

const lastUpdated = ref('08/07/2024, 09.00 AM')

const filteredAdminUsers = computed(() => {
  if (!adminUserSearchQuery.value) return props.adminUsers
  const q = adminUserSearchQuery.value.toLowerCase()
  return props.adminUsers.filter(
    (u) =>
      u.email.toLowerCase().includes(q) ||
      u.name.toLowerCase().includes(q) ||
      u.adminId.toLowerCase().includes(q) ||
      u.segment.toLowerCase().includes(q),
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredAdminUsers.value.length / adminUsersPerPage.value)))

const paginatedAdminUsers = computed(() => {
  const start = (currentPage.value - 1) * adminUsersPerPage.value
  return filteredAdminUsers.value.slice(start, start + adminUsersPerPage.value)
})

const displayStart = computed(() => (currentPage.value - 1) * adminUsersPerPage.value + 1)
const displayEnd = computed(() => Math.min(currentPage.value * adminUsersPerPage.value, filteredAdminUsers.value.length))

const getStatusVariant = (status: AdminListUser['status']) => {
  if (status === 'Pending Review') return 'pending'
  return status.toLowerCase() as 'active' | 'inactive'
}


function refreshData() {
  lastUpdated.value = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }).format(new Date())
}

function onSearchQueryChange(val: string) {
  adminUserSearchQuery.value = val
  currentPage.value = 1
}

function onRowLimitChange(val: number) {
  adminUsersPerPage.value = val
  currentPage.value = 1
}

</script>

<template>
  <section class="admin-table-card" aria-labelledby="admin-list-table-title">
    <TableHeader
      title="Admin List"
      :last-updated="`Last updated on ${lastUpdated}`"
      @refresh="refreshData"
    >
      <template #actions>
        <GButton label="Add New Admin" type="neutral" size="md" style="min-width: 164px;" @click="emit('add-admin')" />
      </template>
    </TableHeader>

    <TableRowControl
      :row-limit="adminUsersPerPage"
      :search-query="adminUserSearchQuery"
      @update:row-limit="onRowLimitChange"
      @update:search-query="onSearchQueryChange"
    />

    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th>Company ID</th>
            <th>User</th>
            <th>Segment</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(adminUser, index) in paginatedAdminUsers" :key="`${adminUser.adminId}-${index}`">
            <td class="col-no">{{ displayStart + index }}</td>
            <td>{{ adminUser.email }}</td>
            <td>
              <strong>{{ adminUser.name }}</strong>
              <span>{{ adminUser.adminId }}</span>
            </td>
            <td>{{ adminUser.segment }}</td>
            <td>{{ adminUser.registrationDate }}</td>
            <td>
              <StatusBadge :variant="getStatusVariant(adminUser.status)" :label="adminUser.status" />
            </td>
            <td>
              <div class="action-buttons">
                <GButton
                  :id="`admin-list-edit-${index}`"
                  label="Edit"
                  type="neutral"
                  size="sm"
                  @click="emit('edit-admin-user', adminUser)"
                />
                <GButton
                  :id="`admin-list-delete-${index}`"
                  label="Delete"
                  type="neutral"
                  size="sm"
                  @click="emit('delete-admin-user', adminUser)"
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
      :total-rows="filteredAdminUsers.length"
    >
      <GTablePagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :total-rows="filteredAdminUsers.length"
        :per-page="adminUsersPerPage"
      />
    </TableFooter>
  </section>
</template>

<style scoped>
.admin-table-card {
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

/* Table */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 4px;
}

table {
  width: 100%;
  min-width: 1280px;
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
  background: var(--g-kit-black-10);
}

.col-no { width: 67px; text-align: center; }
th:nth-child(2), td:nth-child(2) { width: 220px; }
th:nth-child(3), td:nth-child(3) { width: 383px; }
th:nth-child(4), td:nth-child(4) { width: 150px; }
th:nth-child(5), td:nth-child(5) { width: 160px; }
th:nth-child(6), td:nth-child(6) { width: 150px; }
th:nth-child(7), td:nth-child(7) { width: 150px; }

td strong,
td span {
  display: block;
}

td strong {
  margin-bottom: 4px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

/* Action buttons */
.action-buttons {
  display: inline-flex;
  gap: 8px;
}

/* Mobile responsive */
@media (max-width: 760px) {
  .admin-table-card {
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
  td:nth-child(2)::before { content: 'Email'; }
  td:nth-child(3)::before { content: 'User'; }
  td:nth-child(4)::before { content: 'Segment'; }
  td:nth-child(5)::before { content: 'Reg. Date'; }
  td:nth-child(6)::before { content: 'Status'; }
  td:nth-child(7)::before { content: 'Action'; }

  .col-no {
    width: auto;
    text-align: left;
  }
}
</style>
