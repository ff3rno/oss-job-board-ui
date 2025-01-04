<script setup lang="ts">
import { JobType, ExperienceLevel } from '@/types/job'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

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
    <div class="p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-md hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 ease-in-out cursor-pointer">
        <div class="flex flex-col sm:flex-row items-start gap-4 pb-4">
            <img
                :src="getCompanyLogoUrl(job.company)"
                :alt="`${job.company} logo`"
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
            />
            <div class="flex-grow min-w-0">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h2 class="m-0 mb-1.5 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">{{ job.title }}</h2>
                        <h3 class="m-0 mb-2 text-base sm:text-lg font-medium text-indigo-600 dark:text-indigo-400">{{ job.company }}</h3>
                    </div>
                    <div class="flex flex-col gap-2 w-full sm:w-auto">
                        <BaseBadge icon="money">
                            {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} - {{ job.salary.max.toLocaleString() }}
                        </BaseBadge>
                        <BaseBadge icon="briefcase">
                            {{ job.experienceLevel }}
                        </BaseBadge>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400 mt-2 sm:mt-0">
                    <div class="flex items-center gap-1.5">
                        <BaseIcon name="world" />
                        <span>{{ job.location }}</span>
                    </div>
                    <span class="text-gray-300 dark:text-gray-600">•</span>
                    <BaseBadge variant="pill">{{ job.jobType }}</BaseBadge>
                </div>
            </div>
        </div>

        <div class="mb-4">
            <p class="m-0 text-gray-600 dark:text-gray-400 line-clamp-2">{{ job.description }}</p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <span class="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
                Posted on: {{ job.datePosted }}
            </span>
            <BaseButton
                size="sm"
                icon="arrow-right"
                icon-position="right"
                class="w-full sm:w-auto order-1 sm:order-2"
            >
                View Details
            </BaseButton>
        </div>
    </div>
</template>
