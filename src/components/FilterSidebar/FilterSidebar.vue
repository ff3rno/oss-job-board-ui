<script setup lang="ts">
import { computed } from 'vue'
import { ExperienceLevel, JobType } from '@/types/job'
import BaseButton from '@/components/shared/BaseButton.vue'
import Select from '@/components/shared/Select.vue'

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
        <div class="p-6">
            <div class="mb-6">
                <input
                    type="text"
                    :value="searchTerm"
                    @input="
                        (e) =>
                            emit(
                                'update:searchTerm',
                                (e.target as HTMLInputElement).value,
                            )
                    "
                    placeholder="Search jobs..."
                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            <div class="mb-6">
                <Select
                    id="location"
                    :modelValue="selectedLocation"
                    :options="locationOptions"
                    label="Location:"
                    placeholder="All"
                    @update:modelValue="emit('update:selectedLocation', $event)"
                />
            </div>

            <div class="mb-6">
                <Select
                    id="jobType"
                    :modelValue="selectedJobType"
                    :options="jobTypeOptions"
                    label="Job Type:"
                    placeholder="All"
                    @update:modelValue="emit('update:selectedJobType', $event as JobType)"
                />
            </div>

            <div class="mb-6">
                <Select
                    id="experience"
                    :modelValue="selectedExperience"
                    :options="experienceLevelOptions"
                    label="Experience Level:"
                    placeholder="All"
                    @update:modelValue="emit('update:selectedExperience', $event as ExperienceLevel)"
                />
            </div>

            <div class="mb-6">
                <label class="block mb-2 text-gray-700 font-medium">
                    Salary Range:
                </label>
                <div class="flex items-center gap-2">
                    <input
                        type="number"
                        :value="minSalary"
                        @input="
                            (e) =>
                                emit(
                                    'update:minSalary',
                                    Number((e.target as HTMLInputElement).value),
                                )
                        "
                        placeholder="Min"
                        class="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                        type="number"
                        :value="maxSalary"
                        @input="
                            (e) =>
                                emit(
                                    'update:maxSalary',
                                    Number((e.target as HTMLInputElement).value),
                                )
                        "
                        placeholder="Max"
                        class="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
    </aside>
</template>
