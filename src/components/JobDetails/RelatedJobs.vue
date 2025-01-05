<script setup lang="ts">
import type { JobPosting } from '@/types'
import JobItemTiny from '../JobItem/components/JobItemTiny.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  jobs: JobPosting[]
}>()

const router = useRouter()

const handleJobClick = (job: JobPosting) => {
  router.push({
    name: 'job-details',
    params: {
      job: encodeURIComponent(JSON.stringify(job)),
    },
  })
}

const isHighlighted = computed(() => Math.random() < 0.5)
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
      Related Jobs
    </h2>
    <div class="flex flex-col gap-4">
      <JobItemTiny
        v-for="job in jobs"
        :key="job.id"
        :job="job"
        class="w-full"
        :onClick="() => handleJobClick(job)"
        :is-highlighted="isHighlighted"
      />
    </div>
  </div>
</template>
