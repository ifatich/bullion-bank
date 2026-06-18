<script setup lang="ts">
type VehicleIdentity = {
  companyId: string
  companyName: string
  walletId: string
  segment: string
  pgtHolding: string
}

defineProps<{
  rows: VehicleIdentity[]
}>()
</script>

<template>
  <section class="vehicle-card" aria-labelledby="vehicle-title">
    <h2 id="vehicle-title">Identitas Kendaraan</h2>

    <label class="row-control">
      <span>Lihat</span>
      <select aria-label="Jumlah baris">
        <option>10</option>
      </select>
      <span>baris</span>
    </label>

    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th>Company ID</th>
            <th>User</th>
            <th>Segment</th>
            <th>PGT Holding</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="`${row.companyId}-${index}`">
            <td class="col-no">{{ index + 1 }}</td>
            <td>{{ row.companyId }}</td>
            <td>
              <strong>{{ row.companyName }}</strong>
              <span>{{ row.walletId }}</span>
            </td>
            <td>{{ row.segment }}</td>
            <td class="holding">{{ row.pgtHolding }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="table-info">Menampilkan 1 sampai {{ rows.length }} dari {{ rows.length }} baris</p>
  </section>
</template>

<style scoped>
.vehicle-card {
  padding: 24px;
  border-radius: 8px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

h2 {
  margin: 0 0 16px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-lambda);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-lambda);
}

.row-control {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

.row-control select {
  height: 24px;
  padding: 0 24px 0 8px;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 4px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font: inherit;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 4px;
}

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

.col-no {
  width: 66px;
  text-align: center;
}

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

.holding {
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-lambda);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-lambda);
  white-space: nowrap;
}

.table-info {
  margin: 16px 0 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
}

@media (max-width: 760px) {
  .vehicle-card {
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

  td:nth-child(1)::before {
    content: 'No';
  }

  td:nth-child(2)::before {
    content: 'Company ID';
  }

  td:nth-child(3)::before {
    content: 'User';
  }

  td:nth-child(4)::before {
    content: 'Segment';
  }

  td:nth-child(5)::before {
    content: 'PGT Holding';
  }

  .col-no {
    width: auto;
    text-align: left;
  }
}
</style>
