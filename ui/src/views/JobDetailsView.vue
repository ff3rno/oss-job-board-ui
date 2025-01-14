<script setup lang="ts">
import { computed, ref } from 'vue'
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

const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}
</script>

<template>
  <div
    v-if="job"
    class="min-h-screen bg-gray-50 dark:bg-gray-900"
    @scroll="handleScroll"
  >
    <div
      :class="[
        'sticky top-0 z-10 shadow-sm transition-all duration-200', isScrolled ? 'py-3' : 'py-6',
      ]"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <BaseButton
              variant="outline"
              icon="arrow-left"
              @click="handleBack"
            >
              Back
            </BaseButton>
            <div v-if="isScrolled" class="hidden sm:block">
              <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ job.title }}
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ job.company }}
              </p>
            </div>
          </div>
          <BaseButton
            v-if="isScrolled"
            size="sm"
            variant="primary"
            :href="job.applicationUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <div class="grid lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <!-- Main Job Details -->
        <div class="lg:col-span-2 xl:col-span-3">
          <JobDetailsCard
            :job="job"
            class="sticky top-24"
          />
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Apply Button Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
            <BaseButton
              size="lg"
              variant="primary"
              class="w-full"
              :href="job.applicationUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for this position
            </BaseButton>
            <div class="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span v-if="job.viewCount" class="flex items-center gap-1">
                <BaseIcon name="eye" class="w-4 h-4" />
                {{ job.viewCount }} views
              </span>
              <span v-if="job.applicationCount" class="flex items-center gap-1">
                <BaseIcon name="users" class="w-4 h-4" />
                {{ job.applicationCount }} applied
              </span>
            </div>
          </div>

          <!-- Related Jobs -->
          <RelatedJobs
            v-if="relatedJobs.length > 0"
            :jobs="relatedJobs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
