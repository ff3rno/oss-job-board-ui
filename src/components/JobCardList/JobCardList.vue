<script setup lang="ts">
import JobCardListHeader from './components/JobCardListHeader.vue'
import JobCard from './components/JobCard.vue'
import { JobType, ExperienceLevel } from '@/types/job'
import { computed } from 'vue'

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
    sortKey: string
    class?: string
}>()

const sortedJobs = computed(() => {
    return [...props.jobs].sort((a, b) => {
        let compareResult = 0;

        switch (props.sortKey) {
            case 'title':
                compareResult = a.title.localeCompare(b.title);
                break;
            case 'location':
                compareResult = a.location.localeCompare(b.location);
                break;
            case 'salary':
                compareResult = (a.salary.min + a.salary.max) - (b.salary.min + b.salary.max);
                break;
            case 'experienceLevel':
                compareResult = a.experienceLevel.localeCompare(b.experienceLevel);
                break;
            case 'datePosted':
                compareResult = new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
                break;
            default:
                compareResult = 0;
        }

        return props.sortDirection === 'asc' ? compareResult : -compareResult;
    });
});

defineEmits<{
    'update:sortDirection': [value: string]
    'update:sortKey': [value: string]
}>()
</script>

<template>
    <main :class="['flex-1 py-5', props.class]">
        <JobCardListHeader
            :sort-direction="sortDirection"
            :sort-key="sortKey"
            :job-count="jobs.length"
            @update:sort-direction="$emit('update:sortDirection', $event)"
            @update:sort-key="$emit('update:sortKey', $event)"
        />

        <div class="flex flex-col gap-8 px-2 pb-8">
            <JobCard
                v-for="job in sortedJobs"
                :key="job.id"
                :job="job"
            />
        </div>
    </main>
</template>
