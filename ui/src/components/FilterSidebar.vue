<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseSelect from '@/components/shared/BaseSelect.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { JobType, ExperienceLevel, type JobPosting } from '@/types'

const props = defineProps<{
  jobs: JobPosting[]
  searchTerm: string
  location: string
  jobType: string
  experienceLevel: string
  minSalary: number | null
  maxSalary: number | null
  class?: string
}>()

type Emits = {
  (e: 'update:searchTerm', value: string): void
  (e: 'update:location', value: string): void
  (e: 'update:jobType', value: JobType | ''): void
  (e: 'update:experienceLevel', value: ExperienceLevel | ''): void
  (e: 'update:minSalary', value: number | null): void
  (e: 'update:maxSalary', value: number | null): void
  (e: 'resetFilters'): void
}

const emit = defineEmits<Emits>()

const jobTypes = Object.values(JobType)
const experienceLevels = Object.values(ExperienceLevel)

const uniqueLocations = computed(() => {
  const locations = new Set(props.jobs.map((job) => job.location))
  return Array.from(locations).sort()
})

const locationOptions = computed(() => {
  return uniqueLocations.value.map((location) => ({
    value: location,
    label: location,
  }))
})

const jobTypeOptions = computed(() => {
  return jobTypes.map((type) => ({
    value: type,
    label: type,
  }))
})

const experienceLevelOptions = computed(() => {
  return experienceLevels.map((level) => ({
    value: level,
    label: level,
  }))
})

const resetFilters = () => {
  emit('update:searchTerm', '')
  emit('update:location', '')
  emit('update:jobType', '')
  emit('update:experienceLevel', '')
  emit('update:minSalary', null)
  emit('update:maxSalary', null)
  emit('resetFilters')
}
</script>

<template>
  <aside :class="[props.class]">
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 sticky top-[calc(4.5rem+1rem)] z-30"
    >
      <div class="mb-6">
        <BaseInput
          id="search"
          :modelValue="searchTerm"
          placeholder="Search jobs..."
          class="w-full"
          @update:modelValue="
            (value: string) => emit('update:searchTerm', value)
          "
        />
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Search by job title, company, or keywords
        </p>
      </div>

      <div class="mb-6">
        <div class="flex flex-col gap-2">
          <BaseSelect
            id="location"
            :modelValue="location"
            :options="locationOptions"
            label="Location:"
            placeholder="All"
            class="w-full"
            labelClass="min-w-[120px] dark:text-gray-300"
            @update:modelValue="emit('update:location', $event)"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Filter jobs by city or remote work options
          </p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex flex-col gap-2">
          <BaseSelect
            id="jobType"
            :modelValue="jobType"
            :options="jobTypeOptions"
            label="Job Type:"
            placeholder="All"
            class="w-full"
            labelClass="min-w-[120px] dark:text-gray-300"
            @update:modelValue="
              emit('update:jobType', $event as JobType)
            "
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Choose between full-time, part-time, contract, or internship
            positions
          </p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex flex-col gap-2">
          <BaseSelect
            id="experience"
            :modelValue="experienceLevel"
            :options="experienceLevelOptions"
            label="Experience Level:"
            placeholder="All"
            class="w-full"
            labelClass="min-w-[120px] dark:text-gray-300"
            @update:modelValue="
              emit('update:experienceLevel', $event as ExperienceLevel)
            "
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Select your experience level to find matching opportunities
          </p>
        </div>
      </div>

      <div class="mb-6">
        <label
          class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
        >
          Salary Range:
        </label>
        <div class="flex items-center gap-2">
          <BaseInput
            id="minSalary"
            type="number"
            :modelValue="minSalary"
            placeholder="Min"
            class="w-1/2"
            @update:modelValue="
              (value: number | null) => emit('update:minSalary', value)
            "
          />
          <BaseInput
            id="maxSalary"
            type="number"
            :modelValue="maxSalary"
            placeholder="Max"
            class="w-1/2"
            @update:modelValue="
              (value: number | null) => emit('update:maxSalary', value)
            "
          />
        </div>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Enter annual salary range in USD (optional)
        </p>
      </div>

      <BaseButton
        variant="secondary"
        class="w-full"
        @click="resetFilters"
      >
        Reset Filters
      </BaseButton>
    </div>
  </aside>
</template>
