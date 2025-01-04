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

// Generate a unique but consistent company logo placeholder based on company name
const getCompanyLogoUrl = (company: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random&size=64&bold=true&format=svg`
}
</script>

<template>
    <div class="mr-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
        <div class="flex items-start gap-4">
            <img
                :src="getCompanyLogoUrl(job.company)"
                :alt="`${job.company} logo`"
                class="w-16 h-16 rounded-lg flex-shrink-0 bg-gray-50"
            />
            <div class="flex-grow min-w-0">
                <h2 class="m-0 mb-2 text-xl font-semibold text-gray-900 truncate">{{ job.title }}</h2>
                <h3 class="m-0 mb-2 text-lg font-medium text-indigo-600">{{ job.company }}</h3>
                <div class="flex items-center gap-2 mb-3 text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{{ job.location }}</span>
                    <span class="text-gray-300">•</span>
                    <span class="px-2 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full">{{ job.jobType }}</span>
                </div>
                <p class="m-0 mb-3 text-gray-600 line-clamp-2">{{ job.description }}</p>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">
                        Posted on: {{ job.datePosted }}
                    </span>
                    <button class="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                        View Details →
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
