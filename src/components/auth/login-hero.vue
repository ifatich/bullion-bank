<template>
  <div class="hero">
    <img class="logo" src="@/assets/pegadaian-logo.svg" alt="Pegadaian" />

    <div class="content">
      <span class="subtitle"> Selamat Datang di </span>

      <h1>
        Tokenized Gold
        <br />
        Receipt
      </h1>

      <div class="line" />

      <p>Akses aplikasi dengan menggunakan username dan password.</p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
}

.logo {
  width: 220px;
}

.content {
  margin-top: auto;
  margin-bottom: 80px;
}

.subtitle {
  font-size: 26px;
  opacity: 0.8;
}

h1 {
  font-size: 72px;
  line-height: 1.1;
  margin: 16px 0;
  font-weight: 700;
}

.line {
  width: 80px;
  height: 4px;
  background: white;
  margin: 24px 0;
}

p {
  font-size: 18px;
  max-width: 480px;
}
</style>
