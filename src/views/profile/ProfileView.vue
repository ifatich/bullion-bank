<script setup lang="ts">
import { useRouter } from 'vue-router'

import { GButton } from '@/components'
import DashboardTopbar from '@/components/modules/dashboard/DashboardTopbar.vue'
import ProfileForm from '@/components/modules/profile/ProfileForm.vue'
import Breadcrumb from '@/components/shared/breadcrumb/Breadcrumb.vue'
import NavBack from '@/components/shared/navBack/navBack.vue'
import { useAppAlert } from '@/hooks/useAppAlert'

const breadcrumbItems = [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Profile' }]

const router = useRouter()
const { showAlert } = useAppAlert()

const abortProfile = () => {
  showAlert({
    label: 'Perubahan profile dibatalkan.',
    variant: 'info',
  })
  router.push('/dashboard')
}

const submitProfile = () => {
  showAlert({
    label: 'Perubahan profile berhasil disimpan.',
    variant: 'success',
  })
}
</script>

<template>
  <div class="profile-page">
    <main class="profile-main">
      <DashboardTopbar />

      <nav class="breadcrumb-row" aria-label="Breadcrumb">
        <Breadcrumb :items="breadcrumbItems" />
      </nav>

      <div class="header-line" aria-hidden="true" />

      <section class="profile-content" aria-labelledby="profile-page-title">
        <NavBack id="profile-page-title" label="Dashboard" to="/dashboard" />

        <aside class="info-banner">
          <p>
            Manage your personal information and security preferences in one place, ensuring a
            seamless and secure Bullion Bank experience.
          </p>
          <span class="info-accent" aria-hidden="true" />
        </aside>

        <ProfileForm />
      </section>
    </main>

    <div class="action-bar">
      <div class="action-inner">
        <GButton
          class="action-button"
          :icon="false"
          label="Abort"
          size="md"
          type="neutral"
          @click="abortProfile"
        />
        <GButton
          class="action-button"
          :icon="false"
          label="Save Changes"
          size="md"
          type="primary"
          @click="submitProfile"
        />
      </div>
    </div>

    <footer class="profile-footer">Copyright © 2024 PT. Pegadaian. All Rights Reserved.</footer>
  </div>
</template>

<style scoped>
.profile-page {
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

.profile-main {
  flex: 1;
  padding-bottom: 24px;
}

.breadcrumb-row,
.header-line,
.profile-content,
.action-inner {
  width: min(1152px, calc(100vw - 48px));
  margin-right: auto;
  margin-left: auto;
}

.header-line {
  height: 1px;
  background: var(--g-kit-black-20);
}

.profile-content {
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

.profile-footer {
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

.action-button {
  width: 200px;
}

@media (max-width: 760px) {
  .breadcrumb-row,
  .header-line,
  .profile-content,
  .action-inner {
    width: calc(100vw - 32px);
  }

  .profile-content {
    margin-top: 24px;
  }

  .profile-footer {
    padding: 12px 16px;
    text-align: center;
    font-size: var(--g-kit-font-size-sigma);
  }

  .action-inner {
    flex-direction: column-reverse;
    gap: 12px;
    padding: 12px 0;
  }

  .action-button {
    width: 100%;
  }
}
</style>
