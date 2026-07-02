<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  hideRefresh?: boolean
}

withDefaults(defineProps<Props>(), {
  hideRefresh: false
})

const emit = defineEmits<{
  (e: 'update:captcha', value: string): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const captchaText = ref('')

const generateRandomText = (length = 6): string => {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Omit ambiguous characters like o, O, 0, i, I, l, 1
  let text = ''
  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return text
}

const drawCaptcha = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const text = generateRandomText()
  captchaText.value = text
  emit('update:captcha', text)

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw background with gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  grad.addColorStop(0, '#f0f3f6')
  grad.addColorStop(1, '#e2e8f0')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw background noise lines
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, 0.4)`
    ctx.lineWidth = 1 + Math.random() * 2
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }

  // Draw background noise dots
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 0.5)`
    ctx.beginPath()
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 1.5, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw text
  ctx.textBaseline = 'middle'
  const charSpacing = canvas.width / (text.length + 1)
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    ctx.font = `bold ${24 + Math.random() * 6}px sans-serif`
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 120)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 150)}, 0.95)`

    const x = charSpacing * (i + 0.8)
    const y = canvas.height / 2 + (Math.random() * 10 - 5)
    const angle = (Math.random() * 30 - 15) * Math.PI / 180

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillText(char, -8, 0)
    ctx.restore()
  }
}

const refresh = () => {
  drawCaptcha()
}

onMounted(() => {
  drawCaptcha()
})

defineExpose({
  refresh
})
</script>

<template>
  <div class="captcha-container" :class="{ 'no-refresh': hideRefresh }">
    <canvas
      ref="canvasRef"
      width="150"
      height="45"
      class="captcha-canvas"
      aria-label="Captcha Image"
    ></canvas>
    <button
      v-if="!hideRefresh"
      type="button"
      class="captcha-refresh-btn"
      @click="refresh"
      title="Segarkan Captcha"
      aria-label="Refresh Captcha"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="refresh-icon"
      >
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.captcha-container {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

.captcha-canvas {
  border: 1px solid var(--g-kit-black-10, #e2e8f0);
  border-radius: 6px;
  background-color: #f8fafc;
  user-select: none;
}

.captcha-container.no-refresh {
  gap: 0;
  align-items: stretch;
}

.captcha-container.no-refresh .captcha-canvas {
  border: none;
  border-right: 1px solid var(--g-kit-black-20, #cbd5e1);
  border-radius: 0;
  height: 100%;
  width: 120px;
  display: block;
}

@media (max-width: 400px) {
  .captcha-container.no-refresh .captcha-canvas {
    width: 90px;
  }
}

.captcha-refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--g-kit-black-10, #e2e8f0);
  border-radius: 6px;
  background: var(--g-kit-white, #ffffff);
  color: var(--g-kit-black-60, #64748b);
  cursor: pointer;
  transition: all 0.2s ease;
}

.captcha-refresh-btn:hover {
  background: var(--g-kit-black-5, #f1f5f9);
  color: var(--g-kit-black-80, #334155);
}

.refresh-icon {
  width: 18px;
  height: 18px;
}
</style>
