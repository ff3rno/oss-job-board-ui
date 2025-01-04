<script setup lang="ts">
import { ref, computed } from 'vue'
import { faker } from '@faker-js/faker'
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar.vue'
import JobCardList from '@/components/JobCardList/JobCardList.vue'
import { ExperienceLevel, JobType } from '@/types/job'

const JOB_COUNT = 50

interface JobPosting {
    id: number
    title: string
    company: string
    location: string
    jobType: JobType
    description: string
    datePosted: string
    salary: {
        min: number
        max: number
        currency: string
    }
    experienceLevel: ExperienceLevel
    skills: string[]
    benefits: string[]
    companyLogo: string
}

const jobTypes = Object.values(JobType)
const experienceLevels = Object.values(ExperienceLevel)
const techSkills = [
    'TypeScript', 'JavaScript', 'Vue.js', 'React', 'Node.js', 'Python',
    'Java', 'Golang', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST',
    'PostgreSQL', 'MongoDB', 'Redis', 'CI/CD', 'Git'
]
const benefits = [
    'Health Insurance', '401(k)', 'Remote Work', 'Flexible Hours',
    'Unlimited PTO', 'Professional Development', 'Gym Membership',
    'Stock Options', 'Company Events', 'Parental Leave'
]

const generateJob = (id: number): JobPosting => {
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
            currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP'])
        },
        experienceLevel: faker.helpers.arrayElement(experienceLevels),
        skills: faker.helpers.arrayElements(techSkills, { min: 3, max: 8 }),
        benefits: faker.helpers.arrayElements(benefits, { min: 3, max: 6 }),
        companyLogo: faker.image.urlLoremFlickr({ category: 'business' })
    }
}

const jobs = ref<JobPosting[]>(
    Array.from({ length: JOB_COUNT }, (_, index) => generateJob(index + 1))
)

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
        const matchesSearch = searchTerm.value === '' ||
            job.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.value.toLowerCase())
        const matchesLocation = !selectedLocation.value ||
            job.location.toLowerCase().includes(selectedLocation.value.toLowerCase())
        const matchesJobType = !selectedJobType.value ||
            job.jobType === selectedJobType.value
        const matchesExperience = !selectedExperience.value ||
            job.experienceLevel === selectedExperience.value
        const meetsMinSalary = !minSalary.value ||
            job.salary.min >= minSalary.value
        const meetsMaxSalary = !maxSalary.value ||
            job.salary.max <= maxSalary.value

        return matchesSearch && matchesLocation && matchesJobType &&
            matchesExperience && meetsMinSalary && meetsMaxSalary
    })

    return result
})
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-8">
        <JobCardList
            class="flex-1"
            :jobs="filteredJobs"
            v-model:sortDirection="sortDirection"
            v-model:sortKey="sortKey"
        />
        <FilterSidebar
            class="w-full lg:w-80 lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-hidden"
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
