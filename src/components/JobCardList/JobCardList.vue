<script setup lang="ts">
import JobCardListHeader from './components/JobCardListHeader.vue'
import JobCard from './components/JobCard.vue'

interface JobPosting {
    id: number
    title: string
    company: string
    location: string
    jobType: string
    description: string
    datePosted: string
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
            @update:sort-direction="$emit('update:sortDirection', $event)"
        />

        <div class="flex flex-col gap-5 px-2 pb-8">
            <JobCard
                v-for="job in jobs"
                :key="job.id"
                :job="job"
            />
        </div>
        <div class="mt-4 text-sm text-gray-600">
            Showing {{ jobs.length }} jobs
        </div>
    </main>
</template>
