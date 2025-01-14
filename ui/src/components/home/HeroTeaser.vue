<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

defineProps<{
  recentJobsCount: number
}>()

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  router.push({
    name: 'browse',
    query: { q: searchQuery.value }
  })
}
</script>

<template>
  <section class="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Find Your Next Remote Tech Job
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Browse through thousands of remote tech jobs from top companies worldwide
        </p>

        <div class="mt-10 flex justify-center gap-4">
          <form @submit.prevent="handleSearch" class="flex w-full max-w-2xl gap-4">
            <BaseInput
              v-model="searchQuery"
              placeholder="Search jobs by title, company, or keywords..."
              class="flex-1"
            />
            <BaseButton type="submit">
              Search Jobs
            </BaseButton>
          </form>
        </div>

        <div class="mt-12 flex justify-center gap-8 text-center">
          <div>
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ recentJobsCount }}+</p>
            <p class="mt-2 text-gray-600 dark:text-gray-400">New Jobs Today</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">1000+</p>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Companies Hiring</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">100%</p>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Remote Jobs</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
