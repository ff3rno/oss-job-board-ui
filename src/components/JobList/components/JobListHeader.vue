<script setup lang="ts">
import BaseSelect from '@/components/shared/BaseSelect.vue'
import LayoutToggleGroup, { type LayoutType, type LayoutOption } from '@/components/shared/LayoutToggleGroup.vue'

const props = defineProps<{
    sortDirection: string
    sortKey: string
    jobCount: number
    layout: LayoutType
}>()

defineEmits<{
    'update:sortDirection': [value: string]
    'update:sortKey': [value: string]
    'update:layout': [value: LayoutType]
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

const layoutOptions: LayoutOption[] = [
    { value: 'grid', icon: 'grid', label: 'Grid View' },
    { value: 'list', icon: 'list', label: 'List View' },
    { value: 'compact', icon: 'compact', label: 'Compact View' }
]
</script>

<template>
    <div class="mb-8">
        <div class="flex items-center justify-between mt-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Postings</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Showing {{ jobCount }} jobs
                </p>
            </div>
            <div class="flex items-center gap-3">
                <LayoutToggleGroup
                    :model-value="layout"
                    :options="layoutOptions"
                    @update:model-value="$emit('update:layout', $event)"
                />
                <div class="flex items-end gap-3">
                    <div>
                        <BaseSelect
                            id="sortKey"
                            :model-value="sortKey"
                            :options="sortKeyOptions"
                            @update:model-value="$emit('update:sortKey', $event)"
                        />
                    </div>
                    <BaseSelect
                        id="sortDirection"
                        :model-value="sortDirection"
                        :options="sortDirectionOptions"
                        @update:model-value="$emit('update:sortDirection', $event)"
                    />
                </div>
            </div>
        </div>
        <div class="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 mt-6"></div>
    </div>
</template>
