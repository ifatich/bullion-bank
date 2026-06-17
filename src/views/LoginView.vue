<script setup>
import LoginHero from '@/components/auth/login-hero.vue'
import LoginForm from '@/components/auth/login-form.vue'
</script>

<template>
  <div class="login-page">
    <div class="left-side">
      <LoginHero />
    </div>

    <div class="right-side">
      <LoginForm />
    </div>

    <footer>Copyright © 2026 PT Pegadaian. All Rights Reserved</footer>
  </div>
</template>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 650px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('@/assets/auth-bg.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 40px 80px;
  position: relative;
}

.left-side {
  display: flex;
}

.right-side {
  display: flex;
  align-items: center;
  justify-content: center;
}

footer {
  position: absolute;
  bottom: 20px;
  right: 50px;
  color: white;
  font-size: 14px;
}

@media (max-width: 1200px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .left-side {
    display: none;
  }

  .right-side {
    min-height: 100vh;
  }
}

@media (max-width: 768px) {
  .login-page {
    padding: 24px;
  }

  .login-card {
    padding: 32px;
  }
}
</style>
