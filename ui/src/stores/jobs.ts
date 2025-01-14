import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { JobPosting, PaginatedResponse } from '@/types'
import type { VueJobFilters } from '@/types'
import { apiService } from '@/services/api'

export const useJobStore = defineStore('jobs', () => {
  const jobs = ref<JobPosting[]>([])
  const wwrJobs = ref<JobPosting[]>([])
  const cryptoJobs = ref<JobPosting[]>([])
  const featuredJobs = ref<JobPosting[]>([])
  const jobsLoading = ref(false)
  const wwrLoading = ref(false)
  const cryptoLoading = ref(false)
  const featuredJobsLoading = ref(false)
  const jobsError = ref<string | null>(null)
  const wwrError = ref<string | null>(null)
  const cryptoError = ref<string | null>(null)
  const featuredJobsError = ref<string | null>(null)
  const currentJobsPage = ref(1)
  const currentWWRPage = ref(1)
  const currentCryptoPage = ref(1)
  const currentFeaturedPage = ref(1)
  const hasMoreJobs = ref(false)
  const hasMoreWWR = ref(false)
  const hasMoreCrypto = ref(false)
  const hasMoreFeatured = ref(false)
  const totalJobs = ref(0)
  const totalWWRJobs = ref(0)
  const totalCryptoJobs = ref(0)
  const totalFeaturedJobs = ref(0)
  const totalJobPages = ref(0)
  const totalWWRPages = ref(0)
  const totalCryptoPages = ref(0)
  const totalFeaturedPages = ref(0)

  const filterJobs = (jobList: JobPosting[], filters: VueJobFilters) => {
    return jobList.filter(job => {
      const matchesSearch = !filters.searchTerm.value ||
        job.title.toLowerCase().includes(filters.searchTerm.value.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.searchTerm.value.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.searchTerm.value.toLowerCase())

      const matchesLocation = !filters.location.value ||
        job.location.toLowerCase().includes(filters.location.value.toLowerCase())

      const matchesJobType = !filters.jobType.value ||
        job.jobType === filters.jobType.value

      const matchesExperience = !filters.experienceLevel.value ||
        job.experienceLevel === filters.experienceLevel.value

      const meetsMinSalary = !filters.minSalary.value ||
        job.salary.min >= filters.minSalary.value

      const meetsMaxSalary = !filters.maxSalary.value ||
        job.salary.max <= filters.maxSalary.value

      return matchesSearch && matchesLocation && matchesJobType &&
        matchesExperience && meetsMinSalary && meetsMaxSalary
    })
  }

  const sortJobs = (jobList: JobPosting[], sortKey: string, sortDirection: string) => {
    return [...jobList].sort((a, b) => {
      const aValue = sortKey === 'salary' ? a.salary.min : a[sortKey as keyof JobPosting]
      const bValue = sortKey === 'salary' ? b.salary.min : b[sortKey as keyof JobPosting]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime()
      }

      return 0
    })
  }

  const getFilteredAndSortedJobs = (
    jobList: JobPosting[],
    filters: VueJobFilters,
    page: number,
    limit: number = 10,
    total: number,
    totalPages: number,
    hasMore: boolean
  ) => {
    const filtered = filterJobs(jobList, filters)
    const sorted = sortJobs(filtered, filters.sortKey.value, filters.sortDirection.value)

    const start = (page - 1) * limit
    const end = start + limit
    const paginatedJobs = sorted.slice(start, end)

    return {
      jobs: paginatedJobs,
      total,
      totalPages,
      hasMore
    }
  }

  const fetchJobs = async (page: number) => {
    jobsLoading.value = true
    jobsError.value = null

    try {
      const response = await apiService.getJobs(page, 10)
      if (page === 1) {
        jobs.value = response.jobs
      } else {
        const existingIds = new Set(jobs.value.map((job: JobPosting) => job.id))
        const newJobs = response.jobs.filter((job: JobPosting) => !existingIds.has(job.id))
        jobs.value = [...jobs.value, ...newJobs]
      }
      totalJobs.value = response.total
      totalJobPages.value = response.totalPages
      hasMoreJobs.value = response.hasMore
      currentJobsPage.value = page
    } catch (error) {
      jobsError.value = 'Failed to fetch jobs'
      console.error('Error fetching jobs:', error)
    } finally {
      jobsLoading.value = false
    }
  }

  const fetchWWRJobs = async (page: number) => {
    wwrLoading.value = true
    wwrError.value = null

    try {
      const response = await apiService.getWWRJobs(page, 10)
      if (page === 1) {
        wwrJobs.value = response.jobs
      } else {
        const existingIds = new Set(wwrJobs.value.map((job: JobPosting) => job.id))
        const newJobs = response.jobs.filter((job: JobPosting) => !existingIds.has(job.id))
        wwrJobs.value = [...wwrJobs.value, ...newJobs]
      }
      totalWWRJobs.value = response.total
      totalWWRPages.value = response.totalPages
      hasMoreWWR.value = response.hasMore
      currentWWRPage.value = page
    } catch (error) {
      wwrError.value = 'Failed to fetch WeWorkRemotely jobs'
      console.error('Error fetching WWR jobs:', error)
    } finally {
      wwrLoading.value = false
    }
  }

  const fetchCryptoJobs = async (page: number) => {
    cryptoLoading.value = true
    cryptoError.value = null

    try {
      const response = await apiService.getCryptoJobs(page, 10)
      if (page === 1) {
        cryptoJobs.value = response.jobs
      } else {
        const existingIds = new Set(cryptoJobs.value.map((job: JobPosting) => job.id))
        const newJobs = response.jobs.filter((job: JobPosting) => !existingIds.has(job.id))
        cryptoJobs.value = [...cryptoJobs.value, ...newJobs]
      }
      totalCryptoJobs.value = response.total
      totalCryptoPages.value = response.totalPages
      hasMoreCrypto.value = response.hasMore
      currentCryptoPage.value = page
    } catch (error) {
      cryptoError.value = 'Failed to fetch Crypto.jobs jobs'
      console.error('Error fetching Crypto jobs:', error)
    } finally {
      cryptoLoading.value = false
    }
  }

  const fetchFeaturedJobs = async (page: number) => {
    featuredJobsLoading.value = true
    featuredJobsError.value = null

    try {
      const response = await apiService.getFeaturedJobs(page)
      if (page === 1) {
        featuredJobs.value = response.jobs
      } else {
        const existingIds = new Set(featuredJobs.value.map((job: JobPosting) => job.id))
        const newJobs = response.jobs.filter((job: JobPosting) => !existingIds.has(job.id))
        featuredJobs.value = [...featuredJobs.value, ...newJobs]
      }
      totalFeaturedJobs.value = response.total
      totalFeaturedPages.value = response.totalPages
      hasMoreFeatured.value = response.hasMore
      currentFeaturedPage.value = page
    } catch (error) {
      featuredJobsError.value = 'Failed to fetch featured jobs'
      console.error('Error fetching featured jobs:', error)
    } finally {
      featuredJobsLoading.value = false
    }
  }

  return {
    jobs,
    wwrJobs,
    cryptoJobs,
    featuredJobs,
    jobsLoading,
    wwrLoading,
    cryptoLoading,
    featuredJobsLoading,
    jobsError,
    wwrError,
    cryptoError,
    featuredJobsError,
    currentJobsPage,
    currentWWRPage,
    currentCryptoPage,
    currentFeaturedPage,
    hasMoreJobs,
    hasMoreWWR,
    hasMoreCrypto,
    hasMoreFeatured,
    totalJobs,
    totalWWRJobs,
    totalCryptoJobs,
    totalFeaturedJobs,
    totalJobPages,
    totalWWRPages,
    totalCryptoPages,
    totalFeaturedPages,
    fetchJobs,
    fetchWWRJobs,
    fetchCryptoJobs,
    fetchFeaturedJobs,
    getFilteredAndSortedJobs
  }
})
