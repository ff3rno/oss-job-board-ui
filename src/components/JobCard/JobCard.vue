<script setup lang="ts">
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
    job: JobPosting
}>()
</script>

<template>
    <div class="p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
        <h2 class="m-0 mb-2.5 text-gray-800">{{ job.title }}</h2>
        <h3 class="m-0 mb-1.5 text-gray-600">{{ job.company }}</h3>
        <p class="m-0 mb-2.5 text-gray-500">
            <strong>Location:</strong>
            {{ job.location }}
        </p>
        <p class="m-0 mb-2.5 text-gray-600">{{ job.description }}</p>
        <p class="m-0 text-gray-400 text-sm">
            Posted on: {{ job.datePosted }}
        </p>
    </div>
</template>
