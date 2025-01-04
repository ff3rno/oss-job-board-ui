<script setup lang="ts">
import { computed } from 'vue'
import { ExperienceLevel, JobType } from '@/types/job'
import BaseButton from '@/components/shared/BaseButton.vue'
import BaseSelect from '@/components/shared/BaseSelect.vue'
import BaseInput from '@/components/shared/BaseInput.vue'

interface JobPosting {
    id: number
    title: string
    company: string
    location: string
    jobType: JobType
    description: string
    datePosted: string
    salary: {
        min: number
        max: number
        currency: string
    }
    experienceLevel: ExperienceLevel
    skills: string[]
    benefits: string[]
    companyLogo: string
}

const props = defineProps<{
    searchTerm: string
    selectedLocation: string
    selectedJobType: JobType | ''
    selectedExperience: ExperienceLevel | ''
    minSalary: number | null
    maxSalary: number | null
    class?: string
    jobs: JobPosting[]
}>()

type Emits = {
    (e: 'update:searchTerm', value: string): void
    (e: 'update:selectedLocation', value: string): void
    (e: 'update:selectedJobType', value: JobType | ''): void
    (e: 'update:selectedExperience', value: ExperienceLevel | ''): void
    (e: 'update:minSalary', value: number | null): void
    (e: 'update:maxSalary', value: number | null): void
    (e: 'resetFilters'): void
}

const emit = defineEmits<Emits>()

const jobTypes = Object.values(JobType)
const experienceLevels = Object.values(ExperienceLevel)

const uniqueLocations = computed(() => {
    const locations = new Set(props.jobs.map(job => job.location))
    return Array.from(locations).sort()
})

const locationOptions = computed(() => {
    return uniqueLocations.value.map(location => ({
        value: location,
        label: location
    }))
})

const jobTypeOptions = computed(() => {
    return jobTypes.map(type => ({
        value: type,
        label: type
    }))
})

const experienceLevelOptions = computed(() => {
    return experienceLevels.map(level => ({
        value: level,
        label: level
    }))
})

const resetFilters = () => {
    emit('update:searchTerm', '')
    emit('update:selectedLocation', '')
    emit('update:selectedJobType', '')
    emit('update:selectedExperience', '')
    emit('update:minSalary', null)
    emit('update:maxSalary', null)
    emit('resetFilters')
}
</script>

<template>
    <aside :class="[props.class]">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-y-auto h-full">
            <div class="p-4 sm:p-6">
                <div class="mb-6">
                    <BaseInput
                        id="search"
                        :modelValue="searchTerm"
                        placeholder="Search jobs..."
                        class="w-full"
                        @update:modelValue="(value: string) => emit('update:searchTerm', value)"
                    />
                </div>

                <div class="mb-6">
                    <div class="flex flex-col gap-2">
                        <BaseSelect
                            id="location"
                            :modelValue="selectedLocation"
                            :options="locationOptions"
                            label="Location:"
                            placeholder="All"
                            class="w-full"
                            labelClass="min-w-[120px] dark:text-gray-300"
                            @update:modelValue="emit('update:selectedLocation', $event)"
                        />
                    </div>
                </div>

                <div class="mb-6">
                    <div class="flex flex-col gap-2">
                        <BaseSelect
                            id="jobType"
                            :modelValue="selectedJobType"
                            :options="jobTypeOptions"
                            label="Job Type:"
                            placeholder="All"
                            class="w-full"
                            labelClass="min-w-[120px] dark:text-gray-300"
                            @update:modelValue="emit('update:selectedJobType', $event as JobType)"
                        />
                    </div>
                </div>

                <div class="mb-6">
                    <div class="flex flex-col gap-2">
                        <BaseSelect
                            id="experience"
                            :modelValue="selectedExperience"
                            :options="experienceLevelOptions"
                            label="Experience Level:"
                            placeholder="All"
                            class="w-full"
                            labelClass="min-w-[120px] dark:text-gray-300"
                            @update:modelValue="emit('update:selectedExperience', $event as ExperienceLevel)"
                        />
                    </div>
                </div>

                <div class="mb-6">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Salary Range:
                    </label>
                    <div class="flex items-center gap-2">
                        <BaseInput
                            id="minSalary"
                            type="number"
                            :modelValue="minSalary"
                            placeholder="Min"
                            class="w-1/2"
                            @update:modelValue="(value: number | null) => emit('update:minSalary', value)"
                        />
                        <BaseInput
                            id="maxSalary"
                            type="number"
                            :modelValue="maxSalary"
                            placeholder="Max"
                            class="w-1/2"
                            @update:modelValue="(value: number | null) => emit('update:maxSalary', value)"
                        />
                    </div>
                </div>

                <BaseButton
                    variant="secondary"
                    class="w-full"
                    @click="resetFilters"
                >
                    Reset Filters
                </BaseButton>
            </div>
        </div>
    </aside>
</template>
