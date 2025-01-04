<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { JobPosting } from '@/types'
import JobItem from '@/components/JobItem/JobItem.vue'
import BaseIcon from '@/components/shared/BaseIcon/BaseIcon.vue'
import { type LayoutType } from '@/components/shared/LayoutToggleGroup.vue'

const props = defineProps<{
  jobs: JobPosting[]
  layout: LayoutType
  pageSize: number
  class?: string
}>()

const currentPage = ref(1)
const isLoading = ref(false)

const visibleJobs = computed(() => {
  return props.jobs.slice(0, currentPage.value * props.pageSize)
})

const hasMoreJobs = computed(() => {
  return visibleJobs.value.length < props.jobs.length
})

const loadMoreJobs = async () => {
  if (isLoading.value || !hasMoreJobs.value) return

  isLoading.value = true
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
  currentPage.value++
  isLoading.value = false
}

const handleScroll = () => {
  const bottomOfWindow = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

  if (bottomOfWindow) {
    loadMoreJobs()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div :class="props.class">
    <div
      :class="[
        layout === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          : layout === 'list'
            ? 'flex flex-col gap-4'
            : 'flex flex-col divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm',
        'mb-8 max-w-4xl mx-auto lg:mx-0',
      ]"
    >
      <JobItem
        v-for="job in visibleJobs"
        :key="job.id"
        :job="job"
        :layout="layout"
        :class="layout === 'grid' ? 'h-full' : ''"
      />
    </div>

    <div
      v-if="hasMoreJobs"
      class="flex justify-center py-4"
    >
      <button
        @click="loadMoreJobs"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
        :disabled="isLoading"
      >
        <BaseIcon
          v-if="isLoading"
          name="spinner"
          class="w-5 h-5 animate-spin"
        />
        <BaseIcon
          v-else
          name="arrow-down-circle"
          class="w-5 h-5"
        />
        {{ isLoading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
    <div
      v-else-if="visibleJobs.length > 0"
      class="flex justify-center py-4"
    >
      <span class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <BaseIcon
          name="check-circle"
          class="w-5 h-5"
        />
        That's all the jobs!
      </span>
    </div>
  </div>
</template>
