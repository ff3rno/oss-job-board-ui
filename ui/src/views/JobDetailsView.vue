<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/shared/BaseButton.vue'
import JobDetailsCard from '@/components/JobDetailsCard.vue'
import RelatedJobs from '@/components/JobDetails/RelatedJobs.vue'
import type { JobPosting } from '@/types'

const route = useRoute()
const router = useRouter()

const job = computed(() =>
  route.params.job
    ? (JSON.parse(decodeURIComponent(route.params.job as string)) as JobPosting)
    : null,
)

const relatedJobs = computed(() => {
  if (!job.value) return []
  const allJobs = JSON.parse(
    localStorage.getItem('jobs') || '[]',
  ) as JobPosting[]
  return allJobs
    .filter((j) => job.value?.relatedJobIds.includes(j.id))
    .slice(0, 3)
})

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <div
    v-if="job"
    class="py-8"
  >
    <div class="mb-6">
      <BaseButton
        variant="outline"
        icon="arrow-left"
        @click="handleBack"
      >
        Back to Jobs
      </BaseButton>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <JobDetailsCard
        :job="job"
        class="flex-1"
      />
      <RelatedJobs
        v-if="relatedJobs.length > 0"
        :jobs="relatedJobs"
        class="w-full lg:w-96"
      />
    </div>
  </div>
</template>
