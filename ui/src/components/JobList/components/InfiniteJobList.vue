<script setup lang="ts">
import { computed } from 'vue'
import type { JobPosting } from '@/types'
import JobItem from '@/components/JobItem/JobItem.vue'
import BaseIcon from '@/components/shared/BaseIcon/BaseIcon.vue'
import { type LayoutType } from '@/components/shared/LayoutToggleGroup.vue'

const props = defineProps<{
  jobs: JobPosting[]
  layout: LayoutType
  hasMore?: boolean
  isLoading?: boolean
  class?: string
}>()

const emit = defineEmits<{
  loadMore: []
}>()

const handleLoadMore = () => {
  if (!props.isLoading && props.hasMore) {
    emit('loadMore')
  }
}
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
        v-for="job in jobs"
        :key="job.id"
        :job="job"
        :layout="layout"
        :class="layout === 'grid' ? 'h-full' : ''"
      />
    </div>

    <div
      v-if="hasMore"
      class="flex justify-center py-4"
    >
      <button
        @click="handleLoadMore"
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
      v-else-if="jobs.length > 0"
      class="flex justify-center py-4"
    >
      <span
        class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
      >
        <BaseIcon
          name="check-circle"
          class="w-5 h-5"
        />
        That's all the jobs!
      </span>
    </div>
  </div>
</template>
