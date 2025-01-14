<script setup lang="ts">
import { computed } from 'vue'
import { useJobStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'

const store = useJobStore()
const { jobs } = storeToRefs(store)

const companies = computed(() => {
  const uniqueCompanies = new Map()

  jobs.value.forEach((job) => {
    if (!uniqueCompanies.has(job.company) && job.companyLogo) {
      uniqueCompanies.set(job.company, {
        id: job.id,
        name: job.company,
        logo: job.companyLogo,
        description: job.companyDescription || 'Remote-first company',
        location: job.location,
      })
    }
  })

  return Array.from(uniqueCompanies.values())
    .slice(0, 3)
    .sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <section>
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Companies</h2>
      <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Join these industry-leading remote-first companies
      </p>
    </div>

    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="company in companies"
        :key="company.id"
        class="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center"
      >
        <img
          :src="company.logo"
          :alt="company.name"
          class="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 object-contain p-2"
        />
        <h3 class="mt-4 font-semibold text-gray-900 dark:text-white">{{ company.name }}</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ company.description }}</p>
        <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{{ company.location }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
