<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  recentJobsCount: number
}>()
</script>

<template>
  <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700">
    <div class="absolute inset-0 bg-grid-white/[0.1] bg-[size:3rem_3rem]"></div>
    <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div class="max-w-2xl text-white">
        <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
          Find Your Next Remote Tech Job
        </h1>
        <p class="mt-6 text-lg leading-8">
          Browse {{ recentJobsCount }}+ new remote tech jobs from top companies.
          Updated daily with the latest opportunities in software development,
          design, and tech.
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <RouterLink
            to="/browse-jobs"
            class="rounded-md bg-white px-6 py-3 text-lg font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Browse All Jobs
          </RouterLink>
          <RouterLink
            to="/post-job"
            class="text-lg font-semibold leading-6 text-white hover:text-indigo-50"
          >
            Post a Job <span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
