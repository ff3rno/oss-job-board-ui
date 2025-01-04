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
    <div class="p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
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
                        <BaseBadge icon="money">
                            {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} - {{ job.salary.max.toLocaleString() }}
                        </BaseBadge>
                        <BaseBadge icon="briefcase">
                            {{ job.experienceLevel }}
                        </BaseBadge>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 text-gray-600">
                    <div class="flex items-center gap-1.5">
                        <BaseIcon name="world" />
                        <span>{{ job.location }}</span>
                    </div>
                    <span class="text-gray-300">•</span>
                    <BaseBadge variant="pill">{{ job.jobType }}</BaseBadge>
                </div>
            </div>
        </div>

        <div class="mb-4">
            <p class="m-0 text-gray-600 line-clamp-2">{{ job.description }}</p>
        </div>

        <div class="flex items-center justify-between pt-4">
            <span class="text-sm text-gray-500">
                Posted on: {{ job.datePosted }}
            </span>
            <BaseButton
                size="sm"
                icon="arrow-right"
                icon-position="right"
            >
                View Details
            </BaseButton>
        </div>
    </div>
</template>
