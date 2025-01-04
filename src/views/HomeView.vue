<script setup lang="ts">
import { ref, computed } from 'vue'
import { faker } from '@faker-js/faker'
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar.vue'
import JobCardList from '@/components/JobCardList/JobCardList.vue'

const JOB_COUNT = 50

interface JobPosting {
    id: number
    title: string
    company: string
    location: string
    jobType: string
    description: string
    datePosted: string
    salary: {
        min: number
        max: number
        currency: string
    }
    experienceLevel: string
    skills: string[]
    benefits: string[]
    companyLogo: string
}

const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship']
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Principal']
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
        location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
        jobType: faker.helpers.arrayElement(jobTypes),
        description: faker.lorem.paragraphs(2),
        datePosted: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
        salary: {
            min: minSalary,
            max: minSalary + faker.number.int({ min: 10000, max: 50000 }),
            currency: 'USD'
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
const selectedExperience = ref('')
const minSalary = ref<number | null>(null)
const maxSalary = ref<number | null>(null)
const sortDirection = ref('asc')

const filteredJobs = computed(() => {
    let result = jobs.value.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.value.toLowerCase())
        const matchesLocation =
            selectedLocation.value === '' ||
            job.location === selectedLocation.value
        const matchesJobType =
            selectedJobType.value === '' ||
            job.jobType === selectedJobType.value
        return matchesSearch && matchesLocation && matchesJobType
    })

    result = result.sort((a, b) => {
        if (sortDirection.value === 'asc') {
            return a.datePosted.localeCompare(b.datePosted)
        } else {
            return b.datePosted.localeCompare(a.datePosted)
        }
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
        />
        <FilterSidebar
            class="w-full lg:w-80 lg:border-l lg:border-gray-200"
            v-model:searchTerm="searchTerm"
            v-model:selectedLocation="selectedLocation"
            v-model:selectedJobType="selectedJobType"
            v-model:selectedExperience="selectedExperience"
            v-model:minSalary="minSalary"
            v-model:maxSalary="maxSalary"
        />
    </div>
</template>
