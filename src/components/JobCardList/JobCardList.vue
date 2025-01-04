<script setup lang="ts">
import JobCard from '../JobCard/JobCard.vue'

interface JobPosting {
    id: number
    title: string
    company: string
    location: string
    jobType: string
    description: string
    datePosted: string
}

defineProps<{
    jobs: JobPosting[]
    sortDirection: string
}>()
</script>

<template>
    <main class="flex-1 px-8 py-5">
        <div class="mb-6 flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-gray-800 border-b pb-2">
                Job Postings
            </h1>
            <div class="flex items-center gap-2">
                <label
                    for="sort"
                    class="text-gray-700"
                >
                    Sort by:
                </label>
                <select
                    id="sort"
                    :value="sortDirection"
                    @change="
                        $emit(
                            'update:sortDirection',
                            ($event.target as HTMLSelectElement).value,
                        )
                    "
                    class="p-2 border border-gray-300 rounded-md"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
        <div class="flex flex-col gap-5 max-h-[80vh] overflow-y-auto px-2">
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
