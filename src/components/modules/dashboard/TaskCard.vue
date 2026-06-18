<script setup lang="ts">
import { GBadge, GButton } from '@/components'

const tasks = [
  { label: '---------------------------------------', count: '2' },
  { label: '---------------------------------------', count: '99+' },
  { label: '---------------------------------------', count: '99+' }
]
</script>

<template>
  <section class="task-card" aria-labelledby="task-title">
    <div class="task-header">
      <div class="task-title">
        <h2 id="task-title">Tugasku</h2>
        <GBadge class="task-badge" label="99+" type="danger" />
      </div>
      <GButton class="see-all" :icon="false" label="Lihat Semua" size="sm" type="outline-primary" />
    </div>

    <div class="task-list">
      <div v-for="task in tasks" :key="`${task.label}-${task.count}`" class="task-row">
        <span>{{ task.label }}</span>
        <strong>{{ task.count }}</strong>
      </div>
    </div>
  </section>
</template>

<style scoped>
.task-card {
  width: 368px;
  height: 226px;
  padding: 12px 16px 24px;
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.task-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.task-title {
  display: flex;
  align-items: center;
  gap: 4px;
}

h2 {
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.see-all {
  width: auto;
}

.task-list {
  display: flex;
  flex-direction: column;
}

.task-row {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--g-kit-black-20);
  color: var(--g-kit-black-80);
}

.task-row:last-child {
  border-bottom: 0;
}

.task-row span {
  overflow: hidden;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-row strong {
  color: var(--g-kit-lime-50);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-sigma);
}

@media (max-width: 1180px) {
  .task-card {
    width: 100%;
  }
}
</style>
