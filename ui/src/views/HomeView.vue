<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useJobStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'
import HeroTeaser from '@/components/home/HeroTeaser.vue'
import FeaturedJobs from '@/components/home/FeaturedJobs.vue'
import JobCategories from '@/components/home/JobCategories.vue'
import CompanyShowcase from '@/components/home/CompanyShowcase.vue'
import NewsletterSignup from '@/components/home/NewsletterSignup.vue'

const store = useJobStore()
const { jobs, featuredJobs, featuredJobsLoading } = storeToRefs(store)
const recentJobs = computed(() => [...jobs.value].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()).slice(0, 10))

onMounted(() => {
  Promise.all([
    store.fetchJobs(1),
    store.fetchFeaturedJobs(1),
  ]).catch(console.error)
})
</script>

<template>
  <main class="min-h-screen">
    <HeroTeaser
      class="mb-16"
      :recent-jobs-count="recentJobs.length"
    />

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-24">
        <FeaturedJobs
          :jobs="featuredJobs"
          :loading="featuredJobsLoading"
        />

        <JobCategories />
        <CompanyShowcase />
        <NewsletterSignup class="mb-16" />
      </div>
    </div>
  </main>
</template>
