<script setup lang="ts">
import type { JobPosting } from '@shared/types'
import JobItem from '@/components/JobItem/JobItem.vue'
import JobListHeader from '@/components/JobList/components/JobListHeader.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { type LayoutType } from '@/components/shared/LayoutToggleGroup.vue'

const props = defineProps<{
  jobs: JobPosting[]
  loading: boolean
}>()

const router = useRouter()
const viewAllJobs = () => router.push({ name: 'browse' })
const viewJobDetails = (jobId: string) => router.push({ name: 'job-details', params: { id: jobId } })

const layout = ref<LayoutType>('grid')
const sortKey = ref('datePosted')
const sortDirection = ref('desc')

const visibleJobs = computed(() => {
  const sorted = [...props.jobs].sort((a, b) => {
    const aValue = sortKey.value === 'salary' ? a.salary.min : a[sortKey.value]
    const bValue = sortKey.value === 'salary' ? b.salary.min : b[sortKey.value]
    return sortDirection.value === 'asc'
      ? aValue > bValue ? 1 : -1
      : aValue < bValue ? 1 : -1
  })
  return sorted.slice(0, 5)
})
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Jobs</h2>
        <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Discover our hand-picked featured opportunities
        </p>
      </div>
      <BaseButton variant="outline" @click="viewAllJobs">
        View All Jobs
      </BaseButton>
    </div>

    <div v-if="loading" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 3" :key="n" class="animate-pulse">
        <div class="h-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>

    <template v-else-if="jobs.length">
      <JobListHeader
        v-model:layout="layout"
        v-model:sort-key="sortKey"
        v-model:sort-direction="sortDirection"
        class="sticky top-[4.5rem] z-30 bg-gray-50 dark:bg-gray-900 px-4 py-4 shadow-sm mb-6"
      />

      <div
        :class="[
          layout === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : layout === 'list'
              ? 'flex flex-col gap-4'
              : 'flex flex-col divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm',
        ]"
      >
        <JobItem
          v-for="job in visibleJobs"
          :key="job.id"
          :job="job"
          :layout="layout"
          :class="layout === 'grid' ? 'h-full' : ''"
          :onClick="() => viewJobDetails(job.id)"
        />
      </div>
    </template>

    <div v-else class="mt-8 text-center">
      <p class="text-gray-600 dark:text-gray-400">No featured jobs available at the moment.</p>
    </div>
  </section>
</template>
