<script setup lang="ts">
import type { JobPosting } from '@/types'
import BaseJobCard from '@/components/JobItem/components/BaseJobCard.vue'
import BaseIcon from '@/components/shared/BaseIcon/BaseIcon.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'

const props = defineProps<{
  job: JobPosting
  class?: string
  onClick?: () => void
  isHighlighted?: boolean
}>()
</script>

<template>
  <BaseJobCard
    :class="
      [
        props.class,
        'p-4 sm:p-6 relative',
        isHighlighted
          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
          : 'hover:border-indigo-200 dark:hover:border-indigo-800',
      ]
        .filter(Boolean)
        .join(' ')
    "
    :onClick="onClick"
  >
    <div class="flex flex-col sm:flex-row gap-4">
      <img
        :src="job.companyLogo"
        :alt="`${job.company} logo`"
        class="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
      />
      <div class="flex-1 min-w-0">
        <div
          class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3 pr-[4.5rem]"
        >
          <div>
            <h2
              class="m-0 mb-1 text-lg font-semibold text-gray-900 dark:text-white"
            >
              {{ job.title }}
            </h2>
            <h3
              class="m-0 text-base font-medium text-indigo-600 dark:text-indigo-400"
            >
              {{ job.company }}
            </h3>
          </div>
          <div class="flex flex-wrap items-center gap-2 sm:text-right">
            <BaseBadge
              icon="money"
              class="truncate"
            >
              {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} -
              {{ job.salary.max.toLocaleString() }}
            </BaseBadge>
          </div>
        </div>
        <div
          v-if="isHighlighted"
          class="absolute right-4 sm:right-6 top-4 sm:top-6"
        >
          <BaseBadge
            class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 border-amber-200 dark:border-amber-700"
          >
            New
          </BaseBadge>
        </div>
        <p class="m-0 mb-4 text-gray-600 dark:text-gray-400 line-clamp-2">
          {{ job.description }}
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <div
            class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm"
          >
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
  </BaseJobCard>
</template>
