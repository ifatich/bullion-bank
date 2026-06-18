<script setup lang="ts">
type MetricItem = {
  label: string
  period: string
  trend: string
  value: string
}

defineProps<{
  items: MetricItem[]
}>()
</script>

<template>
  <section class="admin-card metric-panel" aria-labelledby="admin-dashboard-title">
    <h1 id="admin-dashboard-title">Dashboard</h1>

    <div class="metric-grid">
      <article v-for="item in items" :key="item.label" class="metric-card">
        <div class="metric-copy">
          <h2>{{ item.label }}</h2>
          <p>{{ item.period }}</p>
        </div>
        <div class="metric-value">
          <span>{{ item.trend }}</span>
          <strong>{{ item.value }}</strong>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.admin-card {
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

.metric-panel {
  min-width: 0;
  padding: 12px 16px 24px;
}

h1 {
  margin: 0 0 16px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.metric-card {
  min-height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid var(--g-kit-black-10);
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--g-kit-black-10) 70%, var(--g-kit-white)) 0%,
    var(--g-kit-white) 100%
  );
}

.metric-copy h2,
.metric-copy p {
  margin: 0;
}

.metric-copy h2 {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omicron);
}

.metric-copy p {
  margin-top: 2px;
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omega);
}

.metric-value {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.metric-value span {
  min-height: 27px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omega);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-omega);
}

.metric-value strong {
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-epsilon);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-epsilon);
  white-space: nowrap;
}

@media (max-width: 760px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }
}
</style>
