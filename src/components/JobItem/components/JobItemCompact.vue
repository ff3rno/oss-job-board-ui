<script setup lang="ts">
import type { JobPosting } from '@/types'
import BaseJobCard from './BaseJobCard.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'

const props = defineProps<{
    job: JobPosting
    class?: string
    onClick?: () => void
}>()
</script>

<template>
    <BaseJobCard
        variant="compact"
        :class="props.class"
        :onClick="onClick"
    >
        <div class="flex items-center gap-4">
            <img
                :src="job.companyLogo"
                :alt="`${job.company} logo`"
                class="w-8 h-8 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors"
            />
            <div class="min-w-0 flex-1">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div class="min-w-0 flex-1">
                        <h2
                            class="m-0 text-base font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                        >
                            {{ job.title }}
                        </h2>
                        <div class="flex items-center gap-2 text-sm">
                            <span
                                class="text-indigo-600 dark:text-indigo-400 font-medium"
                            >
                                {{ job.company }}
                            </span>
                            <span class="text-gray-400">•</span>
                            <span class="text-gray-600 dark:text-gray-400">
                                {{ job.location }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="flex flex-wrap items-center gap-2 sm:text-right"
                    >
                        <BaseBadge
                            variant="pill"
                            class="text-xs"
                        >
                            {{ job.jobType }}
                        </BaseBadge>
                        <BaseBadge
                            icon="money"
                            class="truncate text-xs"
                        >
                            {{ job.salary.currency
                            }}{{ job.salary.min.toLocaleString() }} -
                            {{ job.salary.max.toLocaleString() }}
                        </BaseBadge>
                    </div>
                </div>
            </div>
        </div>
    </BaseJobCard>
</template>
