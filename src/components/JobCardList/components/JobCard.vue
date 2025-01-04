<script setup lang="ts">
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

defineProps<{
    job: JobPosting
}>()

// Generate a unique but consistent company logo placeholder based on company name
const getCompanyLogoUrl = (company: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random&size=64&bold=true&format=svg`
}
</script>

<template>
    <div class="p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
        <!-- Header Section -->
        <div class="flex items-start gap-4 pb-4">
            <img
                :src="getCompanyLogoUrl(job.company)"
                :alt="`${job.company} logo`"
                class="w-16 h-16 rounded-lg flex-shrink-0 bg-gray-50 border border-gray-100"
            />
            <div class="flex-grow min-w-0">
                <div class="flex justify-between items-start gap-4">
                    <div>
                        <h2 class="m-0 mb-1.5 text-xl font-semibold text-gray-900 truncate">{{ job.title }}</h2>
                        <h3 class="m-0 mb-2 text-lg font-medium text-indigo-600">{{ job.company }}</h3>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg whitespace-nowrap">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">
                                {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} - {{ job.salary.max.toLocaleString() }}
                            </span>
                        </div>
                        <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">{{ job.experienceLevel }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 text-gray-600">
                    <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>{{ job.location }}</span>
                    </div>
                    <span class="text-gray-300">•</span>
                    <span class="px-2.5 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full font-medium">{{ job.jobType }}</span>
                </div>
            </div>
        </div>

        <!-- Main Content Section -->
        <div class="mb-4">
            <p class="m-0 text-gray-600 line-clamp-2">{{ job.description }}</p>
        </div>

        <!-- Footer Section -->
        <div class="flex items-center justify-between pt-4">
            <span class="text-sm text-gray-500">
                Posted on: {{ job.datePosted }}
            </span>
            <button class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200">
                View Details →
            </button>
        </div>
    </div>
</template>
