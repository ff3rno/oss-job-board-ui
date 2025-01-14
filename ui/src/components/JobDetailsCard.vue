<script setup lang="ts">
import BaseIcon from '@/components/shared/BaseIcon/BaseIcon.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import type { JobPosting } from '@/types'

defineProps<{
  job: JobPosting
}>()

const getCompanyLogoUrl = (company: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random&size=128&bold=true&format=svg`
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
    <!-- Header Section -->
    <div class="p-6 sm:p-8">
      <div class="flex gap-6 items-start">
        <img
          :src="getCompanyLogoUrl(job.company)"
          :alt="`${job.company} logo`"
          class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
        />
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {{ job.title }}
          </h1>
          <div class="mt-2 flex items-center gap-2">
            <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              {{ job.company }}
            </h2>
            <a
              v-if="job.companyWebsite"
              :href="job.companyWebsite"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <BaseIcon name="external-link" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Job Meta Info -->
      <div class="mt-6 flex flex-wrap gap-3">
        <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
          <BaseIcon name="world" />
          <span>{{ job.location }}</span>
        </div>
        <BaseBadge v-if="job.experienceLevel" icon="briefcase">
          {{ job.experienceLevel }}
        </BaseBadge>
        <BaseBadge v-if="job.jobType" variant="pill">
          {{ job.jobType }}
        </BaseBadge>
        <BaseBadge
          v-if="job.salary?.min && job.salary?.max && job.salary?.currency"
          icon="money"
        >
          {{ job.salary.currency }}{{ job.salary.min.toLocaleString() }} -
          {{ job.salary.max.toLocaleString() }}
        </BaseBadge>
      </div>

      <!-- Tags -->
      <div class="mt-4 flex flex-wrap gap-2">
        <BaseBadge
          v-for="tag in job.tags"
          :key="tag"
          variant="pill"
          class="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        >
          {{ tag }}
        </BaseBadge>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="p-6 sm:p-8 grid gap-8">
      <!-- Company Description -->
      <section v-if="job.companyDescription">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          About {{ job.company }}
        </h3>
        <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {{ job.companyDescription }}
        </p>
      </section>

      <!-- Job Description -->
      <section v-if="job.description">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Job Description
        </h3>
        <div
          class="prose prose-sm prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
          v-html="job.description"
        />
      </section>

      <!-- Two Column Layout for Requirements and Responsibilities -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Responsibilities -->
        <section v-if="job.jobDetails?.responsibilities?.length">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            What You Will Do
          </h3>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li
              v-for="responsibility in job.jobDetails.responsibilities"
              :key="responsibility"
              class="flex gap-2"
            >
              <BaseIcon name="check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{{ responsibility }}</span>
            </li>
          </ul>
        </section>

        <!-- Requirements -->
        <section v-if="job.jobDetails?.requirements?.length">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Requirements
          </h3>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li
              v-for="requirement in job.jobDetails.requirements"
              :key="requirement"
              class="flex gap-2"
            >
              <BaseIcon name="check" class="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span>{{ requirement }}</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Skills -->
      <section v-if="job.skills?.length">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Required Skills
        </h3>
        <div class="flex flex-wrap gap-2">
          <BaseBadge
            v-for="skill in job.skills"
            :key="skill"
            variant="pill"
            class="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
          >
            {{ skill }}
          </BaseBadge>
        </div>
      </section>

      <!-- Benefits Grid -->
      <section v-if="job.benefits?.length || job.jobDetails?.whatWeOffer?.length">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          What We Offer
        </h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <div
            v-for="benefit in [
              ...(job.benefits || []),
              ...(job.jobDetails?.whatWeOffer || []),
            ]"
            :key="benefit"
            class="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
          >
            <BaseIcon name="gift" class="w-5 h-5 text-purple-500 flex-shrink-0" />
            <span class="text-gray-700 dark:text-gray-300">{{ benefit }}</span>
          </div>
        </div>
      </section>

      <!-- Application Method -->
      <section v-if="job.jobDetails?.applicationMethod">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          How to Apply
        </h3>
        <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
          <p class="whitespace-pre-line">
            {{ job.jobDetails.applicationMethod }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
