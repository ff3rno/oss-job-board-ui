<script setup lang="ts">
import JobCardListHeader from './components/JobCardListHeader.vue'
import JobCard from './components/JobCard.vue'
import { JobType, ExperienceLevel } from '@/types/job'

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

const props = defineProps<{
    jobs: JobPosting[]
    sortDirection: string
    class?: string
}>()
</script>

<template>
    <main :class="['flex-1 py-5', props.class]">
        <JobCardListHeader
            :sort-direction="sortDirection"
            :job-count="jobs.length"
            @update:sort-direction="$emit('update:sortDirection', $event)"
        />

        <div class="flex flex-col gap-5 px-2 pb-8">
            <JobCard
                v-for="job in jobs"
                :key="job.id"
                :job="job"
            />
        </div>
    </main>
</template>
