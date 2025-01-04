<script setup lang="ts">
import JobListHeader from './components/JobListHeader.vue'
import JobItem from './components/JobItem.vue'
import { JobType, ExperienceLevel } from '@/types/job'
import { computed, ref } from 'vue'
import { type LayoutType } from '@/components/shared/LayoutToggleGroup.vue'

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

const layout = ref<LayoutType>('list')

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
    <main :class="['flex-1', props.class]">
        <JobListHeader
            :sort-direction="sortDirection"
            :sort-key="sortKey"
            :job-count="jobs.length"
            :layout="layout"
            @update:sort-direction="$emit('update:sortDirection', $event)"
            @update:sort-key="$emit('update:sortKey', $event)"
            @update:layout="layout = $event"
        />

        <div :class="[
            layout === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : layout === 'list'
                    ? 'flex flex-col gap-4'
                    : 'flex flex-col divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm',
            'px-2 mb-8 max-w-4xl mx-auto lg:mx-0'
        ]">
            <JobItem
                v-for="job in sortedJobs"
                :key="job.id"
                :job="job"
                :layout="layout"
                :class="layout === 'grid' ? 'h-full' : ''"
            />
        </div>
    </main>
</template>
