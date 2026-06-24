<script setup lang="ts">
import DashboardTopbar from '@/components/modules/user/dashboard/DashboardTopbar.vue'
import Breadcrumb from '@/components/shared/breadcrumb/Breadcrumb.vue'
import NavBack from '@/components/shared/navBack/navBack.vue'

type BreadcrumbItem = string | { label: string; to?: string }

withDefaults(
  defineProps<{
    breadcrumb?: BreadcrumbItem[]
    navBackLabel?: string
    navBackTo?: string
    infoBanner?: string
    title?: string
    background?: string
  }>(),
  {
    breadcrumb: undefined,
    navBackLabel: undefined,
    navBackTo: undefined,
    infoBanner: undefined,
    title: undefined,
    background: 'var(--g-kit-white)',
  },
)
</script>

<template>
  <div class="user-page" :style="{ background }">
    <main class="user-main">
      <DashboardTopbar />

      <nav v-if="breadcrumb" class="breadcrumb-row" aria-label="Breadcrumb">
        <Breadcrumb :items="breadcrumb" />
      </nav>

      <div v-if="breadcrumb" class="header-line" aria-hidden="true" />

      <section class="page-content" :aria-labelledby="title ? 'page-title' : undefined">
        <NavBack v-if="navBackLabel" :id="title ? 'page-title' : undefined" :label="navBackLabel" :to="navBackTo" />

        <aside v-if="infoBanner" class="info-banner">
          <p>{{ infoBanner }}</p>
          <span class="info-accent" aria-hidden="true" />
        </aside>

        <slot />
      </section>
    </main>

    <div v-if="$slots.actions" class="action-bar">
      <div class="action-inner">
        <slot name="actions" />
      </div>
    </div>

    <footer class="page-footer">Copyright © 2024 PT. Pegadaian. All Rights Reserved.</footer>
  </div>
</template>

<style scoped>
.user-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: var(--g-kit-white);
  color: var(--g-kit-black-80);
  font-family:
    'Nunito Sans',
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.user-main {
  flex: 1;
  padding-bottom: 24px;
}

.breadcrumb-row,
.header-line,
.page-content,
.action-inner {
  width: min(1152px, calc(100vw - 48px));
  margin-right: auto;
  margin-left: auto;
}

.header-line {
  height: 1px;
  background: var(--g-kit-black-20);
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-banner {
  min-height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 12px;
  border-radius: 6px;
  background: var(--g-kit-blue-10);
}

.info-banner p {
  position: relative;
  z-index: 1;
  min-width: 0;
  margin: 0;
  color: var(--g-kit-black-80);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

.info-accent {
  position: absolute;
  top: -48px;
  right: -65px;
  width: 129px;
  height: 111px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--g-kit-blue-40) 35%, transparent);
}

.info-accent::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--g-kit-blue-40) 18%, transparent);
}

.action-bar {
  min-height: 104px;
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  background: var(--g-kit-white);
  border-top: 1px solid var(--g-kit-black-20);
  border-bottom: 1px solid var(--g-kit-black-20);
}

.action-inner {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}

.page-footer {
  width: 100%;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--g-kit-black-20);
  background: var(--g-kit-white);
  color: var(--g-kit-black-60);
  font-size: var(--g-kit-font-size-omicron);
  font-weight: var(--g-kit-font-weight-normal);
  line-height: var(--g-kit-line-height-omicron);
}

@media (max-width: 760px) {
  .breadcrumb-row,
  .header-line,
  .page-content,
  .action-inner {
    width: calc(100vw - 32px);
  }

  .page-content {
    margin-top: 24px;
  }

  .page-footer {
    padding: 12px 16px;
    text-align: center;
    font-size: var(--g-kit-font-size-sigma);
  }

  .action-inner {
    flex-direction: column-reverse;
    gap: 12px;
    padding: 12px 0;
  }

  :deep(.action-button) {
    width: 100%;
  }
}
</style>
