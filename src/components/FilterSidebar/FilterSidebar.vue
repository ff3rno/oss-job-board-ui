<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    searchTerm: string
    selectedLocation: string
    selectedJobType: string
    selectedExperience: string
    minSalary: number | null
    maxSalary: number | null
}>()

const emit = defineEmits<{
    'update:searchTerm': [value: string]
    'update:selectedLocation': [value: string]
    'update:selectedJobType': [value: string]
    'update:selectedExperience': [value: string]
    'update:minSalary': [value: number | null]
    'update:maxSalary': [value: number | null]
    resetFilters: []
}>()

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
    <aside class="w-80 p-6 border-l border-gray-200 bg-gray-50">
        <h2 class="mb-6 text-2xl font-semibold text-gray-800 border-b pb-2">
            Filters
        </h2>

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
            <label
                for="location"
                class="block mb-2 text-gray-700 font-medium"
            >
                Location:
            </label>
            <select
                id="location"
                :value="selectedLocation"
                @change="
                    (e) =>
                        emit(
                            'update:selectedLocation',
                            (e.target as HTMLSelectElement).value,
                        )
                "
                class="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                <option value="">All</option>
                <option value="New York, NY">New York, NY</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="Austin, TX">Austin, TX</option>
                <option value="Remote">Remote</option>
                <option value="Seattle, WA">Seattle, WA</option>
            </select>
        </div>

        <div class="mb-6">
            <label
                for="jobType"
                class="block mb-2 text-gray-700 font-medium"
            >
                Job Type:
            </label>
            <select
                id="jobType"
                :value="selectedJobType"
                @change="
                    (e) =>
                        emit(
                            'update:selectedJobType',
                            (e.target as HTMLSelectElement).value,
                        )
                "
                class="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                <option value="">All</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
            </select>
        </div>

        <div class="mb-6">
            <label
                for="experience"
                class="block mb-2 text-gray-700 font-medium"
            >
                Experience Level:
            </label>
            <select
                id="experience"
                :value="selectedExperience"
                @change="
                    (e) =>
                        emit(
                            'update:selectedExperience',
                            (e.target as HTMLSelectElement).value,
                        )
                "
                class="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                <option value="">All</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
            </select>
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

        <div>
            <button
                @click="resetFilters"
                class="w-full px-4 py-3 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-colors"
            >
                Reset Filters
            </button>
        </div>
    </aside>
</template>
