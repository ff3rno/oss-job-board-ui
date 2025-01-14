<template>
  <div v-if="isLoading && jobs.length === 0" class="flex-1 flex items-center justify-center">
    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>

  <div v-else-if="error" class="flex-1 flex items-center justify-center">
    <div class="text-red-500">{{ error }}</div>
  </div>

  <JobList
    v-else
    :jobs="filteredJobs"
    :title="title"
    :sort-direction="sortDirection"
    :sort-key="sortKey"
    :has-more="hasMore"
    :is-loading="isLoading"
    @update:sort-direction="$emit('update:sortDirection', $event)"
    @update:sort-key="$emit('update:sortKey', $event)"
    @load-more="store.loadMoreJobs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JobList from '@/components/JobList/JobList.vue'
import type { Ref } from 'vue'
import { useJobStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'

interface Props {
  title?: string
  sortDirection: string
  sortKey: string
  filters: {
    searchTerm: Ref<string>
    selectedLocation: Ref<string>
    selectedJobType: Ref<string>
    selectedExperience: Ref<string>
    minSalary: Ref<number | null>
    maxSalary: Ref<number | null>
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:sortDirection': [value: string]
  'update:sortKey': [value: string]
}>()

const store = useJobStore()
const { jobs, jobsLoading: isLoading, jobsError: error, hasMoreJobs: hasMore } = storeToRefs(store)

const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    const matchesSearch =
      props.filters.searchTerm.value === '' ||
      job.title.toLowerCase().includes(props.filters.searchTerm.value.toLowerCase()) ||
      job.company.toLowerCase().includes(props.filters.searchTerm.value.toLowerCase())
    const matchesLocation =
      !props.filters.selectedLocation.value ||
      job.location.toLowerCase().includes(props.filters.selectedLocation.value.toLowerCase())
    const matchesJobType =
      !props.filters.selectedJobType.value || job.jobType === props.filters.selectedJobType.value
    const matchesExperience =
      !props.filters.selectedExperience.value ||
      job.experienceLevel === props.filters.selectedExperience.value
    const meetsMinSalary = !props.filters.minSalary.value || job.salary.min >= props.filters.minSalary.value
    const meetsMaxSalary = !props.filters.maxSalary.value || job.salary.max <= props.filters.maxSalary.value

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesExperience &&
      meetsMinSalary &&
      meetsMaxSalary
    )
  })
})
</script>

<style scoped>
.job-list-infinite {
  height: 100%;
  overflow-y: auto;
}
</style>
