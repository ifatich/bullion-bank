<script setup>
import BaseInput from '@/components/base/input.vue'
import BaseButton from '@/components/base/button.vue'
import BaseCard from '@/components/base/card.vue'

import LoginHeader from './login-header.vue'

import { useLogin } from '../../composables/useLogin.js'

const { username, password, loading, login } = useLogin()
</script>

<template>
  <BaseCard class="login-card">
    <LoginHeader />

    <BaseInput v-model="username" label="Email" placeholder="Username HCMS / Aralia" />

    <BaseInput v-model="password" type="password" label="Password" placeholder="Password" />

    <div class="forgot">
      <a href="#"> Lupa Password? </a>
    </div>

    <BaseButton :loading="loading" @click="login"> Masuk </BaseButton>

    <div class="help">
      Butuh Bantuan?
      <a href="#"> Klik disini </a>
    </div>
  </BaseCard>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 540px;
}

.forgot {
  text-align: right;
  margin-bottom: 24px;
}

.forgot a,
.help a {
  color: #00b140;
  font-weight: 600;
  text-decoration: none;
}

.help {
  text-align: center;
  margin-top: 24px;
}
</style>
