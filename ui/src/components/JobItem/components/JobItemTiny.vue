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
        'p-3 h-[140px] group transition-colors relative',
        isHighlighted
          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
          : 'hover:border-indigo-200 dark:hover:border-indigo-800',
      ]
        .filter(Boolean)
        .join(' ')
    "
    :onClick="onClick"
  >
    <div class="flex items-start gap-3 h-[52px]">
      <img
        :src="job.companyLogo"
        :alt="`${job.company} logo`"
        class="w-10 h-10 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors"
      />
      <div class="min-w-0 flex-1 pr-[4.5rem]">
        <h2
          class="m-0 mb-0.5 text-base font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
        >
          {{ job.title }}
        </h2>
        <h3
          class="m-0 text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate"
        >
          {{ job.company }}
        </h3>
      </div>
      <div
        v-if="isHighlighted"
        class="absolute right-3 top-3"
      >
        <BaseBadge
          class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 border-amber-200 dark:border-amber-700 text-xs"
        >
          New
        </BaseBadge>
      </div>
    </div>

    <div class="flex items-center justify-between mt-3 text-sm">
      <div
        class="flex items-center gap-1 text-gray-600 dark:text-gray-400 min-w-0 max-w-[50%]"
      >
        <BaseIcon
          name="world"
          class="w-3.5 h-3.5 flex-shrink-0"
        />
        <span class="truncate">{{ job.location }}</span>
      </div>
      <BaseBadge
        variant="pill"
        class="text-xs flex-shrink-0 min-w-0 max-w-[50%]"
      >
        {{ job.jobType }}
      </BaseBadge>
    </div>
  </BaseJobCard>
</template>
