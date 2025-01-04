<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { faker } from '@faker-js/faker'
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar.vue'
import JobList from '@/components/JobList/JobList.vue'
import FeaturedJobsCarousel from '@/components/FeaturedJobs/FeaturedJobsCarousel.vue'
import { ExperienceLevel, JobType, type JobPosting } from '@/types'
import { useRoute } from 'vue-router'

const JOB_COUNT = 50
const FEATURED_JOB_COUNT = 5 // Number of featured jobs to generate

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

// Generate featured jobs first
const featuredJobs = Array.from({ length: FEATURED_JOB_COUNT }, (_, index) =>
    generateJob(index + 1, true),
)

// Generate regular jobs
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
            job.location
                .toLowerCase()
                .includes(selectedLocation.value.toLowerCase())
        const matchesJobType =
            !selectedJobType.value || job.jobType === selectedJobType.value
        const matchesExperience =
            !selectedExperience.value ||
            job.experienceLevel === selectedExperience.value
        const meetsMinSalary =
            !minSalary.value || job.salary.min >= minSalary.value
        const meetsMaxSalary =
            !maxSalary.value || job.salary.max <= maxSalary.value

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

onMounted(() => {
    // Check for new job in route params
    if (route.params.newJob) {
        const newJob = JSON.parse(
            decodeURIComponent(route.params.newJob as string),
        ) as JobPosting
        jobs.value.unshift(newJob) // Add new job to the beginning of the list
    }
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <FeaturedJobsCarousel
            v-if="featuredJobsList.length > 0"
            :jobs="featuredJobsList"
            class="mt-6"
        />

        <div class="flex flex-col lg:flex-row gap-8 mt-2 mr-3">
            <JobList
                class="flex-1"
                :jobs="filteredJobs"
                v-model:sortDirection="sortDirection"
                v-model:sortKey="sortKey"
            />

            <FilterSidebar
                class="w-full lg:w-80 lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
                v-model:searchTerm="searchTerm"
                v-model:selectedLocation="selectedLocation"
                v-model:selectedJobType="selectedJobType as JobType"
                v-model:selectedExperience="selectedExperience"
                v-model:minSalary="minSalary"
                v-model:maxSalary="maxSalary"
                :jobs="jobs"
            />
        </div>
    </div>
</template>
