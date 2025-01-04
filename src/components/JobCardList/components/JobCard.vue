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
    class?: string
}>()

// Generate a unique but consistent company logo placeholder based on company name
const getCompanyLogoUrl = (company: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random&size=64&bold=true&format=svg`
}
</script>

<template>
    <div :class="[
        'p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-md hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 ease-in-out cursor-pointer flex flex-col',
        $props.class
    ]">
        <div class="flex flex-col gap-4 pb-4">
            <div class="flex items-start gap-4">
                <img
                    :src="getCompanyLogoUrl(job.company)"
                    :alt="`${job.company} logo`"
                    class="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
                />
                <div class="min-w-0 flex-1">
                    <h2 class="m-0 mb-1 text-lg font-semibold text-gray-900 dark:text-white truncate">{{ job.title }}</h2>
                    <h3 class="m-0 text-base font-medium text-indigo-600 dark:text-indigo-400 truncate">{{ job.company }}</h3>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row flex-wrap gap-3">
                <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm">
                    <BaseIcon name="world" />
                    <span class="truncate">{{ job.location }}</span>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <BaseBadge icon="briefcase">
                        {{ job.experienceLevel }}
                    </BaseBadge>
                    <BaseBadge variant="pill">{{ job.jobType }}</BaseBadge>
                </div>
                <BaseBadge icon="money" class="sm:ml-auto truncate">
                    {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} - {{ job.salary.max.toLocaleString() }}
                </BaseBadge>
            </div>
        </div>

        <div class="mb-4 flex-grow">
            <p class="m-0 text-gray-600 dark:text-gray-400 line-clamp-3">{{ job.description }}</p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
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
