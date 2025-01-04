<script setup lang="ts">
import BaseIcon from '@/components/shared/BaseIcon.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import type { JobPosting } from '@/types'

defineProps<{
    job: JobPosting
}>()

const getCompanyLogoUrl = (company: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random&size=128&bold=true&format=svg`
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row gap-6 sm:items-start mb-8">
            <img
                :src="getCompanyLogoUrl(job.company)"
                :alt="`${job.company} logo`"
                class="w-24 h-24 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
            />
            <div class="flex-1 min-w-0">
                <h1
                    class="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                    {{ job.title }}
                </h1>
                <h2
                    class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4"
                >
                    {{ job.company }}
                </h2>
                <div class="flex flex-wrap gap-3">
                    <div
                        class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400"
                    >
                        <BaseIcon name="world" />
                        <span>{{ job.location }}</span>
                    </div>
                    <BaseBadge icon="briefcase">
                        {{ job.experienceLevel }}
                    </BaseBadge>
                    <BaseBadge variant="pill">{{ job.jobType }}</BaseBadge>
                    <BaseBadge icon="money">
                        {{ job.salary.currency
                        }}{{ job.salary.min.toLocaleString() }} -
                        {{ job.salary.max.toLocaleString() }}
                    </BaseBadge>
                </div>
            </div>
        </div>

        <div class="prose dark:prose-invert max-w-none mb-8">
            <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
                Job Description
            </h3>
            <p class="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {{ job.description }}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                >
                    Required Skills
                </h3>
                <div class="flex flex-wrap gap-2">
                    <BaseBadge
                        v-for="skill in job.skills"
                        :key="skill"
                        variant="pill"
                    >
                        {{ skill }}
                    </BaseBadge>
                </div>
            </div>

            <div>
                <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                >
                    Benefits
                </h3>
                <ul
                    class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"
                >
                    <li
                        v-for="benefit in job.benefits"
                        :key="benefit"
                    >
                        {{ benefit }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <span class="text-sm text-gray-500 dark:text-gray-400">
                    Posted on: {{ job.datePosted }}
                </span>
                <BaseButton size="lg">Apply Now</BaseButton>
            </div>
        </div>
    </div>
</template>
