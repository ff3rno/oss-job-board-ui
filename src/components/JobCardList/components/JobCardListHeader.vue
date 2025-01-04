<script setup lang="ts">
import BaseSelect from '@/components/shared/BaseSelect.vue'

const props = defineProps<{
    sortDirection: string
    sortKey: string
    jobCount: number
}>()

defineEmits<{
    'update:sortDirection': [value: string]
    'update:sortKey': [value: string]
}>()

const sortKeyOptions = [
    { value: 'title', label: 'Title' },
    { value: 'location', label: 'Location' },
    { value: 'salary', label: 'Salary Range' },
    { value: 'experienceLevel', label: 'Experience Level' },
    { value: 'datePosted', label: 'Date Posted' }
]

const sortDirectionOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
]
</script>

<template>
    <div class="mb-8">
        <div class="flex items-center justify-between">
            <div class="space-y-1">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Postings</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Showing {{ jobCount }} jobs
                </p>
            </div>
            <div class="flex items-center gap-3">
                <BaseSelect
                    id="sortKey"
                    :modelValue="sortKey"
                    :options="sortKeyOptions"
                    label="Sort by"
                    @update:modelValue="$emit('update:sortKey', $event)"
                />
                <BaseSelect
                    id="sortDirection"
                    select-class="mt-7"
                    :modelValue="sortDirection"
                    :options="sortDirectionOptions"
                    @update:modelValue="$emit('update:sortDirection', $event)"
                />
            </div>
        </div>
        <div class="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 mt-6"></div>
    </div>
</template>
