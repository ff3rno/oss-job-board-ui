<script setup lang="ts">
import { JobType, ExperienceLevel } from '@/types/job'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useRouter } from 'vue-router'

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
    job: JobPosting
    layout: 'grid' | 'list' | 'compact'
    class?: string
}>()

const router = useRouter()

// Generate a unique but consistent company logo placeholder based on company name
const getCompanyLogoUrl = (company: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random&size=64&bold=true&format=svg`
}

const navigateToJobDetails = () => {
    router.push({
        name: 'job-details',
        params: {
            job: encodeURIComponent(JSON.stringify(props.job))
        }
    })
}
</script>

<template>
    <!-- Grid Layout -->
    <div
        v-if="layout === 'grid'"
        :class="[
            'p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-[1.02] hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 ease-in-out cursor-pointer flex flex-col',
            props.class
        ]"
        @click="navigateToJobDetails"
    >
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
                @click.stop="navigateToJobDetails"
            >
                View Details
            </BaseButton>
        </div>
    </div>

    <!-- List Layout -->
    <div
        v-else-if="layout === 'list'"
        :class="[
            'p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 ease-in-out cursor-pointer',
            props.class
        ]"
        @click="navigateToJobDetails"
    >
        <div class="flex flex-col sm:flex-row gap-4">
            <img
                :src="getCompanyLogoUrl(job.company)"
                :alt="`${job.company} logo`"
                class="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
            />
            <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div>
                        <h2 class="m-0 mb-1 text-lg font-semibold text-gray-900 dark:text-white">{{ job.title }}</h2>
                        <h3 class="m-0 text-base font-medium text-indigo-600 dark:text-indigo-400">{{ job.company }}</h3>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 sm:text-right">
                        <BaseBadge icon="money" class="truncate">
                            {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} - {{ job.salary.max.toLocaleString() }}
                        </BaseBadge>
                    </div>
                </div>

                <p class="m-0 mb-4 text-gray-600 dark:text-gray-400 line-clamp-2">{{ job.description }}</p>

                <div class="flex flex-wrap items-center gap-3">
                    <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm">
                        <BaseIcon name="world" />
                        <span>{{ job.location }}</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <BaseBadge icon="briefcase">
                            {{ job.experienceLevel }}
                        </BaseBadge>
                        <BaseBadge variant="pill">{{ job.jobType }}</BaseBadge>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                        Posted on: {{ job.datePosted }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- Compact Layout -->
    <div
        v-else
        :class="[
            'px-4 py-3 border-b last:border-b-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-indigo-200 dark:hover:border-indigo-800 relative transition-all duration-200 ease-in-out cursor-pointer group',
            props.class
        ]"
        @click="navigateToJobDetails"
    >
        <div class="flex items-center gap-4">
            <img
                :src="getCompanyLogoUrl(job.company)"
                :alt="`${job.company} logo`"
                class="w-8 h-8 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors"
            />
            <div class="min-w-0 flex-1">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div class="min-w-0 flex-1">
                        <h2 class="m-0 text-base font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ job.title }}</h2>
                        <div class="flex items-center gap-2 text-sm">
                            <span class="text-indigo-600 dark:text-indigo-400 font-medium">{{ job.company }}</span>
                            <span class="text-gray-400">•</span>
                            <span class="text-gray-600 dark:text-gray-400">{{ job.location }}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 sm:text-right">
                        <BaseBadge variant="pill" class="text-xs">{{ job.jobType }}</BaseBadge>
                        <BaseBadge icon="money" class="truncate text-xs">
                            {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} - {{ job.salary.max.toLocaleString() }}
                        </BaseBadge>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
