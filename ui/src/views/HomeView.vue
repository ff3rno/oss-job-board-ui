<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import JobList from '@/components/JobList/JobList.vue'
import { ExperienceLevel, JobType, type JobPosting } from '@/types'
import { useRoute } from 'vue-router'

const jobs = ref<JobPosting[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const hasMore = ref(true)

const searchTerm = ref('')
const selectedLocation = ref('')
const selectedJobType = ref('')
const selectedExperience = ref<ExperienceLevel | ''>('')
const minSalary = ref<number | null>(null)
const maxSalary = ref<number | null>(null)
const sortDirection = ref('asc')
const sortKey = ref('datePosted')

const fetchJobs = async (page: number = 1) => {
  try {
    isLoading.value = true
    error.value = null
    const response = await fetch(`http://localhost:3333/jobs?page=${page}&limit=10`)
    if (!response.ok) {
      throw new Error('Failed to fetch jobs')
    }
    const data = await response.json()
    if (page === 1) {
      jobs.value = data.jobs
    } else {
      jobs.value = [...jobs.value, ...data.jobs]
    }
    hasMore.value = data.hasMore
    currentPage.value = page
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch jobs'
    console.error('Error fetching jobs:', err)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  if (!hasMore.value || isLoading.value) return
  await fetchJobs(currentPage.value + 1)
}

const filteredJobs = computed(() => {
  const result = jobs.value.filter((job) => {
    const matchesSearch =
      searchTerm.value === '' ||
      job.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesLocation =
      !selectedLocation.value ||
      job.location.toLowerCase().includes(selectedLocation.value.toLowerCase())
    const matchesJobType =
      !selectedJobType.value || job.jobType === selectedJobType.value
    const matchesExperience =
      !selectedExperience.value ||
      job.experienceLevel === selectedExperience.value
    const meetsMinSalary = !minSalary.value || job.salary.min >= minSalary.value
    const meetsMaxSalary = !maxSalary.value || job.salary.max <= maxSalary.value

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesExperience &&
      meetsMinSalary &&
      meetsMaxSalary
    )
  })

  return result
})

const featuredJobsList = computed(() =>
  jobs.value
    .filter((job) => job.featuredAt)
    .sort((a, b) => (b.featuredAt || 0) - (a.featuredAt || 0)),
)

const route = useRoute()

onMounted(async () => {
  await fetchJobs()
  if (route.params.newJob) {
    const newJob = JSON.parse(
      decodeURIComponent(route.params.newJob as string),
    ) as JobPosting
    jobs.value.unshift(newJob)
  }
})
</script>

<template>
  <div class="flex flex-col gap-1 min-h-full py-6 lg:flex-row gap-8 flex-1">
    <div v-if="isLoading && jobs.length === 0" class="flex-1 flex items-center justify-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-red-500">{{ error }}</div>
    </div>
    <template v-else>
      <JobList
        class="flex-1"
        :jobs="filteredJobs"
        v-model:sortDirection="sortDirection"
        v-model:sortKey="sortKey"
        :has-more="hasMore"
        :is-loading="isLoading"
        @load-more="loadMore"
      />

      <FilterSidebar
        class="w-full lg:w-80"
        v-model:searchTerm="searchTerm"
        v-model:selectedLocation="selectedLocation"
        v-model:selectedJobType="selectedJobType as JobType"
        v-model:selectedExperience="selectedExperience"
        v-model:minSalary="minSalary"
        v-model:maxSalary="maxSalary"
        :jobs="jobs"
      />
    </template>
  </div>
</template>
