<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const bottom = target.scrollHeight - target.scrollTop - target.clientHeight < 50

  if (bottom && !isLoading.value) {
    loadMoreJobs()
  }
}

onMounted(() => {
  loadMoreJobs()
})
</script>

<template>
  <div
    class="overflow-auto"
    :class="props.class"
    @scroll="handleScroll"
  >
    <div
      :class="[
        layout === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          : layout === 'list'
            ? 'flex flex-col gap-4'
            : 'flex flex-col divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm',
        'px-2 mb-8 max-w-4xl mx-auto lg:mx-0',
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
      v-if="isLoading"
      class="flex justify-center py-4"
    >
      <BaseIcon
        name="spinner"
        class="w-6 h-6 text-emerald-500"
      />
    </div>
  </div>
</template>
