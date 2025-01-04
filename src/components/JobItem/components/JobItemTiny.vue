<script setup lang="ts">
import type { JobPosting } from '@/types'
import BaseJobCard from '@/components/JobItem/components/BaseJobCard.vue'
import BaseIcon from '@/components/shared/BaseIcon/BaseIcon.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'

const props = defineProps<{
  job: JobPosting
  class?: string
  onClick?: () => void
}>()
</script>

<template>
  <BaseJobCard
    :class="props.class"
    class="p-3 h-[140px] group hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
    :onClick="onClick"
  >
    <div class="flex items-start gap-3 h-[52px]">
      <img
        :src="job.companyLogo"
        :alt="`${job.company} logo`"
        class="w-10 h-10 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors"
      />
      <div class="min-w-0 flex-1">
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
