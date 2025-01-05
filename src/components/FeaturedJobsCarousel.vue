<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import JobItem from '@/components/JobItem/JobItem.vue'
import type { JobPosting } from '@/types'

const props = defineProps<{
  jobs: JobPosting[]
  class?: string
  title: string
}>()

const scrollPosition = ref(0)
const autoScrollInterval = ref<number | null>(null)
const SCROLL_SPEED = -0.05 // pixels per millisecond, negative for reverse direction

const jobWidth = 316 // 300px width + 16px gap
const containerWidth = ref(0)
const carouselContainer = ref<HTMLElement | null>(null)

const totalWidth = computed(() => props.jobs.length * jobWidth)

const wrapPosition = (position: number) => {
  const total = totalWidth.value
  position = position % total
  if (position < -total / 2) position += total
  if (position > total / 2) position -= total
  return position
}

const visibleJobs = computed(() => {
  const buffer = containerWidth.value
  const positions: { job: JobPosting; position: number; opacity: number }[] = []

  // Generate three sets of jobs: main set, left clone, and right clone
  for (const offset of [-1, 0, 1]) {
    props.jobs.forEach((job, index) => {
      const position = wrapPosition(
        index * jobWidth - scrollPosition.value + offset * totalWidth.value,
      )

      // Only add if within the visible range (including buffer)
      if (position >= -buffer && position <= containerWidth.value + buffer) {
        positions.push({
          job,
          position,
          opacity: Math.max(
            0,
            1 -
              Math.abs(position - containerWidth.value / 2) /
                (containerWidth.value / 2),
          ),
        })
      }
    })
  }

  return positions
})

const updateContainerWidth = () => {
  if (carouselContainer.value) {
    containerWidth.value = carouselContainer.value.offsetWidth
  }
}

const startAutoScroll = () => {
  stopAutoScroll()
  let lastTime = performance.now()

  autoScrollInterval.value = window.setInterval(() => {
    const currentTime = performance.now()
    const delta = currentTime - lastTime
    lastTime = currentTime

    // Update scroll position and wrap it when needed
    scrollPosition.value += SCROLL_SPEED * delta
    if (scrollPosition.value >= totalWidth.value) {
      scrollPosition.value -= totalWidth.value
    }
  }, 16) // ~60fps
}

const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
    autoScrollInterval.value = null
  }
}

// Add manual scroll handling
const isDragging = ref(false)
const startX = ref(0)
const startScrollPosition = ref(0)

const onPointerDown = (e: PointerEvent) => {
  isDragging.value = true
  startX.value = e.clientX
  startScrollPosition.value = scrollPosition.value
  stopAutoScroll()
}

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return

  const delta = e.clientX - startX.value
  scrollPosition.value = startScrollPosition.value - delta

  // Wrap the scroll position
  if (scrollPosition.value >= totalWidth.value) {
    scrollPosition.value -= totalWidth.value
    startScrollPosition.value -= totalWidth.value
    startX.value = e.clientX
  } else if (scrollPosition.value < 0) {
    scrollPosition.value += totalWidth.value
    startScrollPosition.value += totalWidth.value
    startX.value = e.clientX
  }
}

const onPointerUp = () => {
  isDragging.value = false
  startAutoScroll()
}

onMounted(() => {
  updateContainerWidth()
  window.addEventListener('resize', updateContainerWidth)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  startAutoScroll()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerWidth)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  stopAutoScroll()
})
</script>

<template>
  <div :class="['space-y-4', props.class]">
    <h2 class="text-2xl font-semibold text-gray-700 dark:text-white">
      {{ props.title }}
    </h2>
    <div
      ref="carouselContainer"
      class="relative overflow-hidden h-[160px] w-full cursor-grab active:cursor-grabbing"
      @mouseenter="stopAutoScroll"
      @mouseleave="startAutoScroll"
      @pointerdown="onPointerDown"
    >
      <!-- Left fade -->
      <div
        class="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"
      ></div>

      <!-- Right fade -->
      <div
        class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/80 to-white dark:via-gray-900/80 dark:to-gray-900 z-10"
      ></div>

      <div class="relative h-full w-full select-none">
        <div
          v-for="{ job, position, opacity } in visibleJobs"
          :key="`${job.id}-${position}`"
          class="w-[300px] transition-transform duration-300 absolute top-0 hover:!opacity-100"
          :style="{
            transform: `translateX(${position}px)`,
            opacity,
          }"
        >
          <JobItem
            :job="job"
            layout="card-tiny"
            class="h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
