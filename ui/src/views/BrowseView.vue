<script setup lang="ts">
import { onMounted, ref, watch, computed, type Ref } from 'vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import JobListPaginated from '@/components/JobList/components/JobListPaginated.vue'
import { ExperienceLevel } from '@/types'
import { useJobStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'

const searchTerm = ref('')
const location = ref('')
const jobType = ref('')
const experienceLevel = ref<ExperienceLevel | ''>('')
const minSalary = ref<number | null>(null)
const maxSalary = ref<number | null>(null)
const sortDirection = ref('asc')
const sortKey = ref('datePosted')
const currentJobsPage = ref(1)
const currentWWRPage = ref(1)
const currentCryptoPage = ref(1)
const lastFetchedJobsPage = ref(1)
const lastFetchedWWRPage = ref(1)
const lastFetchedCryptoPage = ref(1)

const store = useJobStore()
const {
  jobs,
  jobsLoading,
  jobsError,
  wwrJobs,
  wwrLoading,
  wwrError,
  cryptoJobs,
  cryptoLoading,
  cryptoError,
  totalJobs,
  totalWWRJobs,
  totalCryptoJobs,
  totalJobPages,
  totalWWRPages,
  totalCryptoPages
} = storeToRefs(store)

const filters = {
  searchTerm,
  location,
  jobType,
  experienceLevel,
  minSalary,
  maxSalary,
  sortDirection,
  sortKey
}

onMounted(() => {
  Promise.all([
    store.fetchJobs(1),
    store.fetchWWRJobs(1),
    store.fetchCryptoJobs(1)
  ]).catch(console.error)
})

// TODO: Move into store
const fetchedJobPages = ref<number[]>([1])
const fetchedWWRPages = ref<number[]>([1])
const fetchedCryptoPages = ref<number[]>([1])

const fetchMissingPages = async (
  startPage: number,
  endPage: number,
  fetchFn: (page: number) => Promise<void>,
  fetchedPages: Ref<number[]>
) => {
  const missingPages = Array.from(
    { length: endPage - startPage - 1 },
    (_, i) => startPage + i + 1
  ).filter(page => !fetchedPages.value.includes(page))

  await Promise.all(missingPages.map(page => fetchFn(page)))
  fetchedPages.value.push(...missingPages)
}

const handleJobsPageChange = async (page: number) => {
  if (fetchedJobPages.value.includes(page)) {
    return
  }

  if (page > lastFetchedJobsPage.value + 1) {
    await fetchMissingPages(
      lastFetchedJobsPage.value,
      page,
      store.fetchJobs,
      fetchedJobPages
    )
  }
  await store.fetchJobs(page)
  fetchedJobPages.value.push(page)
  lastFetchedJobsPage.value = page
}

const handleWWRPageChange = async (page: number) => {
  if (fetchedWWRPages.value.includes(page)) {
    return
  }

  if (page > lastFetchedWWRPage.value + 1) {
    await fetchMissingPages(
      lastFetchedWWRPage.value,
      page,
      store.fetchWWRJobs,
      fetchedWWRPages
    )
  }
  await store.fetchWWRJobs(page)
  fetchedWWRPages.value.push(page)
  lastFetchedWWRPage.value = page
}

const handleCryptoPageChange = async (page: number) => {
  if (fetchedCryptoPages.value.includes(page)) {
    return
  }

  if (page > lastFetchedCryptoPage.value + 1) {
    await fetchMissingPages(
      lastFetchedCryptoPage.value,
      page,
      store.fetchCryptoJobs,
      fetchedCryptoPages
    )
  }
  await store.fetchCryptoJobs(page)
  fetchedCryptoPages.value.push(page)
  lastFetchedCryptoPage.value = page
}

// Refetch when filters change
watch(
  () => [
    searchTerm.value,
    location.value,
    jobType.value,
    experienceLevel.value,
    minSalary.value,
    maxSalary.value,
    sortDirection.value,
    sortKey.value
  ],
  () => {
    handleJobsPageChange(1)
    handleWWRPageChange(1)
    handleCryptoPageChange(1)
  }
)

const filteredJobs = computed(() =>
  store.getFilteredAndSortedJobs(
    jobs.value,
    filters,
    currentJobsPage.value,
    10,
    totalJobs.value,
    totalJobPages.value,
    currentJobsPage.value < totalJobPages.value
  ).jobs
)

const filteredWWRJobs = computed(() =>
  store.getFilteredAndSortedJobs(
    wwrJobs.value,
    filters,
    currentWWRPage.value,
    10,
    totalWWRJobs.value,
    totalWWRPages.value,
    currentWWRPage.value < totalWWRPages.value
  ).jobs
)

const filteredCryptoJobs = computed(() =>
  store.getFilteredAndSortedJobs(
    cryptoJobs.value,
    filters,
    currentCryptoPage.value,
    10,
    totalCryptoJobs.value,
    totalCryptoPages.value,
    currentCryptoPage.value < totalCryptoPages.value
  ).jobs
)
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8 min-h-full py-6">
    <FilterSidebar
      class="w-full lg:w-[30rem] order-2 lg:order-1"
      v-model:searchTerm="searchTerm"
      v-model:location="location"
      v-model:jobType="jobType"
      v-model:experienceLevel="experienceLevel"
      v-model:minSalary="minSalary"
      v-model:maxSalary="maxSalary"
      :jobs="jobs"
    />

    <div class="flex-1 flex flex-col gap-8 order-1 lg:order-2 max-w-4xl">
      <JobListPaginated
        class="flex-1"
        title="Our Listings"
        v-model:sortDirection="sortDirection"
        v-model:sortKey="sortKey"
        v-model:currentPage="currentJobsPage"
        :filters="filters"
        :jobs="filteredJobs"
        :is-loading="jobsLoading"
        :error="jobsError"
        :items-per-page="10"
        :total="totalJobs"
        :total-pages="totalJobPages"
        @update:currentPage="handleJobsPageChange"
      />

      <JobListPaginated
        class="flex-1"
        title="WeWorkRemotely Jobs"
        v-model:sortDirection="sortDirection"
        v-model:sortKey="sortKey"
        v-model:currentPage="currentWWRPage"
        :filters="filters"
        :jobs="filteredWWRJobs"
        :is-loading="wwrLoading"
        :error="wwrError"
        :items-per-page="10"
        :total="totalWWRJobs"
        :total-pages="totalWWRPages"
        @update:currentPage="handleWWRPageChange"
      />

      <JobListPaginated
        class="flex-1"
        title="Crypto.jobs Jobs"
        v-model:sortDirection="sortDirection"
        v-model:sortKey="sortKey"
        v-model:currentPage="currentCryptoPage"
        :filters="filters"
        :jobs="filteredCryptoJobs"
        :is-loading="cryptoLoading"
        :error="cryptoError"
        :items-per-page="10"
        :total="totalCryptoJobs"
        :total-pages="totalCryptoPages"
        @update:currentPage="handleCryptoPageChange"
      />
    </div>
  </div>
</template>
