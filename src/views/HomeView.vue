<script setup lang="ts">
import { ref, computed } from 'vue'
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar.vue'
import JobCardList from '@/components/JobCardList/JobCardList.vue'

interface JobPosting {
    id: number
    title: string
    company: string
    location: string
    jobType: string
    description: string
    datePosted: string
}

const jobs = ref<JobPosting[]>([
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'New York, NY',
        jobType: 'Full Time',
        description: 'Develop and maintain user interfaces using Vue.js.',
        datePosted: '2023-10-01',
    },
    {
        id: 2,
        title: 'Backend Engineer',
        company: 'Innovate LLC',
        location: 'San Francisco, CA',
        jobType: 'Full Time',
        description: 'Build and optimize server-side applications.',
        datePosted: '2023-09-28',
    },
    {
        id: 3,
        title: 'Full Stack Developer',
        company: 'Web Solutions',
        location: 'Austin, TX',
        jobType: 'Full Time',
        description:
            'Handle both frontend and backend tasks for various projects.',
        datePosted: '2023-09-25',
    },
    {
        id: 4,
        title: 'UI/UX Designer',
        company: 'Creative Minds',
        location: 'Remote',
        jobType: 'Full Time',
        description:
            'Design user-friendly interfaces and enhance user experience.',
        datePosted: '2023-09-20',
    },
    {
        id: 5,
        title: 'DevOps Engineer',
        company: 'CloudWorks',
        location: 'Seattle, WA',
        jobType: 'Full Time',
        description: 'Manage infrastructure and automate deployment pipelines.',
        datePosted: '2023-09-18',
    },
])

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
    <div class="flex">
        <JobCardList
            class="pl-8"
            :jobs="filteredJobs"
            v-model:sortDirection="sortDirection"
        />
        <FilterSidebar
            class="pr-8 w-80"
            v-model:searchTerm="searchTerm"
            v-model:selectedLocation="selectedLocation"
            v-model:selectedJobType="selectedJobType"
            v-model:selectedExperience="selectedExperience"
            v-model:minSalary="minSalary"
            v-model:maxSalary="maxSalary"
        />
    </div>
</template>
