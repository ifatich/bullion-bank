<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  startDate: string
  endDate: string
  firstLabel?: string
  secondLabel?: string
  firstPlaceholder?: string
  secondPlaceholder?: string
}>(), {
  firstLabel: 'Tanggal Mulai',
  secondLabel: 'Tanggal Akhir',
  firstPlaceholder: 'DD / MM / YYYY',
  secondPlaceholder: 'DD / MM / YYYY',
})

const emit = defineEmits<{
  'update:start-date': [value: string]
  'update:end-date': [value: string]
}>()

type ActiveField = 'start' | 'end' | null
const activeField = ref<ActiveField>(null)
const calendarMonth = ref(new Date())
const popupTop = ref(0)
const popupLeft = ref(0)
const popupStyle = computed(() => ({
  top: popupTop.value + 'px',
  left: popupLeft.value + 'px',
}))
const triggerEl = ref<HTMLElement | null>(null)
const showPopup = ref(false)

const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const monthsShort = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES']

const showMonthMenu = ref(false)
const showYearMenu = ref(false)

const year = computed(() => calendarMonth.value.getFullYear())
const month = computed(() => calendarMonth.value.getMonth())
const formattedMonth = computed(() => monthNames[month.value])
const formattedYear = computed(() => String(year.value))

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const result: number[] = []
  for (let y = currentYear + 3; y >= 1900; y--) {
    result.push(y)
  }
  return result
})

function formatDisplay(dateStr: string): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr + 'T00:00:00')
    if (isNaN(d.getTime())) return dateStr
    return `${String(d.getDate()).padStart(2, '0')} / ${String(d.getMonth() + 1).padStart(2, '0')} / ${d.getFullYear()}`
  } catch {
    return dateStr
  }
}

function dateToIso(d: Date): string {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const calendarDays = computed(() => {
  const firstDay = new Date(year.value, month.value, 1)
  const lastDay = new Date(year.value, month.value + 1, 0)
  const startDow = firstDay.getDay()

  const days: Array<{ date: Date | null; isCurrentMonth: boolean }> = []
  
  for (let i = startDow - 1; i >= 0; i--) {
    days.push({ date: new Date(year.value, month.value, -i), isCurrentMonth: false })
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(year.value, month.value, i), isCurrentMonth: true })
  }
  
  // Only pad to complete the last row — no extra full row of disabled dates
  const remaining = (7 - (days.length % 7)) % 7
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year.value, month.value + 1, i), isCurrentMonth: false })
  }
  
  return days
})

const calendarWeeks = computed(() => {
  const weeks: Array<Array<{ date: Date | null; isCurrentMonth: boolean }>> = []
  for (let i = 0; i < calendarDays.value.length; i += 7) {
    weeks.push(calendarDays.value.slice(i, i + 7))
  }
  return weeks
})

function isSelected(day: Date | null): boolean {
  if (!day) return false
  const s = dateToIso(day)
  return s === props.startDate || s === props.endDate
}

function isInRange(day: Date | null): boolean {
  if (!day || !props.startDate || !props.endDate) return false
  const diso = dateToIso(day)
  return diso > props.startDate && diso < props.endDate
}

function isBeforeStart(day: Date | null): boolean {
  if (!day || !props.startDate) return false
  return dateToIso(day) < props.startDate
}

function isFutureDate(day: Date | null): boolean {
  if (!day) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return day > today
}

function prevMonth() {
  calendarMonth.value = new Date(year.value, month.value - 1, 1)
}

function nextMonth() {
  calendarMonth.value = new Date(year.value, month.value + 1, 1)
}

function toggleMonthMenu() {
  showMonthMenu.value = !showMonthMenu.value
  if (showMonthMenu.value) showYearMenu.value = false
}

function toggleYearMenu() {
  showYearMenu.value = !showYearMenu.value
  if (showYearMenu.value) showMonthMenu.value = false
}

function selectMonth(monthIndex: number) {
  calendarMonth.value = new Date(year.value, monthIndex, 1)
  showMonthMenu.value = false
}

function selectYear(selectedYear: number) {
  calendarMonth.value = new Date(selectedYear, month.value, 1)
  showYearMenu.value = false
}

function openCalendar(field: ActiveField, el: HTMLElement) {
  if (!field) return
  activeField.value = field
  
  const dateStr = field === 'start' ? props.startDate : props.endDate
  if (dateStr) {
    try {
      const d = new Date(dateStr + 'T00:00:00')
      if (!isNaN(d.getTime())) calendarMonth.value = d
    } catch {
      calendarMonth.value = new Date()
    }
  }
  
  triggerEl.value = el
  updatePopupPos()
  showMonthMenu.value = false
  showYearMenu.value = false
  showPopup.value = true
}

function updatePopupPos() {
  if (!triggerEl.value) return
  const rect = triggerEl.value.getBoundingClientRect()
  const popupHeight = 460
  const gap = 8
  const edgeMargin = 8

  let top = rect.bottom + gap
  let left = Math.round(rect.left)

  // Flip above if not enough space below AND enough space above
  const spaceBelow = window.innerHeight - rect.bottom - gap - edgeMargin
  const spaceAbove = rect.top - gap - edgeMargin
  if (spaceBelow < popupHeight && spaceAbove >= popupHeight) {
    top = rect.top - popupHeight - gap
  }

  // Clamp top so popup doesn't go above viewport
  if (top < edgeMargin) top = edgeMargin

  // Clamp bottom so popup doesn't go below viewport
  if (top + popupHeight > window.innerHeight - edgeMargin) {
    top = window.innerHeight - popupHeight - edgeMargin
  }

  // Keep within horizontal bounds
  const popupWidth = 360
  if (left + popupWidth > window.innerWidth - edgeMargin) {
    left = Math.max(edgeMargin, window.innerWidth - popupWidth - edgeMargin)
  }
  if (left < edgeMargin) left = edgeMargin

  popupTop.value = Math.round(top)
  popupLeft.value = Math.round(left)
}

function selectDate(day: Date | null) {
  if (!day || !day.getDate()) return
  
  const dateStr = dateToIso(day)
  
  if (activeField.value === 'start') {
    emit('update:start-date', dateStr)
    activeField.value = 'end'
    const endEl = document.querySelector('[data-drp-end]') as HTMLElement
    if (endEl) {
      setTimeout(() => openCalendar('end', endEl), 50)
    }
  } else if (activeField.value === 'end') {
    emit('update:end-date', dateStr)
    closeCalendar()
  }
}

function closeCalendar() {
  showPopup.value = false
  activeField.value = null
  showMonthMenu.value = false
  showYearMenu.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (!showPopup.value) return
  const target = e.target as HTMLElement
  if (target.closest('[data-drp-container]') || target.closest('[data-drp-popup]')) return
  closeCalendar()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div data-drp-container class="date-range-popup-wrapper">
    <div class="date-range-inputs">
      <div class="group-input calendar-input">
        <label class="form-label">{{ firstLabel }}</label>
        <div class="input-group custom-input-group-icon" :class="{ active: showPopup && activeField === 'start' }">
          <input
            type="text"
            class="form-control"
            :value="formatDisplay(startDate)"
            :placeholder="firstPlaceholder"
            readonly
            @click="openCalendar('start', $event.currentTarget as HTMLElement)"
            data-drp-start
          />
          <div class="input-group-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="group-input calendar-input">
        <label class="form-label">{{ secondLabel }}</label>
        <div class="input-group custom-input-group-icon" :class="{ active: showPopup && activeField === 'end' }">
          <input
            type="text"
            class="form-control"
            :value="formatDisplay(endDate)"
            :placeholder="secondPlaceholder"
            readonly
            @click="openCalendar('end', $event.currentTarget as HTMLElement)"
            data-drp-end
          />
          <div class="input-group-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showPopup" data-drp-popup class="drp-calendar-popup" :class="{ 'drp-menu-open': showMonthMenu || showYearMenu }" :style="popupStyle">
        <div class="drp-calendar-card">
          <div class="drp-title-bar">
            <span class="drp-title-text">Pilih Tanggal</span>
            <button type="button" class="drp-close-btn" @click.stop="closeCalendar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z" fill="#58585B"/>
              </svg>
            </button>
          </div>
          <div class="drp-header">
            <button type="button" class="drp-nav-btn" @click.stop="prevMonth">‹</button>
            <div class="drp-month-year">
              <span
                class="drp-month-year-text"
                :class="{ active: showMonthMenu }"
                @click.stop="toggleMonthMenu"
              >{{ formattedMonth }}</span>
              <span
                class="drp-month-year-text"
                :class="{ active: showYearMenu }"
                @click.stop="toggleYearMenu"
              >{{ formattedYear }}</span>
            </div>
            <button type="button" class="drp-nav-btn" @click.stop="nextMonth">›</button>
          </div>

          <!-- Month Menu -->
          <div v-if="showMonthMenu" class="drp-month-menu">
            <button
              v-for="(m, idx) in monthsShort"
              :key="m"
              type="button"
              :class="{ active: idx === month }"
              @click.stop="selectMonth(idx)"
            >{{ m }}</button>
          </div>

          <!-- Year Menu -->
          <div v-if="showYearMenu" class="drp-year-menu">
            <button
              v-for="y in years"
              :key="y"
              type="button"
              :class="{ active: y === year }"
              @click.stop="selectYear(y)"
            >{{ y }}</button>
          </div>

          <div class="drp-calendar-scroll" v-show="!showMonthMenu && !showYearMenu">
            <div class="drp-weekdays">
              <div v-for="day in daysOfWeek" :key="day" class="drp-weekday">{{ day }}</div>
            </div>

            <div class="drp-days">
              <div v-for="(week, wi) in calendarWeeks" :key="wi" class="drp-week">
                <button
                  v-for="(d, di) in week"
                  :key="di"
                  type="button"
                  class="drp-day"
                  :class="{
                    'drp-current': d.isCurrentMonth,
                    'drp-selected': isSelected(d.date),
                    'drp-range': isInRange(d.date),
                    'drp-future': isFutureDate(d.date),
                  }"
                  :disabled="!d.isCurrentMonth || (activeField === 'end' && isBeforeStart(d.date)) || isFutureDate(d.date)"
                  @click="selectDate(d.date)"
                >
                  {{ d.date?.getDate() || '' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.date-range-popup-wrapper {
  width: 100%;
}

.group-input {
  margin-bottom: 0;
}

.date-range-inputs {
  display: flex;
  gap: 16px;
}

.date-range-inputs .group-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Active input-group border matching kitvue */
.date-range-inputs .custom-input-group-icon.active {
  border: 1px solid var(--g-kit-lime-50);
}

.drp-calendar-popup {
  position: fixed;
  z-index: 2000;
  background: var(--g-kit-white);
  border-radius: 0.875rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  width: 360px;
  display: flex;
  flex-direction: column;
}

/* Keep popup tall enough for absolutely positioned menus on desktop */
.drp-calendar-popup.drp-menu-open {
  min-height: 460px;
}

.drp-calendar-card {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  min-height: 0;
}

.drp-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--g-kit-white);
  border-bottom: 1px solid var(--g-kit-black-20);
  border-top-left-radius: 0.875rem;
  border-top-right-radius: 0.875rem;
}

.drp-title-text {
  font-size: var(--g-kit-font-size-lambda);
  line-height: var(--g-kit-line-height-lambda);
  font-weight: var(--g-kit-font-weight-bold);
  color: var(--g-kit-black-80);
}

.drp-close-btn {
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--g-kit-black-80);
  display: flex;
  align-items: center;
  justify-content: center;
}

.drp-close-btn:hover {
  opacity: 0.7;
}

.drp-calendar-scroll {
  max-height: 380px;
  overflow-y: auto;
}

.drp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--g-kit-black-20);
}

.drp-nav-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--g-kit-black-80);
  cursor: pointer;
  font-size: var(--g-kit-font-size-lambda);
  line-height: var(--g-kit-line-height-lambda);
  font-weight: var(--g-kit-font-weight-bold);
}

.drp-nav-btn:hover {
  color: var(--g-kit-lime-50);
}

.drp-month-year {
  display: flex;
  gap: 0.5rem;
}

.drp-month-year-text {
  font-weight: var(--g-kit-font-weight-bold);
  font-size: var(--g-kit-font-size-lambda);
  line-height: var(--g-kit-line-height-lambda);
  color: var(--g-kit-lime-50);
  cursor: pointer;
}

.drp-month-year-text.active {
  color: var(--g-kit-black-50);
}

.drp-month-year-text:hover {
  color: var(--g-kit-lime-50);
}

.drp-month-menu,
.drp-year-menu {
  position: absolute;
  left: 0;
  right: 0;
  top: 124px;
  bottom: 0;
  z-index: 10;
  background: var(--g-kit-white);
  border: 1px solid var(--g-kit-black-20);
  border-bottom-left-radius: 0.875rem;
  border-bottom-right-radius: 0.875rem;
  box-shadow: 0 12px 6px rgba(0, 0, 0, 0.02), 0 4px 6px rgba(0, 0, 0, 0.02);
  overflow-y: auto;
  scrollbar-width: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  align-content: flex-start;
  max-height: 300px;
}

.drp-month-menu button,
.drp-year-menu button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--g-kit-font-size-lambda);
  line-height: var(--g-kit-line-height-lambda);
  font-weight: var(--g-kit-font-weight-normal);
  color: var(--g-kit-black-80);
  text-align: center;
}

.drp-month-menu button:hover,
.drp-year-menu button:hover {
  color: var(--g-kit-lime-50);
}

.drp-month-menu button.active,
.drp-year-menu button.active {
  background: var(--g-kit-lime-50);
  color: var(--g-kit-white);
  border-radius: 8px;
}

.drp-weekdays {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--g-kit-black-20);
  border-bottom: 1px solid var(--g-kit-black-20);
}

.drp-weekday {
  flex: 1;
  text-align: center;
  font-weight: bold;
}

.drp-days {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.drp-week {
  display: flex;
  gap: 0.5rem;
}

.drp-day {
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--g-kit-black-80);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  place-content: center;
  padding: 0.5rem;
  flex: 1;
  text-align: center;
}

.drp-day:not(:disabled):hover {
  background: var(--g-kit-lime-50);
  color: var(--g-kit-white);
}

.drp-day.drp-current {
  font-weight: var(--g-kit-font-weight-regular);
}

.drp-day:disabled {
  color: var(--g-kit-black-20);
  cursor: not-allowed;
  pointer-events: none;
}

.drp-day.drp-selected {
  background: var(--g-kit-lime-50);
  color: var(--g-kit-white);
  border-radius: 50%;
  font-weight: var(--g-kit-font-weight-regular);
}

.drp-day.drp-range {
  background: var(--g-kit-lime-10);
  color: var(--g-kit-lime-50);
}

.drp-day.drp-future {
  color: var(--g-kit-black-20);
  cursor: not-allowed;
  pointer-events: none;
}

@media (max-width: 600px) {
  .date-range-inputs {
    flex-direction: column;
  }

  .drp-calendar-popup {
    position: fixed !important;
    top: auto !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-height: 85vh;
    overflow-y: auto;
    border-radius: 16px 16px 0 0;
    display: flex;
    flex-direction: column;
    z-index: 2100;
    animation: drp-slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  }

  .drp-calendar-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .drp-calendar-scroll {
    flex: 1;
    max-height: none;
  }

  .drp-month-menu,
  .drp-year-menu {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    flex: 1;
    overflow-y: auto;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .drp-year-menu button {
    padding: 0.5rem 0.75rem;
    font-size: var(--g-kit-font-size-omicron);
  }

  @keyframes drp-slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
}
</style>
