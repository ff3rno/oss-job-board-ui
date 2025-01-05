<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { faker } from '@faker-js/faker'
import FilterSidebar from '@/components/FilterSidebar.vue'
import JobList from '@/components/JobList/JobList.vue'
import FeaturedJobsCarousel from '@/components/FeaturedJobsCarousel.vue'
import { ExperienceLevel, JobType, type JobPosting } from '@/types'
import { useRoute } from 'vue-router'

const JOB_COUNT = 30
const FEATURED_JOB_COUNT = 10

const jobTypes = Object.values(JobType)
const experienceLevels = Object.values(ExperienceLevel)
const techSkills = [
  'TypeScript',
  'JavaScript',
  'Vue.js',
  'React',
  'Node.js',
  'Python',
  'Java',
  'Golang',
  'AWS',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'REST',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'CI/CD',
  'Git',
]
const benefits = [
  'Health Insurance',
  '401(k)',
  'Remote Work',
  'Flexible Hours',
  'Unlimited PTO',
  'Professional Development',
  'Gym Membership',
  'Stock Options',
  'Company Events',
  'Parental Leave',
]

const generateJob = (id: number, isFeatured: boolean = false): JobPosting => {
  const minSalary = faker.number.int({ min: 50000, max: 150000 })
  return {
    id,
    title: faker.person.jobTitle(),
    company: faker.company.name(),
    location: faker.location.country(),
    jobType: faker.helpers.arrayElement(jobTypes),
    description: faker.lorem.paragraphs(2),
    datePosted: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    salary: {
      min: minSalary,
      max: minSalary + faker.number.int({ min: 10000, max: 50000 }),
      currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP']),
    },
    experienceLevel: faker.helpers.arrayElement(experienceLevels),
    skills: faker.helpers.arrayElements(techSkills, { min: 3, max: 8 }),
    benefits: faker.helpers.arrayElements(benefits, { min: 3, max: 6 }),
    companyLogo: faker.image.urlLoremFlickr({ category: 'business' }),
    relatedJobIds: [],
    ...(isFeatured
      ? {
          featuredAt:
            Date.now() -
            faker.number.int({
              min: 0,
              max: 7 * 24 * 60 * 60 * 1000,
            }),
        }
      : {}),
  }
}

const featuredJobs = Array.from({ length: FEATURED_JOB_COUNT }, (_, index) =>
  generateJob(index + 1, true),
)

const regularJobs = Array.from(
  { length: JOB_COUNT - FEATURED_JOB_COUNT },
  (_, index) => generateJob(index + FEATURED_JOB_COUNT + 1),
)

const jobs = ref<JobPosting[]>([...featuredJobs, ...regularJobs])

const searchTerm = ref('')
const selectedLocation = ref('')
const selectedJobType = ref('')
const selectedExperience = ref<ExperienceLevel | ''>('')
const minSalary = ref<number | null>(null)
const maxSalary = ref<number | null>(null)
const sortDirection = ref('asc')
const sortKey = ref('datePosted')

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

const addRelatedJobIds = () => {
  jobs.value = jobs.value.map((job) => {
    const otherJobs = jobs.value.filter((j) => j.id !== job.id)
    const relatedJobIds = faker.helpers.arrayElements(
      otherJobs.map((j) => j.id),
      { min: 3, max: 5 },
    )
    return { ...job, relatedJobIds }
  })
  localStorage.setItem('jobs', JSON.stringify(jobs.value))
}

onMounted(() => {
  addRelatedJobIds()
  if (route.params.newJob) {
    const newJob = JSON.parse(
      decodeURIComponent(route.params.newJob as string),
    ) as JobPosting
    jobs.value.unshift(newJob)
    localStorage.setItem('jobs', JSON.stringify(jobs.value))
  }
})
</script>

<template>
  <div class="flex flex-col gap-1 min-h-full py-6 lg:flex-row gap-8 flex-1">
    <JobList
      class="flex-1"
      :jobs="filteredJobs"
      v-model:sortDirection="sortDirection"
      v-model:sortKey="sortKey"
      :page-size="5"
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
  </div>
</template>
