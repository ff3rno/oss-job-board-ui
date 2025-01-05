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
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm sm:p-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row gap-6 sm:items-start mb-8">
      <img
        :src="getCompanyLogoUrl(job.company)"
        :alt="`${job.company} logo`"
        class="w-24 h-24 rounded-lg flex-shrink-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
      />
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ job.title }}
        </h1>
        <div class="flex items-center gap-2 mb-4">
          <h2
            class="text-xl font-semibold text-indigo-600 dark:text-indigo-400"
          >
            {{ job.company }}
          </h2>
          <a
            v-if="job.companyWebsite"
            :href="job.companyWebsite"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <BaseIcon
              name="external-link"
              class="w-5 h-5"
            />
          </a>
        </div>
        <div class="flex flex-wrap gap-3 mb-4">
          <div
            class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400"
          >
            <BaseIcon name="world" />
            <span>{{ job.location }}</span>
          </div>
          <BaseBadge
            v-if="job.experienceLevel"
            icon="briefcase"
          >
            {{ job.experienceLevel }}
          </BaseBadge>
          <BaseBadge
            v-if="job.jobType"
            variant="pill"
          >
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
        <div class="flex flex-wrap gap-2">
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
      <div class="flex flex-col gap-4 sm:text-right">
        <BaseButton
          size="lg"
          variant="primary"
          :href="job.applicationUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply for this position
        </BaseButton>
        <div
          class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 justify-end"
        >
          <span
            v-if="job.viewCount"
            class="flex items-center gap-1"
          >
            <BaseIcon
              name="eye"
              class="w-4 h-4"
            />
            {{ job.viewCount }} views
          </span>
          <span
            v-if="job.applicationCount"
            class="flex items-center gap-1"
          >
            <BaseIcon
              name="users"
              class="w-4 h-4"
            />
            {{ job.applicationCount }} applied
          </span>
        </div>
      </div>
    </div>

    <!-- Company Description -->
    <div
      v-if="job.companyDescription"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        About {{ job.company }}
      </h3>
      <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {{ job.companyDescription }}
      </p>
    </div>

    <!-- Job Description -->
    <div
      v-if="job.description"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Job Description
      </h3>
      <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {{ job.description }}
      </p>
    </div>

    <!-- Responsibilities -->
    <div
      v-if="job.jobDetails?.responsibilities?.length"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        What You Will Do
      </h3>
      <ul
        class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"
      >
        <li
          v-for="responsibility in job.jobDetails.responsibilities"
          :key="responsibility"
        >
          {{ responsibility }}
        </li>
      </ul>
    </div>

    <!-- Requirements -->
    <div
      v-if="job.jobDetails?.requirements?.length"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Requirements
      </h3>
      <ul
        class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"
      >
        <li
          v-for="requirement in job.jobDetails.requirements"
          :key="requirement"
        >
          {{ requirement }}
        </li>
      </ul>
    </div>

    <!-- Skills -->
    <div
      v-if="job.skills?.length"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Required Skills
      </h3>
      <div class="flex flex-wrap gap-2">
        <BaseBadge
          v-for="skill in job.skills"
          :key="skill"
          variant="pill"
        >
          {{ skill }}
        </BaseBadge>
      </div>
    </div>

    <!-- Benefits & What We Offer -->
    <div
      v-if="job.benefits?.length || job.jobDetails?.whatWeOffer?.length"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        What We Offer
      </h3>
      <ul
        class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300"
      >
        <li
          v-for="benefit in [
            ...(job.benefits || []),
            ...(job.jobDetails?.whatWeOffer || []),
          ]"
          :key="benefit"
        >
          {{ benefit }}
        </li>
      </ul>
    </div>

    <!-- Application Method -->
    <div
      v-if="job.jobDetails?.applicationMethod"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        How to Apply
      </h3>
      <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {{ job.jobDetails.applicationMethod }}
      </p>
    </div>

    <!-- Footer -->
    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <span class="text-sm text-gray-500 dark:text-gray-400">
          Posted on: {{ job.datePosted }}
        </span>
        <BaseButton
          size="lg"
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
</template>
