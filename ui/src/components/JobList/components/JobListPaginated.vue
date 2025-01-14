<template>
  <div v-if="isLoading && jobs.length === 0" class="flex-1 flex items-center justify-center">
    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>

  <div v-else-if="error" class="flex-1 flex items-center justify-center">
    <div class="text-red-500">{{ error }}</div>
  </div>

  <div v-else class="flex flex-col gap-4">
    <JobList
      :jobs="jobs"
      :title="title"
      :sort-direction="sortDirection"
      :sort-key="sortKey"
      :has-more="false"
      :is-loading="isLoading"
      :show-no-more-message="false"
      @update:sort-direction="$emit('update:sortDirection', $event)"
      @update:sort-key="$emit('update:sortKey', $event)"
    />

    <div class="flex items-center justify-between px-4">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(currentPage * itemsPerPage, total) }} of {{ total }} results
      </div>

      <div class="flex gap-2 items-center">
        <button
          @click="currentPage > 1 && $emit('update:currentPage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div class="flex gap-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="$emit('update:currentPage', page)"
            :class="[
              'px-3 py-1 rounded',
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage < totalPages && $emit('update:currentPage', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import JobList from '@/components/JobList/JobList.vue'
import type { JobPosting } from '@/types'
import type { Ref } from 'vue'

interface Props {
  title?: string
  sortDirection: string
  sortKey: string
  jobs: JobPosting[]
  isLoading?: boolean
  error?: string | null
  itemsPerPage?: number
  totalPages: number
  currentPage: number
  total: number
  filters: {
    searchTerm?: Ref<string>
    selectedLocation?: Ref<string>
    selectedJobType?: Ref<string>
    selectedExperience?: Ref<string>
    minSalary?: Ref<number | null>
    maxSalary?: Ref<number | null>
  }
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  error: null,
  itemsPerPage: 10,
  totalPages: 1,
  currentPage: 1,
  total: 0
})

const emit = defineEmits<{
  'update:sortDirection': [value: string]
  'update:sortKey': [value: string]
  'update:currentPage': [value: number]
}>()

const visiblePages = computed(() => {
  const delta = 2
  const range: number[] = []
  const rangeWithDots: number[] = []
  let l: number

  for (let i = 1; i <= props.totalPages; i++) {
    if (
      i === 1 ||
      i === props.totalPages ||
      (i >= props.currentPage - delta && i <= props.currentPage + delta)
    ) {
      range.push(i)
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push(-1)
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots.filter((page) => page !== -1)
})

// Reset to first page when filters change
watch(
  () => [
    props.filters.searchTerm?.value,
    props.filters.selectedLocation?.value,
    props.filters.selectedJobType?.value,
    props.filters.selectedExperience?.value,
    props.filters.minSalary?.value,
    props.filters.maxSalary?.value
  ],
  () => {
    emit('update:currentPage', 1)
  }
)
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
