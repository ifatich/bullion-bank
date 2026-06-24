<script setup lang="ts">
type MenuItem = {
  label: string
  to?: string
  variant?: 'plus'
}

defineProps<{
  title: string
  items: MenuItem[]
}>()

const emit = defineEmits<{
  select: [item: MenuItem]
}>()

const handleSelect = (item: MenuItem) => {
  if (!item.to) {
    emit('select', item)
  }
}
</script>

<template>
  <section class="menu-card" :aria-label="title">
    <h2>{{ title }}</h2>

    <div class="menu-grid">
      <component
        :is="item.to ? 'RouterLink' : 'button'"
        v-for="item in items"
        :key="item.label"
        class="menu-item"
        :to="item.to"
        :type="item.to ? undefined : 'button'"
        @click="handleSelect(item)"
      >
        <span class="menu-icon" :class="{ plus: item.variant === 'plus' }">
          <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="28" fill="var(--g-kit-turquoise-10)" />
            <path
              d="M18 35h20M22 35l3-14h6l3 14M20 25h16M23 21l-4 6M33 21l4 6"
              stroke="var(--g-kit-broccoli-40)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="39"
              cy="39"
              r="7"
              fill="var(--g-kit-lime-50)"
              stroke="var(--g-kit-white)"
              stroke-width="2"
            />
            <path
              d="M39 35v8M35 39h8"
              stroke="var(--g-kit-white)"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <span>{{ item.label }}</span>
      </component>
    </div>
  </section>
</template>

<style scoped>
.menu-card {
  width: 368px;
  min-height: 166px;
  padding: 12px 16px 24px;
  border-radius: 12px;
  background: var(--g-kit-white);
  box-shadow: var(--bb-elevation-1);
}

h2 {
  margin: 0 0 16px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-kappa);
  font-weight: var(--g-kit-font-weight-bold);
  line-height: var(--g-kit-line-height-kappa);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 104px);
  gap: 12px;
}

.menu-item {
  width: 104px;
  min-height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--g-kit-black-80);
  cursor: pointer;
  text-decoration: none;
}

.menu-icon,
.menu-icon svg {
  width: 56px;
  height: 56px;
}

.menu-item > span:last-child {
  max-width: 104px;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-sigma);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-sigma);
  text-align: center;
}

@media (max-width: 1180px) {
  .menu-card {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .menu-grid {
    grid-template-columns: repeat(2, 104px);
  }
}
</style>
